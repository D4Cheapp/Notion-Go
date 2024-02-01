import { StyleSheet } from 'react-native';
import { Colors } from 'constants/theme';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    fontSize: 22,
    color: Colors.seaSalt,
  },
});
