import { Request, Response, NextFunction } from 'express';
import { User, UserRole } from '../types/index.js';
import { getSessionUser } from '../services/mockData.js';
import { hasPermission, canAccessResource, PERMISSIONS } from '../types/permissions.js';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = req.headers.authorization?.replace('Bearer ', '');

    if (!sessionId) {
      return res.status(401).json({ error: 'No session provided' });
    }

    const user = getSessionUser(sessionId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};



export const requireManagerOrOwner = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const profileId = req.params.id || req.params.profileId;
  
  // Use permission-based access control
  if (canAccessResource(req.user, PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL, profileId)) {
    return next();
  }

  res.status(403).json({ error: 'Access denied' });
};

// Permission-based middleware functions
export const requirePermissions = (permissions: string[], requireAll: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const hasRequiredPermissions = requireAll 
      ? permissions.every(permission => hasPermission(req.user!, permission))
      : permissions.some(permission => hasPermission(req.user!, permission));

    if (!hasRequiredPermissions) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        required: permissions,
        requireAll,
        userPermissions: req.user.permissions
      });
    }

    next();
  };
};

export const requireResourceAccess = (permission: string, getResourceOwnerId?: (req: Request) => string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const resourceOwnerId = getResourceOwnerId ? getResourceOwnerId(req) : req.params.id || req.params.profileId;
    
    if (canAccessResource(req.user, permission, resourceOwnerId)) {
      return next();
    }

    res.status(403).json({ 
      error: 'Access denied',
      required: permission,
      userPermissions: req.user.permissions
    });
  };
};
