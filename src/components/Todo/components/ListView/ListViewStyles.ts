import { StyleSheet } from 'react-native';
import { Colors } from 'constants/theme';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
  },
  activeHeaderButton: { backgroundColor: Colors.electricIndigo },
  headerButton: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.englishViolet
  },
  buttonText: { textAlign: 'center', color: Colors.seaSalt, fontSize: 20 },
  taskContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 15,
    paddingHorizontal: 30,
    gap: 20,
  },
});
