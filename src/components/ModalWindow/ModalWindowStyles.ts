import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
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
    backgroundColor: Colors.bg,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.fg,
    borderStyle: 'solid',
    width: '85%',
    maxHeight: '90%',
    padding: 30,
    gap: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.fg,
    fontFamily: 'bold',
    fontSize: 30,
    textAlign: 'center',
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
  },
  icon: {
    width: 30,
    height: 30,
  },
  confirmButton: {
    backgroundColor: Colors.green,
  },
  exitButton: {
    backgroundColor: Colors.red,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.bg,
  },
});
