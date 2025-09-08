import { 
  hasPermission, 
  PERMISSIONS,
  UserWithPermissions 
} from '../shared/types/permissions';

describe('Permission Helper Functions', () => {
  describe('hasPermission', () => {
    it('should return true when user has the required permission', () => {
      // Arrange
      const user: UserWithPermissions = {
        id: 'user1',
        permissions: [PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL]
      };

      // Act
      const result = hasPermission(user, PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when user lacks the required permission', () => {
      // Arrange
      const user: UserWithPermissions = {
        id: 'user1',
        permissions: [PERMISSIONS.EMPLOYEE_PROFILE.READ_PUBLIC]
      };

      // Act
      const result = hasPermission(user, PERMISSIONS.EMPLOYEE_PROFILE.READ_ALL);

      // Assert
      expect(result).toBe(false);
    });
  });
});
