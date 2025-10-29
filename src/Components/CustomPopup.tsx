// Components/CustomPopup.tsx
import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { isWhiteSpaceOrNull } from '../Helpers/Utils';
import CustomButton from './CustomButton';

interface ModalButton {
  label: string;
  value: string;
}

const useCustomModalPopup = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [buttons, setButtons] = useState<ModalButton[]>([]);
  const [resolver, setResolver] = useState<
    ((value: string | null) => void) | null
  >(null);

  const closeModal = useCallback(() => {
    setVisible(false);
    if (resolver) resolver(null);
  }, [resolver]);

  const openModal = useCallback(
    (modalTitle?: string, modalBody?: string, modalButtons?: ModalButton[]) => {
      return new Promise<string | null>(resolve => {
        setTitle(modalTitle ?? '');
        setBody(modalBody ?? '');
        setButtons(modalButtons ?? [{ label: 'Close', value: 'close' }]);
        setResolver(() => resolve);
        setVisible(true);
      });
    },
    [],
  );

  const handlePress = useCallback(
    (value: string) => {
      setVisible(false);
      if (resolver) resolver(value);
    },
    [resolver],
  );

  const ModalComponent = useCallback(() => {
    if (!visible) return null;

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {!isWhiteSpaceOrNull(title) && (
              <Text style={styles.title}>{title}</Text>
            )}
            {!isWhiteSpaceOrNull(body) && (
              <Text style={styles.body}>{body}</Text>
            )}

            <View style={styles.buttonContainer}>
              {buttons.map((btn, index) => (
                <View
                  key={index}
                  style={{ flexBasis: '45%', marginVertical: 5 }}
                >
                  <CustomButton
                    title={btn.label}
                    onPress={() => handlePress(btn.value)}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    );
  }, [visible, title, body, buttons, handlePress, closeModal]);

  return { openModal, closeModal, ModalComponent };
};

export default useCustomModalPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 400, // helps keep it from stretching too wide on tablets
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // ✅ allows wrapping to new lines
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // ✅ adds spacing between buttons (React Native 0.71+)
  },
});
