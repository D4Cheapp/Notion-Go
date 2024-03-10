import { Text, Modal, View, Pressable } from 'react-native';
import { styles } from './ModalWindowStyles';

interface Props {
  title: string;
  isWindowActive: boolean;
  closeAction: () => void;
  action?: () => void;
  children?: React.ReactNode;
}

const ModalWindow = ({ title, isWindowActive, action, closeAction, children }: Props): React.ReactNode => {
  return (
    <Modal animationType="fade" transparent visible={isWindowActive}>
      <View style={styles.background}>
        <Pressable onPress={closeAction} style={styles.blur} />
        <View style={styles.container}>
          <Text style={styles.headerText}>{title}</Text>
          {children}
          <View style={styles.buttonContainer}>
            {action && (
              <Pressable onPress={action} style={[styles.button, styles.confirmButton]}>
                <Text style={styles.buttonText}>Подтвердить</Text>
              </Pressable>
            )}
            <Pressable onPress={closeAction} style={[styles.button, styles.exitButton]}>
              <Text style={styles.buttonText}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWindow;
