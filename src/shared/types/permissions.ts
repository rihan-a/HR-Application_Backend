export const PERMISSIONS = {
  EMPLOYEE_PROFILE: {
    READ_ALL: 'employee_profile:read_all',
    READ_PUBLIC: 'employee_profile:read_public',
    EDIT_ALL: 'employee_profile:edit_all',
    EDIT_OWN: 'employee_profile:edit_own',
    EDIT_SALARY: 'employee_profile:edit_salary'
  },
  FEEDBACK: {
    CREATE: 'feedback:create',
    READ_ALL: 'feedback:read_all',
    READ_OWN: 'feedback:read_own'
  },
  ABSENCE: {
    REQUEST: 'absence:request',
    APPROVE: 'absence:approve',
    VIEW_TEAM: 'absence:view_team'
  }
};

// Role permission mappings
export const ROLE_PERMISSIONS = {
  MANAGER: [
    PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL,
    PERMISSIONS.EMPLOYEE_PROFILE.EDIT_ALL,
    PERMISSIONS.EMPLOYEE_PROFILE.EDIT_SALARY,
    PERMISSIONS.FEEDBACK.CREATE,
    PERMISSIONS.FEEDBACK.READ_OWN,
    PERMISSIONS.FEEDBACK.READ_ALL,
    PERMISSIONS.ABSENCE.APPROVE,
    PERMISSIONS.ABSENCE.VIEW_TEAM
  ],
  EMPLOYEE: [
    PERMISSIONS.EMPLOYEE_PROFILE.READ_PUBLIC,
    PERMISSIONS.EMPLOYEE_PROFILE.EDIT_OWN,
    PERMISSIONS.FEEDBACK.CREATE,
    PERMISSIONS.FEEDBACK.READ_OWN,
    PERMISSIONS.ABSENCE.REQUEST
  ],
  // COWORKER has identical permissions to EMPLOYEE - consider consolidating
  COWORKER: [
    PERMISSIONS.EMPLOYEE_PROFILE.READ_PUBLIC,
    PERMISSIONS.EMPLOYEE_PROFILE.EDIT_OWN,
    PERMISSIONS.FEEDBACK.CREATE,
    PERMISSIONS.FEEDBACK.READ_OWN,
    PERMISSIONS.ABSENCE.REQUEST
  ]
};

// Helper function to get permissions for a role
export const getPermissionsForRole = (role: string): string[] => {
  const upperRole = role.toUpperCase() as keyof typeof ROLE_PERMISSIONS;
  return ROLE_PERMISSIONS[upperRole] || [];
};

// Permission helper functions
export interface UserWithPermissions {
  id: string;
  permissions: string[];
  role?: string;
}

/**
 * Check if a user has a specific permission
 */
export const hasPermission = (user: UserWithPermissions, permission: string): boolean => {
  return user.permissions.includes(permission);
};

/**
 * Check if a user has any of the specified permissions
 */
export const hasAnyPermission = (user: UserWithPermissions, permissions: string[]): boolean => {
  return permissions.some(permission => user.permissions.includes(permission));
};

/**
 * Check if a user has all of the specified permissions
 */
export const hasAllPermissions = (user: UserWithPermissions, permissions: string[]): boolean => {
  return permissions.every(permission => user.permissions.includes(permission));
};

/**
 * Check if a user can access a resource (either has permission or owns the resource)
 */
export const canAccessResource = (
  user: UserWithPermissions,
  permission: string,
  resourceOwnerId?: string
): boolean => {
  // If user has the general permission, allow access
  if (hasPermission(user, permission)) {
    return true;
  }

  // If checking for "own" resource access and user owns the resource
  if (resourceOwnerId && user.id === resourceOwnerId) {
    // Check if user has the corresponding "own" permission
    const ownPermission = permission.replace(':read_all', ':read_own').replace(':edit_all', ':edit_own');
    return hasPermission(user, ownPermission);
  }

  return false;
};
