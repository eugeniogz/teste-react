import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 0,
    borderWidth: 0,
    padding: 10,
    minHeight: 600
  },
  button: {
    height: 25
  },
  commandBar: { 
    flex: 1, 
    flexDirection: 'row', 
    minHeight: 40, 
    maxHeight: 40 
  }
});

export default styles;