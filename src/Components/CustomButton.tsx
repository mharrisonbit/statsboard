import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
  icon?: ReactNode;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  iconPosition?: 'left' | 'right';
  iconOnPress?: (() => void) | undefined;
  iconSolid?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  icon,
  iconName,
  iconColor = '#fff',
  iconSize = 16,
  iconPosition = 'left',
  iconOnPress,
  iconSolid = false,
}: Props) {
  // Merge default styles with incoming styles. If the same property exists in
  // the incoming style, it will override the default because we flatten and
  // apply incoming styles after defaults.
  const combinedButtonStyle = StyleSheet.flatten([styles.button, style]);
  const combinedTextStyle = StyleSheet.flatten([styles.text, textStyle]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={combinedButtonStyle}
      disabled={disabled}
    >
      <View
        style={[
          styles.contentRow,
          iconPosition === 'right' ? styles.contentRowReverse : null,
        ]}
      >
        {iconPosition === 'left' ? (
          icon ? (
            <View style={styles.iconWrapper}>{icon}</View>
          ) : iconName ? (
            <TouchableOpacity
              onPress={iconOnPress}
              disabled={!iconOnPress}
              style={styles.iconWrapper}
            >
              <FontAwesome5
                name={iconName}
                color={iconColor}
                size={iconSize}
                solid={iconSolid}
              />
            </TouchableOpacity>
          ) : null
        ) : null}

        <Text style={combinedTextStyle}>{title}</Text>

        {iconPosition === 'right' ? (
          icon ? (
            <View style={styles.iconWrapper}>{icon}</View>
          ) : iconName ? (
            <TouchableOpacity
              onPress={iconOnPress}
              disabled={!iconOnPress}
              style={styles.iconWrapper}
            >
              <FontAwesome5
                name={iconName}
                color={iconColor}
                size={iconSize}
                solid={iconSolid}
              />
            </TouchableOpacity>
          ) : null
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentRowReverse: {
    flexDirection: 'row-reverse',
  },
  iconWrapper: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
