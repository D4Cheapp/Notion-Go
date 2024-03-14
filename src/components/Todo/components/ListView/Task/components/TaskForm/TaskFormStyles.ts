import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  propertyContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paramsCheckbox: {
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
  contentContainer: {
    width: '100%',
  },
  paragraph: {
    color: Colors.fg,
    fontSize: 17,
  },
  headerOne: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
    color: Colors.fg,
  },
  headerTwo: {
    fontSize: 21,
    marginTop: 18,
    marginBottom: 8,
    fontWeight: '600',
    color: Colors.fg,
  },
  headerThree: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 6,
    fontWeight: '600',
    color: Colors.fg,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 15,
    backgroundColor: Colors.gray,
  },
  callout: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: Colors.fg,
    fontSize: 17,
    backgroundColor: Colors.gray,
  },
  quote: {
    fontSize: 17,
    color: Colors.fg,
    borderLeftWidth: 2,
    borderRadius: 2,
    paddingLeft: 15,
    borderColor: Colors.fg,
  },
  column: {
    marginTop: 10,
    paddingBottom: 10,
  },
  table: {
    marginVertical: 10,
    width: '100%',
    borderColor: Colors.fg,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  tableRow: {
    borderTopColor: Colors.fg,
    borderStyle: 'solid',
    borderTopWidth: 1,
  },
  tableColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.fg,
    borderStyle: 'solid',
    borderLeftWidth: 1,
  },
});
