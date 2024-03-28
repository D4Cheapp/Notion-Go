import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  propertyContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  modalWindowProperty: {
    flexShrink: 1,
    flexWrap: 'wrap',
    paddingBottom: 10,
    borderBottomColor: 'rgba(146, 131, 116, 0.2)',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  propertyLogo: {
    flexDirection: 'row',
    gap: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  fileLinkText: {
    color: Colors.gray,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 19,
    color: Colors.fg,
  },
  icon: {
    width: 25,
    height: 25,
  },
  select: {
    fontSize: 19,
    color: Colors.bg,
    alignSelf: 'flex-start',
    fontWeight: '500',
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 5,
  },
  dateContainer: {
    flexDirection: 'column',
  },
  checkbox: {
    width: 20,
    height: 20,
    marginTop: 3,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.fg,
  },
});
