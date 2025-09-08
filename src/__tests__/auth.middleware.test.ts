import { authenticate } from '../shared/middleware/auth.middleware';
import { UserRole } from '../shared/types/index';
import * as mockData from '../shared/services/mockData';

jest.mock('../shared/services/mockData');
const mockGetSessionUser = mockData.getSessionUser as jest.MockedFunction<typeof mockData.getSessionUser>;

describe('Auth Middleware Tests', () => {
  const mockReq: any = { headers: {} };
  const mockRes: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq.user = undefined;
  });

  it('should authenticate user with valid session token', () => {
    // Arrange
    const mockUser = {
      id: 'emp1',
      email: 'john@company.com',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.EMPLOYEE,
      permissions: ['read_profile']
    };
    mockReq.headers = { authorization: 'Bearer valid-token' };
    mockGetSessionUser.mockReturnValue(mockUser);

    // Act
    authenticate(mockReq, mockRes, mockNext);

    // Assert
    expect(mockReq.user).toBe(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should reject request without authorization header', () => {
    // Arrange
    mockReq.headers = {};

    // Act
    authenticate(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'No session provided' });
  });

  it('should reject request with invalid session token', () => {
    // Arrange
    mockReq.headers = { authorization: 'Bearer invalid-token' };
    mockGetSessionUser.mockReturnValue(undefined);

    // Act
    authenticate(mockReq, mockRes, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid or expired session' });
  });
});
