import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  task: {
    width: '85%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    marginHorizontal: 30,
    backgroundColor: 'rgba(146, 131, 116, 0.2)',
  },
  titleContainer: {
    width: '90%',
    gap: 10,
  },
  title: {
    width: '100%',
    fontSize: 22,
    color: Colors.fg,
    fontWeight: '500',
    margin: 0,
  },
  checkbox: {
    width: 25,
    height: 25,
    marginTop: 5,
    borderWidth: 3,
    borderRadius: 7,
    borderColor: Colors.fg,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 7,
  },
  calendar: {
    width: 20,
    height: 20,
    tintColor: Colors.orange,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.fg,
  },
  trashImage: { width: 30, height: 30 },
  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
