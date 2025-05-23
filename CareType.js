import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const CareTypeSelectionPage = ({ route, navigation }) => {
  const {
    doctorId,
    doctorName,
    departmentId,
    departmentName,
    selectedDate,
    id,
  } = route.params; // Include the route ID here

  // Log the id parameter
  console.log("ID:", id);

  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = async (type) => {
    setSelectedType(type);

    try {
      // Send data to backend
      const response = await axios.post(
        "http://192.168.90.203:3000/appointmentBooking",
        {
          doctorId,
          doctorName,
          departmentId,
          departmentName,
          selectedDate,
          careType: type, // Include the selected care type
          id,
        }
      );

      // Handle success response
      console.log("Backend response:", response.data);

      // Display success message to the user
      Alert.alert(
        "Appointment Booked",
        `Your appointment for ${type} with Dr. ${doctorName} on ${selectedDate} has been booked successfully!`,
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Dashboard");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      // Handle error
      console.error("Error booking appointment:", error);
      Alert.alert(
        "Error",
        "Failed to book appointment. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Care Type</Text>

      <TouchableOpacity
        style={[
          styles.typeButton,
          selectedType === "Platinum" && styles.selectedTypeButton,
        ]}
        onPress={() => handleTypeSelect("Platinum")}
      >
        <Text style={styles.typeButtonText}>Platinum</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.typeButton,
          selectedType === "Regular Care" && styles.selectedTypeButton,
        ]}
        onPress={() => handleTypeSelect("Regular Care")}
      >
        <Text style={styles.typeButtonText}>Regular Care</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    top: 40,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  typeButton: {
    backgroundColor: "lightblue",
    paddingVertical: 10,
    top: 150,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedTypeButton: {
    backgroundColor: "lightpink",
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default CareTypeSelectionPage;
