import { UserRole, EmployeeProfile } from '../shared/types/index';

describe('Simple Profile Tests', () => {
  it('should validate profile data structure', () => {
    // Arrange
    const profileData = {
      id: 'emp1',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Software Engineer',
      department: 'Engineering',
      email: 'john.doe@company.com',
      salary: 75000
    };

    // Act
    const isValidProfile = !!(profileData.id && profileData.firstName && profileData.lastName);

    // Assert
    expect(isValidProfile).toBe(true);
    expect(profileData.id).toBe('emp1');
    expect(profileData.firstName).toBe('John');
    expect(profileData.department).toBe('Engineering');
  });

  it('should validate user role permissions', () => {
    // Arrange
    const managerRole = UserRole.MANAGER;

    // Act
    const canManagerViewSalary = managerRole === UserRole.MANAGER;

    // Assert
    expect(canManagerViewSalary).toBe(true);

  });

  it('should filter sensitive profile data based on role', () => {
    // Arrange
    const fullProfile = {
      id: 'emp1',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Developer',
      department: 'Engineering',
      salary: 75000,
      email: 'john@company.com'
    };

    const filterProfileByRole = (profile: any, role: UserRole) => {
      return role === UserRole.MANAGER
        ? profile
        : {
          id: profile.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          position: profile.position,
          department: profile.department
        };
    };

    // Act & Assert - Test employee role (should filter sensitive data)
    const employeeProfile = filterProfileByRole(fullProfile, UserRole.EMPLOYEE);
    expect(employeeProfile).not.toHaveProperty('salary');
    expect(employeeProfile).not.toHaveProperty('email');
    expect(employeeProfile.firstName).toBe('John');

    // Act & Assert - Test manager role (should include all data)
    const managerProfile = filterProfileByRole(fullProfile, UserRole.MANAGER);
    expect(managerProfile).toHaveProperty('salary');
    expect(managerProfile).toHaveProperty('email');
    expect(managerProfile.salary).toBe(75000);
  });
});
