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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [opList, setOpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const { phoneNumber } = route.params;
    setPhoneNumber(phoneNumber);
    fetchOpList(phoneNumber);
  }, []);

  const fetchOpList = async (phoneNumber) => {
    try {
      const response = await axios.get(
        `http://192.168.90.203:3000/op-list/${phoneNumber}`
      );
      setOpList(response.data);
    } catch (error) {
      console.error("Error fetching OP list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMember = (item) => {
    const selectedId = item[0]; // Extracting ID from patient data
    const selectedPatient = {
      id: item[0],
      name: item[1],
      email: item[2],
    };
    navigation.navigate("Report", { selectedId, selectedPatient });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.opItem}
        onPress={() => handleSelectMember(item)}
      >
        <Text style={styles.patientText}>ID: {item[0]}</Text>
        <Text style={styles.patientText}>Patient Name: {item[1]}</Text>
        <Text style={styles.patientText}>Email: {item[2]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OP List</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : opList.length === 0 ? (
        <Text>No data found</Text>
      ) : (
        <FlatList
          data={opList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.opList}
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
  opList: {
    marginBottom: 20,
  },
  opItem: {
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
