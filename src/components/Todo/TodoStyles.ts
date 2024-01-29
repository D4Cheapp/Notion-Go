import { StyleSheet } from 'react-native';
import { Colors } from 'constants/theme';

export const styles = StyleSheet.create({
  todoContainer: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCircle: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderLeftColor: Colors.seaSalt,
    borderRightColor: Colors.seaSalt,
    borderBottomColor: Colors.seaSalt,
    borderTopColor: Colors.raisinBlack,
    borderRadius: 50
  }
});
