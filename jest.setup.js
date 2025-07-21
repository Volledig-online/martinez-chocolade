// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Mock environment variables for testing
process.env.DATABASE_SQL_URL = 'test-server';
process.env.DATABASE_SQL_USER = 'test-user';
process.env.DATABASE_SQL_PASSWORD = 'test-password';
process.env.DATABASE_SQL_DATABASE = 'test-database';
