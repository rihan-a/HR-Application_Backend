# HR Application Backend

A Node.js/Express backend API for an HR management system with features for employee profiles, feedback, absence management, and authentication.

## Features

- **Authentication**: JWT-based authentication with role-based access control
- **Employee Profiles**: CRUD operations for employee profiles with role-based data filtering
- **Feedback System**: AI-enhanced feedback with Gemini API integration
- **Absence Management**: Request and manage employee absence requests
- **Role-based Access**: Manager, Employee, and Coworker roles with different permissions

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Security**: Helmet, CORS
- **AI Integration**: Google Gemini API for feedback enhancement
- **Authentication**: Custom session-based auth

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Gemini AI API Key (for feedback enhancement)
GEMINI_API_KEY=your_gemini_api_key_here
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

## Deployment on Render.com

### Option 1: Using render.yaml (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Render.com
3. Render will automatically detect the `render.yaml` file and configure the service
4. Set the `GEMINI_API_KEY` environment variable in the Render dashboard

### Option 2: Manual Configuration

1. Create a new Web Service on Render.com
2. Connect your Git repository
3. Use these settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Health Check Path**: `/health`
4. Set environment variables in the Render dashboard

### Environment Variables for Production

Set these in your Render dashboard:

- `NODE_ENV`: `production`
- `PORT`: `3001` (or leave empty for Render to assign)
- `FRONTEND_URL`: Your frontend URL (e.g., `https://your-frontend.vercel.app`)
- `GEMINI_API_KEY`: Your Google Gemini API key

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Profiles
- `GET /api/profiles/:id` - Get profile by ID
- `PUT /api/profiles/:id` - Update profile
- `GET /api/profiles/list/all` - List all profiles (managers only)
- `GET /api/profiles/browse` - Browse profiles (public data)

### Feedback
- `GET /api/feedback/received` - Get feedback received by current user
- `GET /api/feedback/profiles/:profileId` - Get feedback for a profile
- `POST /api/feedback/profiles/:profileId` - Create feedback
- `POST /api/feedback/enhance` - Enhance feedback with AI

### Absence Management
- `GET /api/absence/` - Get all absence requests (managers)
- `GET /api/absence/employee/:employeeId` - Get employee absence requests
- `POST /api/absence/employee/:employeeId` - Create absence request
- `PUT /api/absence/:requestId/status` - Update request status

### Configuration
- `GET /api/config/` - Get application configuration

## Health Check

The application provides a health check endpoint at `/health` that returns:

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "environment": "production",
  "version": "1.0.0"
}
```

## Security Features

- Helmet.js for security headers
- CORS configuration for allowed origins
- Role-based access control
- Input validation and sanitization
- Rate limiting (ready for implementation)

## License

Private - Internal use only
