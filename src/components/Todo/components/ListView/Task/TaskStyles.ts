import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  task: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: '5%',
    paddingTop: 12,
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: 'rgba(146, 131, 116, 0.2)',
  },
  titleContainer: {
    width: '70%',
  },
  icon: {
    width: 25,
    height: 25,
  },
  title: {
    width: '100%',
    fontSize: 22,
    color: Colors.fg,
    fontWeight: '500',
    margin: 0,
  },
  checkbox: {
    width: 30,
    height: 30,
    marginTop: 5,
    borderWidth: 3,
    borderRadius: 7,
    borderColor: Colors.fg,
  },
  trashImage: { marginTop: 5, width: 30, height: 30 },
});
