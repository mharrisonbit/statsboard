/**
 * Manual Jest mock for @react-native-async-storage/async-storage
 * Re-exports the official in-memory mock provided by the package.
 */
try {
  module.exports = require('@react-native-async-storage/async-storage/jest/async-storage-mock');
} catch (e) {
  // Fallback simple mock if the package mock isn't available
  module.exports = {
    __INTERNAL_MOCK_STORAGE__: {},
    setItem: jest.fn(() => Promise.resolve(null)),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve()),
    mergeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
    getAllKeys: jest.fn(() => Promise.resolve([])),
    multiGet: jest.fn(() => Promise.resolve([])),
    multiSet: jest.fn(() => Promise.resolve()),
    multiRemove: jest.fn(() => Promise.resolve()),
  };
}
