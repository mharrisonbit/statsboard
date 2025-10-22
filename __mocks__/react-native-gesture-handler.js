const RN = require('react-native');

module.exports = {
  GestureHandlerRootView: RN.View,
  PanGestureHandler: RN.View,
  TapGestureHandler: RN.View,
  LongPressGestureHandler: RN.View,
  RectButton: RN.TouchableOpacity,
  State: {},
  // some code imports Text from gesture-handler; forward it to RN.Text
  Text: RN.Text,
};
