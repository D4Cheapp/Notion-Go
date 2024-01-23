import { StyleSheet } from "react-native";
import { Colors } from "constants/theme";

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  errorContainer: {
    maxWidth: '85%',
    borderColor: Colors.seaSalt,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(182, 40, 59, 0.9)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: '90%',
    color: Colors.seaSalt,
    fontSize: 25,
  },
  closeButton: {
    height: 35,
  },
});