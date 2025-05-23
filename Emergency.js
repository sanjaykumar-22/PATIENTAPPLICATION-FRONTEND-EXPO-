import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute hook

const MainScreen = ({ navigation }) => {
  const route = useRoute(); // Use useRoute hook to access route object
  const phoneNumber = route.params?.phoneNumber; 
  console.log("Phone number:", phoneNumber);

  const handleEmergencyContactPress = () => {
    navigation.navigate("EmergencyContactScreen");
  };

  const handleAmbulanceBookingPress = () => {
    navigation.navigate('BookAmbulance', { phoneNumber: phoneNumber });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleEmergencyContactPress}
      >
        <Text style={styles.buttonText}>Emergency Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAmbulanceBookingPress}
      >
        <Text style={styles.buttonText}>Book Ambulance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MainScreen;
