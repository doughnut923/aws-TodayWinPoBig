// Jest setup file
// Mock React Native globals for testing environment

global.__DEV__ = process.env.NODE_ENV === 'development';

// Mock console methods if needed
if (!global.console) {
  global.console = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  };
}