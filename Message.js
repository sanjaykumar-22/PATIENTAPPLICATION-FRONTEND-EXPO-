import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";

const Dashboard = ({ route }) => {
  const { phoneNumber } = route.params;
  const [ambulanceBookings, setAmbulanceBookings] = useState([]);
  const [hcAppointments, setHCAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.90.203:3000/ambulance-bookings/${phoneNumber}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAmbulanceBookings(data.ambulanceBookings);
        setHCAppointments(data.appointments);
        setLoading(false);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [phoneNumber]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item, index, listType }) => {
    const cardStyle = index % 2 === 0 ? styles.cardEven : styles.cardOdd;
    return (
      <Card containerStyle={cardStyle}>
        {listType === "ambulance" && (
          <>
            <Card.Title>Patient Name: {item[0]}</Card.Title>
            <Text>Reason: {item[1]}</Text>
            <Text>Contact Number: {item[2]}</Text>
          </>
        )}
        {listType === "appointments" && (
          <>
            <Card.Title>Patient Name: {item[1]}</Card.Title>
            <Text>Doctor ID: {item[0]}</Text>
            <Text>Date: {item[2]}</Text>
            <Text>Time: {item[3]}</Text>
          </>
        )}
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ambulance Bookings</Text>
      <FlatList
        data={ambulanceBookings}
        renderItem={({ item, index }) =>
          renderItem({ item, index, listType: "ambulance" })
        }
        keyExtractor={(item, index) => `ambulance-${index}`}
      />
      <Text style={styles.heading}>HC Appointments</Text>
      <FlatList
        data={hcAppointments}
        renderItem={({ item, index }) =>
          renderItem({ item, index, listType: "appointments" })
        }
        keyExtractor={(item, index) => `appointments-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardEven: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0", // Light gray for even cards
  },
  cardOdd: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0", // Lighter gray for odd cards
  },
});

export default Dashboard;
