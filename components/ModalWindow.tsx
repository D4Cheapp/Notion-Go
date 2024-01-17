import { Text, Modal, View, StyleSheet, Pressable } from 'react-native';
import { Colors } from 'constants/theme';

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
          <Text
            style={{
              color: Colors.seaSalt,
              fontFamily: 'bold',
              fontSize: 30,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
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

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  },
  blur: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(26, 28, 34, 0.5)',
    height: '100%',
    width: '100%',
    zIndex: 10,
    top: 0,
    left: 0,
  },
  container: {
    zIndex: 11,
    backgroundColor: Colors.raisinBlack,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.seaSalt,
    borderStyle: 'solid',
    width: '85%',
    padding: 30,
    gap: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: Colors.electricIndigo,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.seaSalt,
  },
});

export default ModalWindow;
