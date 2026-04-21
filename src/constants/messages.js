module.exports = {
  en: {
    // Database
    DB_CONNECTED: 'Database connected successfully',
    DB_DISCONNECTED: 'Database disconnected',
    DB_ERROR: 'Database connection error',

    // Server
    SERVER_STARTED: (port) => `Server is running on port ${port}`,
    WELCOME_API_MESSAGE: 'Welcome to the practice 1 APIs',
    HEALTH_CHECK_SUCCESS: 'Health check',

    // Auth
    REGISTER_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'User logged in successfully',
    USER_ALREADY_EXISTS: 'User with this email already exists',
    INVALID_CREDENTIALS: 'Invalid email or password',
    ACCOUNT_DEACTIVATED: 'Your account has been deactivated',

    // Token
    TOKEN_MISSING: 'Access denied. No token provided',
    TOKEN_INVALID: 'Access denied. Invalid or expired token',

    // Generic
    INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later',
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later',
  },
};
