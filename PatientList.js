import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const App = () => {
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const phoneNumber = route.params
    ? route.params.phoneNumber
    : "Default Phone Number";

  useEffect(() => {
    checkPatientList(phoneNumber);
  }, []);

  const checkPatientList = async (phoneNumber) => {
    try {
      const response = await axios.post(
        "http://192.168.90.203:3000/check-patient-list",
        {
          phoneNumber: phoneNumber,
        }
      );
      setPatientList(response.data);
    } catch (error) {
      console.error("Error checking patient list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPatient = (patient) => {
    // Extracting ID from patient data
    const id = patient[0]; // Assuming the ID is at index 0

    // Navigating to the 'AppointmentPage' screen and passing the selected ID
    navigation.navigate("Appointment", { id });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.patientItem}
        onPress={() => handleSelectPatient(item)}
      >
        <Text style={styles.patientText}>ID: {item[0]}</Text>
        {item[1] && <Text style={styles.patientText}>Name: {item[1]}</Text>}
        {item[2] && <Text style={styles.patientText}>Email: {item[2]}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Patient List</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : patientList.length === 0 ? (
        <Text>No patients found</Text>
      ) : (
        <FlatList
          data={patientList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.patientList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  patientList: {
    marginBottom: 20,
  },
  patientItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  patientText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
