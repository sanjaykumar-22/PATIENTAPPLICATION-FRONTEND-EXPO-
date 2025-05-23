import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const IpReport = ({ route }) => {
  const { ipCode } = route.params;
  const [flags, setFlags] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.90.203:3000/ip-reports-flag/${ipCode}`
      );
      const [id, dischargeFlag, labFlag, radiologyFlag] = response.data;
      console.log("Data from backend:", response.data); // Log data from backend
      setFlags({
        discharge: dischargeFlag === "true",
        labReport: labFlag === "true",
        radiology: radiologyFlag === "true",
      });
      console.log("Flags:", flags); // Log flags after setting
    } catch (error) {
      console.error("Error fetching flags:", error);
      Alert.alert("Error", "Failed to fetch flags. Please try again later.");
    }
  };

  const renderReportButtons = () => {
    return (
      <View>
        {flags.discharge && (
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => handleReportSelection("Discharge")}
          >
            <Text style={styles.reportButtonText}>Discharge Report</Text>
          </TouchableOpacity>
        )}
        {flags.labReport && (
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => handleReportSelection("Lab Reports")}
          >
            <Text style={styles.reportButtonText}> Lab Report</Text>
          </TouchableOpacity>
        )}
        {flags.radiology && (
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => handleReportSelection("Radiology Report")}
          >
            <Text style={styles.reportButtonText}>Radiology Report</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleReportSelection = async (reportType) => {
    // Handle report selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IP Report</Text>
      <Text style={styles.subHeader}>IP Code: {ipCode}</Text>
      <Text style={styles.subHeader}>Select Report Type:</Text>

      {renderReportButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  reportButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default IpReport;
