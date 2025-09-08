import { Feedback, UserRole } from '../../shared/types/index.js';
import { mockFeedback, getUserFullName } from '../../shared/services/mockData.js';
import { hasPermission, UserWithPermissions, PERMISSIONS } from '../../shared/types/permissions.js';

export class FeedbackService {
  private feedback: Feedback[] = [...mockFeedback];

  constructor() {
    console.log('🔑 Feedback service initialized with role-based access control');
  }

  // Get feedback based on user permissions
  async getFeedbackByProfileId(profileId: string, currentUser: UserWithPermissions): Promise<Feedback[]> {
    let filteredFeedback: Feedback[];

    if (hasPermission(currentUser, PERMISSIONS.FEEDBACK.READ_ALL)) {
      // Users with READ_ALL permission can see all feedback for any profile
      console.log('👑 User with READ_ALL permission accessing all feedback for profile:', profileId);
      filteredFeedback = this.feedback.filter(f => f.toUserId === profileId);
    } else if (hasPermission(currentUser, PERMISSIONS.FEEDBACK.READ_OWN)) {
      // Users with READ_OWN permission can only see feedback they received (for their own profile)
      // or feedback they wrote (for any profile)
      console.log(`👤 User ${currentUser.id} accessing feedback for profile ${profileId}`);

      if (currentUser.id === profileId) {
        // User is viewing their own profile - show feedback they received
        filteredFeedback = this.feedback.filter(f => f.toUserId === profileId);
      } else {
        // User is viewing another profile - show only feedback they wrote
        filteredFeedback = this.feedback.filter(f => f.fromUserId === currentUser.id && f.toUserId === profileId);
      }
    } else {
      // User has no permission to read feedback
      console.log(`🚫 User ${currentUser.id} has no permission to read feedback`);
      filteredFeedback = [];
    }

    // Add user names to filtered feedback
    return filteredFeedback.map(f => ({
      ...f,
      fromUserName: getUserFullName(f.fromUserId)
    }));
  }

  // Get feedback received by the current user (for main feedback page)
  async getFeedbackReceivedByUser(currentUser: UserWithPermissions): Promise<Feedback[]> {
    let filteredFeedback: Feedback[];
    
    if (!hasPermission(currentUser, PERMISSIONS.FEEDBACK.READ_OWN)) {
      console.log(`🚫 User ${currentUser.id} has no permission to read their own feedback`);
      return [];
    }
    
    // Users can see feedback they received
    console.log(`👤 User ${currentUser.id} accessing their received feedback`);
    filteredFeedback = this.feedback.filter(f => f.toUserId === currentUser.id);

    // Add user names to filtered feedback
    return filteredFeedback.map(f => ({
      ...f,
      fromUserName: getUserFullName(f.fromUserId)
    }));
  }

  // Create new feedback
  async createFeedback(profileId: string, feedbackData: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>): Promise<Feedback> {
    const newFeedback: Feedback = {
      ...feedbackData,
      toUserId: profileId, // Set the recipient
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.feedback.push(newFeedback);
    const fromUserName = getUserFullName(feedbackData.fromUserId);
    console.log(`📝 New feedback created from ${fromUserName} to profile ${profileId}`);
    return newFeedback;
  }

  // Enhance feedback text using Gemini AI via REST API
  async enhanceFeedback(text: string, employeeName?: string): Promise<string> {
    try {
      console.log('🤖 Starting AI enhancement for text:', text);
      console.log('🔑 API Key available:', !!process.env.GEMINI_API_KEY);

      // Create a balanced prompt - concise but with safety filters
      const nameContext = employeeName ? ` for ${employeeName}` : '';
      const prompt = `You are a professional HR feedback enhancement assistant. Your role is to transform any employee feedback into constructive, professional, and actionable workplace communication.
      Transform this workplace feedback${nameContext} into professional, constructive communication. Keep it concise (2-3 sentences max) and natural.

      SAFETY FILTERING (CRITICAL):
      - Remove or rephrase any profanity, harsh language, or toxic expressions
      - Eliminate personal accusations or character attacks
      - Convert complaints into constructive suggestions
      - Transform negative statements into growth opportunities
      - Replace vague criticisms with specific, actionable feedback

      ENHANCEMENT REQUIREMENTS:
      - Use the actual person's name if provided
      - Make it constructive and solution-focused
      - Keep the original meaning but improve tone
      - Be specific and actionable
      - Sound natural, not robotic
      - Focus on behaviors and outcomes, not personality traits
      - Use "I" statements and observation-based language

      Original feedback: "${text}"

      Enhanced version:`;

      console.log('📝 Sending enhanced prompt to Gemini via REST API');

      // Use REST API directly since the Node.js package isn't working
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
        method: 'POST',
        headers: {
          'x-goog-api-key': process.env.GEMINI_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Gemini REST API response received');

      const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!enhancedText) {
        console.log('⚠️ No enhanced text in response, returning original');
        return text;
      }

      console.log('📄 Enhanced text length:', enhancedText.length);
      console.log('🎯 Final enhanced text preview:', enhancedText.substring(0, 100) + '...');

      return enhancedText;
    } catch (error) {
      console.error('❌ AI enhancement failed:', error);
      if (error instanceof Error) {
        console.error('❌ Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      // Return original text if AI enhancement fails
      return text;
    }
  }

  // Update feedback
  async updateFeedback(feedbackId: string, updates: Partial<Feedback>): Promise<Feedback | null> {
    const index = this.feedback.findIndex(f => f.id === feedbackId);
    if (index === -1) return null;

    this.feedback[index] = {
      ...this.feedback[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.feedback[index];
  }

  // Delete feedback
  async deleteFeedback(feedbackId: string): Promise<boolean> {
    const index = this.feedback.findIndex(f => f.id === feedbackId);
    if (index === -1) return false;

    this.feedback.splice(index, 1);
    return true;
  }

  // Get feedback by ID
  async getFeedbackById(feedbackId: string): Promise<Feedback | null> {
    const feedback = this.feedback.find(f => f.id === feedbackId);
    if (!feedback) return null;

    return {
      ...feedback,
      fromUserName: getUserFullName(feedback.fromUserId)
    };
  }

  // Get feedback count for a specific profile
  getFeedbackCountForProfile(profileId: string): number {
    return this.feedback.filter(f => f.toUserId === profileId).length;
  }

  // Get feedback counts for multiple profiles (bulk operation for efficiency)
  getFeedbackCountsForProfiles(profileIds: string[]): Record<string, number> {
    const counts: Record<string, number> = {};

    // Initialize all counts to 0
    profileIds.forEach(id => {
      counts[id] = 0;
    });

    // Count feedback for each profile
    this.feedback.forEach(feedback => {
      if (counts.hasOwnProperty(feedback.toUserId)) {
        counts[feedback.toUserId]++;
      }
    });

    return counts;
  }
}

export const feedbackService = new FeedbackService();
