module.exports = {
  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
  PORT: process.env.PORT || 5050,

  LANGUAGE: process.env.LANGUAGE || 'en',

  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'practice1',

  JWT_SECRET: process.env.JWT_SECRET || 'ThiIsJWTSecret',
  JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || '1d',

  PASSWORD_ENCRYPTION_LEVEL: process.env.PASSWORD_ENCRYPTION_LEVEL || 12,
};
