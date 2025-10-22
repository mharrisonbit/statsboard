import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CustomButton from './CustomButton';

interface InputWithButtonProps {
  value: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
  placeholder?: string;
  buttonTitle: string;
  disabled?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  buttonStyle?: any;
}

const InputWithButton: React.FC<InputWithButtonProps> = ({
  value,
  onChangeText,
  onPress,
  placeholder = 'Enter date...',
  buttonTitle,
  disabled = false,
  containerStyle,
  inputStyle,
  buttonStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
      <CustomButton
        title={buttonTitle}
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, buttonStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default InputWithButton;
