import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const UserProfile = ({ route }) => {
  const { phoneNumber } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.90.203:3000/user/${phoneNumber}`
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (No user found)
          setError("No user found for the provided phone number.");
        } else {
          // Handle other errors
          console.error("Error fetching user data:", error);
          setLoading(false); // Set loading to false to stop loading indicator
          setError("Failed to fetch user data. Please try again.");
        }
      }
    };

    fetchUserData();
  }, [phoneNumber]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : userData ? (
        <>
          <Text style={styles.phoneNumber}>
            Phone Number: {userData.phoneNumber}
          </Text>
          <Text style={styles.username}>Username: {userData.username}</Text>
          {userData.tempCode && (
            <Text style={styles.tempCode}>
              Temporary Code: {userData.tempCode}
            </Text>
          )}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phoneNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    marginTop: 10,
  },
  tempCode: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default UserProfile;
