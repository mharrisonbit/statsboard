// Jest setup: silence console errors from react-native-screens if any
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Screen native module hasn\'t been linked')) {
    return;
  }
  originalError(...args);
};
