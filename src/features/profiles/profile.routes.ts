import express from 'express';
import { getProfile, updateProfile, listProfiles, getDepartments, browseProfiles } from './profile.controller.js';
import { authenticate, requirePermissions, requireResourceAccess } from '../../shared/middleware/auth.middleware.js';
import { PERMISSIONS } from '../../shared/types/permissions.js';

const router = express.Router();

// Apply authentication to all profile routes
router.use(authenticate);

// Get departments for filtering (requires read all permission) - must come before /:id route
router.get('/departments/list', requirePermissions([PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL]), getDepartments);

// List all profiles (requires read all permission) - must come before /:id route
router.get('/list/all', requirePermissions([PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL]), listProfiles);

// Browse profiles for co-workers and employees (public data only)
router.get('/browse', requirePermissions([PERMISSIONS.EMPLOYEE_PROFILE.READ_PUBLIC]), browseProfiles);

// Get single profile (permission check handled in controller)
router.get('/:id', getProfile);

// Update profile (permission check handled in controller for granular control)
router.put('/:id', updateProfile);

export default router;
