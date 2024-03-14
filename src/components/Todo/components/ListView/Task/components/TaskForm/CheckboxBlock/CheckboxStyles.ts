import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  paragraph: {
    color: Colors.fg,
    fontSize: 17,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 7,
  },
  contentCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: Colors.fg,
  },
});
