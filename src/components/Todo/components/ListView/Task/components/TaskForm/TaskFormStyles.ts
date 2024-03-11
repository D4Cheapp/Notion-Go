import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  propertyContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 25,
    height: 25,
    marginTop: 5,
    borderWidth: 3,
    borderRadius: 7,
    borderColor: Colors.fg,
  },
  trashImage: {
    width: 30,
    height: 30,
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.fg,
  },
});
