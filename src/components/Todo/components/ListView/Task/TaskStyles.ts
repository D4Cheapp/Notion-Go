import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.seaSalt,
    margin: 0
  },
  priorityContainer: {
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 40,
    gap: 10
  },
});
