import { login } from '../features/auth/auth.controller';
import { UserRole } from '../shared/types/index';
import * as mockData from '../shared/services/mockData';

jest.mock('../shared/services/mockData');
const mockFindUserByEmail = mockData.findUserByEmail as jest.MockedFunction<typeof mockData.findUserByEmail>;
const mockCreateSession = mockData.createSession as jest.MockedFunction<typeof mockData.createSession>;

describe('Simple Auth Tests', () => {
  const mockReq: any = { body: {} };
  const mockRes: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login user with valid credentials', async () => {
    // Arrange
    const mockUser = {
      id: 'emp1',
      email: 'john@company.com',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.EMPLOYEE,
      permissions: []
    };
    mockReq.body = { email: 'john@company.com', role: UserRole.EMPLOYEE };
    mockFindUserByEmail.mockReturnValue(mockUser);
    mockCreateSession.mockReturnValue('session-token-123');

    // Act
    await login(mockReq, mockRes);

    // Assert
    expect(mockRes.json).toHaveBeenCalledWith({
      user: mockUser,
      token: 'session-token-123'
    });
  });

  it('should reject login with missing email', async () => {
    // Arrange
    mockReq.body = { role: UserRole.EMPLOYEE };

    // Act
    await login(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Email and role are required' });
  });
});
