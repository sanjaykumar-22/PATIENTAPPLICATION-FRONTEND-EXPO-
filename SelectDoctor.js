import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        "http://192.168.90.203:3000/departments"
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError("Failed to fetch departments. Please try again later.");
    }
  };

  const handleDepartmentSelect = (departmentId, departmentName) => {
    // Log the selected department ID and name
    console.log("Selected department ID:", departmentId);
    console.log("Selected department name:", departmentName);
    const route = useRoute(); // Use useRoute hook to access route object
    const phoneNumber = route.params?.phoneNumber;
    console.log("Phone number:", phoneNumber);

    // Navigate to the DoctorList page while passing the department ID and name
    navigation.navigate("HomeDoctor", { departmentId, departmentName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hospital Departments</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={departments}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleDepartmentSelect(item[0], item[1])} // Pass department ID and name
            >
              <Text style={styles.itemText}>{item[1]}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item[0].toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default DepartmentList;
