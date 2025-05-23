import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

const DoctorList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { departmentId, departmentName } = route.params;
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log("Fetching doctors for department:", departmentId);
        const response = await axios.get(
          `http://192.168.90.203:3000/doctors/${departmentId}`
        );
        console.log("Doctor list response:", response.data);
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Failed to fetch doctors. Please try again later.");
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [departmentId]);

  const handleDoctorPress = (doctorId, doctorName) => {
    navigation.navigate("HomeCare", {
      doctorId,
      doctorName,
      departmentId,
      departmentName,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Doctors in Department {departmentName}</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={doctors}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.doctorItem}
              onPress={() => handleDoctorPress(item[0], item[1])}
            >
              <Text style={styles.doctorText}>ID: {item[0]}</Text>
              <Text style={styles.doctorText}>Name: {item[1]}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
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
  doctorItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  doctorText: {
    fontSize: 18,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default DoctorList;
