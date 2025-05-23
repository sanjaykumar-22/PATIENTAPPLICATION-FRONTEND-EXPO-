import React, { useState, forwardRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment"; // Import moment.js for date formatting
import * as Location from "expo-location";

const DoctorAppointmentForm = forwardRef((props, ref) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reasonForAppointment, setReasonForAppointment] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber1, setContactNumber1] = useState("");
  const [contactNumber2, setContactNumber2] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Route Params:", props.route.params);
  }, [props.route.params]);

  const handleAppointmentSubmit = async () => {
    if (
      !patientName ||
      !appointmentDate ||
      !appointmentTime ||
      !reasonForAppointment ||
      !location ||
      !isValidPhoneNumber(contactNumber1) ||
      !isValidPhoneNumber(contactNumber2)
    ) {
      Alert.alert(
        "Validation Error",
        "Please fill out all required fields and ensure phone numbers contain 10 digits"
      );
      return;
    }

    try {
      // Format the appointment date using moment.js to 'YYYY-MM-DD' format
      const formattedAppointmentDate =
        moment(appointmentDate).format("YYYY-MM-DD");

      // Format the appointment time using moment.js to 'HH:mm' format (24-hour format)
      const formattedAppointmentTime = moment(
        appointmentTime,
        "hh:mm A"
      ).format("HH:mm");

      const appointmentDetails = {
        doctorId: props.route.params.doctorId,
        doctorName: props.route.params.doctorName,
        departmentId: props.route.params.departmentId,
        departmentName: props.route.params.departmentName,
        patientName: patientName,
        appointmentDate: formattedAppointmentDate, // Use the formatted date
        appointmentTime: formattedAppointmentTime, // Use the formatted time
        reasonForAppointment: reasonForAppointment,
        location: location,
        contactNumber1: contactNumber1,
        contactNumber2: contactNumber2,
      };

      // Send appointment details to the backend for storage
      await axios.post(
        "http://192.168.90.203:3000/store-appointment",
        appointmentDetails
      );

      Alert.alert(
        "Appointment Submitted",
        "Your appointment details have been sent. Please wait for approval.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("DoctorConfirmation");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error submitting appointment:", error);
      Alert.alert(
        "Error",
        "Failed to submit appointment. Please try again later."
      );
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setAppointmentDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setAppointmentTime(time);
    hideTimePicker();
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const fetchCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Denied",
          "Location permission was denied. Unable to fetch current location."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const formattedAddress = `${addressResponse[0].name}, ${addressResponse[0].street}, ${addressResponse[0].city}, ${addressResponse[0].region}, ${addressResponse[0].postalCode}, ${addressResponse[0].country}`;
      setLocation(formattedAddress);
    } catch (error) {
      console.error("Error fetching current location:", error);
      Alert.alert(
        "Location Error",
        "Failed to fetch current location. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container} ref={ref}>
      <Text style={styles.label}>Patient Name</Text>
      <TextInput
        style={styles.input}
        value={patientName}
        onChangeText={setPatientName}
        placeholder="Enter patient's name"
      />
      <Text style={styles.label}>Appointment Date</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={styles.datePickerText}>
          {appointmentDate
            ? moment(appointmentDate).format("YYYY-MM-DD")
            : "Select Date"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.label}>Appointment Time</Text>
      <TouchableOpacity onPress={showTimePicker}>
        <Text style={styles.datePickerText}>
          {appointmentTime
            ? moment(appointmentTime).format("hh:mm A")
            : "Select Time"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      <Text style={styles.label}>Reason for Appointment</Text>
      <TextInput
        style={styles.input}
        value={reasonForAppointment}
        onChangeText={setReasonForAppointment}
        placeholder="Enter reason for the appointment"
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity onPress={fetchCurrentLocation}>
          <Text style={styles.locationIcon}>📍</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter your location"
      />
      <Text style={styles.label}>Contact Number 1</Text>
      <TextInput
        style={styles.input}
        value={contactNumber1}
        onChangeText={setContactNumber1}
        placeholder="Enter contact number 1"
        keyboardType="phone-pad" // Set keyboardType to phone-pad
        maxLength={10} // Set maxLength to limit input to 10 characters
      />
      <Text style={styles.label}>Contact Number 2</Text>
      <TextInput
        style={styles.input}
        value={contactNumber2}
        onChangeText={setContactNumber2}
        placeholder="Enter contact number 2"
        keyboardType="phone-pad" // Set keyboardType to phone-pad
        maxLength={10} // Set maxLength to limit input to 10 characters
      />
      <Button title="Submit Appointment" onPress={handleAppointmentSubmit} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 16,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  locationIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
});

export default DoctorAppointmentForm;
