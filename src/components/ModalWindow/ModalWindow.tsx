import { Text, Image, Modal, View, Pressable } from 'react-native';
import { TaskType } from '@/types';
import { styles } from './ModalWindowStyles';

interface Props {
  isWindowActive: boolean;
  closeAction: () => void;
  title: string | null;
  icon?: TaskType['icon'];
  action?: () => void;
  children?: React.ReactNode;
}

const ModalWindow = ({
  title,
  icon,
  isWindowActive,
  action,
  closeAction,
  children,
}: Props): React.ReactNode => {
  return (
    <Modal animationType="fade" onRequestClose={closeAction} transparent visible={isWindowActive}>
      <View style={styles.background}>
        <Pressable onPress={closeAction} style={styles.blur} />
        <View style={styles.container}>
          <Text style={styles.headerText}>
            {' '}
            {icon &&
              (icon.type === 'emoji' ? (
                icon.emoji + ' '
              ) : (
                <>
                  <Image
                    style={styles.icon}
                    source={{ uri: icon.type === 'external' ? icon.external.url : icon.file.url }}
                  />
                  <Text> </Text>
                </>
              ))}
            {title}
          </Text>
          {children}
          <View style={styles.buttonContainer}>
            {action && (
              <Pressable onPress={action} style={[styles.button, styles.confirmButton]}>
                <Text style={styles.buttonText}>Confirm</Text>
              </Pressable>
            )}
            <Pressable onPress={closeAction} style={[styles.button, styles.exitButton]}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWindow;
