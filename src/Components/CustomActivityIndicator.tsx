import React from "react";
import {
  ActivityIndicator,
  ColorValue,
  Modal,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type CustomActivityIndicatorProps = {
  size?: "small" | "large" | number;
  color?: ColorValue;
  overlay?: boolean; // Whether to show fullscreen modal overlay
  visible?: boolean; // Control visibility (for modal usage)
  containerStyle?: ViewStyle;
};

const CustomActivityIndicator: React.FC<CustomActivityIndicatorProps> = ({
  size = "large",
  color = "#007AFF",
  overlay = false,
  visible = true,
  containerStyle,
}) => {
  if (!visible) return null;

  const indicator = (
    <View
      style={[
        styles.spinnerContainer,
        overlay && styles.overlay,
        containerStyle,
      ]}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );

  return overlay ? (
    <Modal transparent visible>
      {indicator}
    </Modal>
  ) : (
    indicator
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
});

export default CustomActivityIndicator;
