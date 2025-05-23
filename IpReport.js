import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

const IpReport = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log("Route params:", route.params); // Add this line for debugging
  const { selectedId, selectedPatient } = route.params || {};
  const [ipList, setIpList] = useState([]);

  useEffect(() => {
    if (selectedId) {
      fetchIpList(selectedId);
    }
  }, [selectedId]);

  const fetchIpList = async (id) => {
    try {
      const response = await axios.get(
        `http://192.168.90.203:3000/ip-list/${id}`
      );
      setIpList(response.data);
      console.log("Fetched IP list:", response.data); // Logging fetched data
    } catch (error) {
      console.error("Error fetching IP list:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const handleSelectMember = (item) => {
    navigation.navigate("Ipchoose", {
      selectedItem: item,
      ipCode: item.ipCode || item[0],
      opCode: item.opCode || item[1],
      patientName: selectedPatient.name,
    });
  };

  const renderItem = ({ item }) => {
    const ipCode = item.ipCode || item[0];
    const opCode = item.opCode || item[1];
    const admitDate = item.admitDate || item[2];
    const dischargeDate = item.dischargeDate || item[3];

    return (
      <TouchableOpacity
        style={styles.ipItem}
        onPress={() => handleSelectMember(item)}
      >
        <Text>IP Code: {ipCode}</Text>
        <Text>OP Code: {opCode}</Text>
        <Text>Admit Date: {formatDate(admitDate)}</Text>
        <Text>Discharge Date: {formatDate(dischargeDate)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IP Report</Text>
      {selectedPatient && (
        <>
          <Text style={styles.subHeader}>Patient ID: {selectedPatient.id}</Text>
          <Text style={styles.subHeader}>
            Patient Name: {selectedPatient.name}
          </Text>
        </>
      )}
      {ipList.length > 0 ? (
        <FlatList
          data={ipList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No IP records found.</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  ipItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default IpReport;
