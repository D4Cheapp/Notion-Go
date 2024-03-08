import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderBottomColor: Colors.orange,
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  title: {
    fontFamily: 'bold',
    color: Colors.fg,
    textAlign: 'center',
    fontSize: 30,
  },
  dataContentContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 15,
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 5,
  },
  inputLabel: {
    color: Colors.fg,
    fontSize: 20,
    textAlign: 'left',
  },
  input: {
    borderColor: Colors.fg,
    borderWidth: 2,
    borderRadius: 5,
    color: Colors.fg,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 18,
  },
  settingsImage: { height: 35, width: 35 },
  taskViewImage: { height: 40, width: 40 },
});
