import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  task: {
    width: '85%',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  titleContainer: {
    width: '90%'
  },
  title: {
    width: "100%",
    fontSize: 22,
    color: Colors.fg,
    margin: 0,
  },
  checkbox: {
    marginTop: 5,
    borderColor: Colors.fg,
  },
  trashImage: { width: 30, height: 30 },
  priorityContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
});
