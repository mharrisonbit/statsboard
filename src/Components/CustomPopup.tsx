// useSimpleModal.tsx
import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { isWhiteSpaceOrNull } from '../Helpers/Utils';
import CustomButton from './CustomButton';

const useCustomModalPopup = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const openModal = useCallback((modalTitle?: string, modalBody?: string) => {
    setTitle(modalTitle ?? '');
    setBody(modalBody ?? '');
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

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
            <CustomButton title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    );
  }, [visible, title, body, closeModal]);

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
    width: '80%',
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
});
