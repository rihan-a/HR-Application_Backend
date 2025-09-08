import { Request, Response } from 'express';
import { findProfileById, mockProfiles, updateProfileById } from '../../shared/services/mockData.js';
import { UserRole, EmployeeProfile } from '../../shared/types/index.js';
import { feedbackService } from '../feedback/feedback.service.js';
import { hasPermission, canAccessResource, PERMISSIONS } from '../../shared/types/permissions.js';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = findProfileById(id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const user = req.user!;
    let filteredProfile: Partial<EmployeeProfile>;

    // Use permission-based filtering
    if (canAccessResource(user, PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL, id)) {
      // User has full access (managers or own profile)
      filteredProfile = { ...profile };
    } else if (hasPermission(user, PERMISSIONS.EMPLOYEE_PROFILE.READ_PUBLIC)) {
      // User has public access only
      filteredProfile = {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        position: profile.position,
        department: profile.department,
        profileImage: profile.profileImage,
        bio: profile.bio,
        skills: profile.skills,
        feedback: profile.feedback,
        absenceRequests: profile.absenceRequests
      };
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ profile: filteredProfile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;
    const updateData = req.body;

    // Check if user can edit this profile using permissions
    if (!canAccessResource(user, PERMISSIONS.EMPLOYEE_PROFILE.EDIT_ALL, id)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check for salary editing permission if salary is being updated
    if (updateData.salary !== undefined && !hasPermission(user, PERMISSIONS.EMPLOYEE_PROFILE.EDIT_SALARY)) {
      return res.status(403).json({ error: 'Insufficient permissions to edit salary' });
    }

    const updatedProfile = updateProfileById(id, updateData);
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ profile: updatedProfile, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const listProfiles = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const { search, department } = req.query;

    // Check permission to read all profiles
    if (!hasPermission(user, PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let filteredProfiles = mockProfiles;

    // Apply search filter
    if (search && typeof search === 'string') {
      const searchLower = search.toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.firstName.toLowerCase().includes(searchLower) ||
        profile.lastName.toLowerCase().includes(searchLower) ||
        profile.position.toLowerCase().includes(searchLower) ||
        profile.department.toLowerCase().includes(searchLower)
      );
    }

    // Apply department filter
    if (department && typeof department === 'string') {
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.department === department
      );
    }

    // Get real feedback counts for all profiles
    const profileIds = filteredProfiles.map(p => p.id);
    const feedbackCounts = feedbackService.getFeedbackCountsForProfiles(profileIds);

    // Return comprehensive profile data for managers
    const profiles = filteredProfiles.map(profile => ({
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      position: profile.position,
      department: profile.department,
      email: profile.email,
      phone: profile.phone,
      salary: profile.salary,
      startDate: profile.startDate,
      employeeId: profile.employeeId,
      performanceRating: profile.performanceRating,
      profileImage: profile.profileImage,
      feedbackCount: feedbackCounts[profile.id] || 0,
    }));

    res.json({ profiles, total: profiles.length });
  } catch (error) {
    console.error('List profiles error:', error);
    res.status(500).json({ error: 'Failed to list profiles' });
  }
};

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = [...new Set(mockProfiles.map(profile => profile.department))];
    res.json({ departments });
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ error: 'Failed to get departments' });
  }
};

export const browseProfiles = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const { search, department } = req.query;

    // Check permission to read public profiles
    if (!hasPermission(user, PERMISSIONS.EMPLOYEE_PROFILE.READ_PUBLIC)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Managers should use the full list endpoint
    if (hasPermission(user, PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL)) {
      return res.status(400).json({ error: 'Use /list/all endpoint for full access' });
    }

    let filteredProfiles = mockProfiles;

    // Apply search filter
    if (search && typeof search === 'string') {
      const searchLower = search.toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.firstName.toLowerCase().includes(searchLower) ||
        profile.lastName.toLowerCase().includes(searchLower) ||
        profile.position.toLowerCase().includes(searchLower) ||
        profile.department.toLowerCase().includes(searchLower)
      );
    }

    // Apply department filter
    if (department && typeof department === 'string') {
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.department === department
      );
    }

    // Get real feedback counts for all profiles
    const profileIds = filteredProfiles.map(p => p.id);
    const feedbackCounts = feedbackService.getFeedbackCountsForProfiles(profileIds);

    // Return only public data for co-workers and employees
    const profiles = filteredProfiles.map(profile => ({
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      position: profile.position,
      department: profile.department,
      profileImage: profile.profileImage,
      bio: profile.bio,
      skills: profile.skills,
      // Include feedback count for context
      feedbackCount: feedbackCounts[profile.id] || 0,
      // Include current user indicator
      isCurrentUser: profile.id === user.id
    }));

    res.json({ profiles, total: profiles.length });
  } catch (error) {
    console.error('Browse profiles error:', error);
    res.status(500).json({ error: 'Failed to browse profiles' });
  }
};
