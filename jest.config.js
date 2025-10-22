module.exports = {
  preset: 'react-native',
  // Transform some node_modules that ship untranspiled ESM code (like react-navigation)
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|react-native-gesture-handler)/)'
  ],
  moduleNameMapper: {
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js'
  },
};
