import React from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons'; // Import Feather icon library

const PhoneNumberLink = ({ phoneNumber }) => {
  const handlePhonePress = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePhonePress} style={styles.phoneNumberContainer}>
      <Feather name="phone" size={20} color="blue" style={styles.phoneIcon} />
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Click the phone number to make a call:</Text>
      <PhoneNumberLink phoneNumber="7449108108" />
      <PhoneNumberLink phoneNumber="9952149911" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  phoneIcon: {
    marginRight: 5,
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default App;
