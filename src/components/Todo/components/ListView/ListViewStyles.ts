import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
  },
  headerButton: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.orange,
  },
  activeHeaderButton: { backgroundColor: Colors.orange, color: Colors.bg },
  buttonText: { textAlign: 'center', color: Colors.fg, fontSize: 20, fontWeight: 'bold' },
  taskContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 15,
    paddingLeft: '5%',
    gap: 20,
  },
});
