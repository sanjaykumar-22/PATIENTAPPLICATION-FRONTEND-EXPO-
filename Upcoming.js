import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const UpcomingAppointments = ({ route }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    console.log("ID passed:", id); // Print the ID passed in the console

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://192.168.90.203:3000/upcomingAppointments/${id}`
        );
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments. Please try again later.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Appointments</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
              <Text>DoctorName: {item.date}</Text>
              <Text>Time: {item.time}</Text>
              <Text>Doctor: {item.doctor}</Text>
              <Text>careType: {item.department}</Text>
              <Text>Created At: {item.createdAt}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  appointmentItem: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default UpcomingAppointments;
