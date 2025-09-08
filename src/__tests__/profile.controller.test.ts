import { getProfile } from '../features/profiles/profile.controller';
import { UserRole } from '../shared/types/index';
import * as mockData from '../shared/services/mockData';

jest.mock('../shared/services/mockData');
const mockFindProfileById = mockData.findProfileById as jest.MockedFunction<typeof mockData.findProfileById>;

describe('Profile Controller Tests', () => {
  const mockReq: any = { params: { id: 'emp1' } };
  const mockRes: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return profile for authenticated manager', async () => {
    // Arrange
    const mockProfile = {
      id: 'emp1',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Developer',
      department: 'Engineering',
      email: 'john@company.com',
      salary: 75000
    };
    mockReq.user = {
      id: 'mgr1',
      role: UserRole.MANAGER,
      permissions: ['employee_profile:read_all']
    };
    mockFindProfileById.mockReturnValue(mockProfile as any);

    // Act
    await getProfile(mockReq, mockRes);

    // Assert
    expect(mockRes.json).toHaveBeenCalledWith({ profile: mockProfile });
  });

  it('should return 404 when profile not found', async () => {
    // Arrange
    mockReq.user = { id: 'mgr1', role: UserRole.MANAGER, permissions: ['employee_profile:read_all'] };
    mockFindProfileById.mockReturnValue(undefined);

    // Act
    await getProfile(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Profile not found' });
  });
});
