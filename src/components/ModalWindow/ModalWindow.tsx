import { Text, Modal, View, Pressable } from 'react-native';
import { styles } from './ModalWindowStyles';

interface ModalWindowInterface {
  title: string;
  isWindowActive: boolean;
  closeAction: () => void;
  action?: () => void;
  children?: React.ReactNode;
}

function ModalWindow({
  title,
  isWindowActive,
  action,
  closeAction,
  children,
}: ModalWindowInterface) {
  return (
    <Modal animationType="fade" transparent visible={isWindowActive}>
      <View style={styles.background}>
        <Pressable onPress={closeAction} style={styles.blur} />

        <View style={styles.container}>
          <Text style={styles.headerText}>{title}</Text>
          {children}
          <View style={styles.buttonContainer}>
            {action && (
              <Pressable onPress={action} style={styles.button}>
                <Text style={styles.buttonText}>Подтвердить</Text>
              </Pressable>
            )}

            <Pressable onPress={closeAction} style={styles.button}>
              <Text style={styles.buttonText}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalWindow;
