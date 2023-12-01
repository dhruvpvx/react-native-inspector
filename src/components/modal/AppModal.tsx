import {
  type GestureResponderEvent,
  Modal,
  StyleSheet,
  TouchableOpacity,
  type ModalProps,
} from 'react-native';
import React from 'react';

interface Props extends ModalProps {
  visible: boolean;
  close: () => void;
}

const AppModal = (props: Props) => {
  const onPress = (e: GestureResponderEvent) => {
    if (e.target === e.currentTarget) {
      props.close();
    }
  };

  return (
    <Modal
      animationType={props.animationType || 'fade'}
      visible={props.visible}
      transparent
    >
      <TouchableOpacity activeOpacity={1} style={styles.centerView}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={onPress}
          style={[styles.container, props.style]}
        >
          {props.children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
