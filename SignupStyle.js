// import {
//     View,
//     Text,
//     TextInput,
//     StyleSheet,
//     ScrollView,
//     KeyboardAvoidingView,
//     TouchableOpacity,
//   } from 'react-native';
  import { StyleSheet } from 'react-native';

//   import DateTimePicker from '@react-native-community/datetimepicker';
//   import { Picker } from '@react-native-picker/picker';
//   import { useNavigation } from '@react-navigation/native';
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    background: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    header: {
      fontSize: 20,
      color:'Black',
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    successText: {
      color: 'green',
      marginBottom: 10,
    },
    registerButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginBottom: 60,
      alignItems: 'center',
    },
    registerButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    buttonText: {
      color: '#007BFF',
      marginTop: 20,  // Use marginTop instead of marginBottom
    },
});
    export default styles;
    