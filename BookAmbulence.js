import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute hook

const AmbulanceBookingForm = () => {
  const route = useRoute(); // Use useRoute hook to access route object
  const phoneNumber = route.params?.phoneNumber;
  // console.log("Phone number:", phoneNumber);

  const [patientName, setPatientName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [bloodGroup, setBloodGroup] = useState("");
  const [reason, setReason] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [attenderName, setAttenderName] = useState("");
  const [attenderContactNumber, setAttenderContactNumber] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const bloodGroupTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleBooking = async () => {
    try {
      const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0]; // Convert to 'YYYY-MM-DD' format

      const response = await fetch(
        "http://192.168.90.203:3000/ambulancebookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientName,
            dateOfBirth: formattedDateOfBirth,
            bloodGroup,
            reason,
            address,
            contactNumber,
            attenderName,
            attenderContactNumber,
            pickupLocation,
            BOOKINGPHONENUMBER: phoneNumber, // Storing phoneNumber as BOOKINGPHONENUMBER
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      Alert.alert("Success", "Ambulance booked successfully");
      // Reset form fields if needed
      setPatientName("");
      setDateOfBirth(new Date());
      setBloodGroup("");
      setReason("");
      setAddress("");
      setContactNumber("");
      setAttenderName("");
      setAttenderContactNumber("");
      setPickupLocation("");
    } catch (error) {
      console.error("Error submitting booking:", error);
      Alert.alert("Error", "Failed to book ambulance. Please try again later");
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ambulance Booking Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Patient Name"
        value={patientName}
        onChangeText={setPatientName}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{dateOfBirth.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="spinner"
          onChange={onDateChange}
        />
      )}
      <Text style={styles.label}>Blood Group</Text>
      <Picker
        style={styles.input}
        selectedValue={bloodGroup}
        onValueChange={(itemValue, itemIndex) => setBloodGroup(itemValue)}
      >
        <Picker.Item label="Select Blood Group" value="" />
        {bloodGroupTypes.map((type, index) => (
          <Picker.Item key={index} label={type} value={type} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Reason for Ambulance"
        value={reason}
        onChangeText={setReason}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
        maxLength={10} // Setting maximum length to 10
      />
      <TextInput
        style={styles.input}
        placeholder="Attender Name"
        value={attenderName}
        onChangeText={setAttenderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Attender Contact Number"
        value={attenderContactNumber}
        onChangeText={setAttenderContactNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickupLocation}
        onChangeText={setPickupLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Ambulance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AmbulanceBookingForm;
