import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import axios from "axios";

const LabReportItem = ({ opCode, testDate, labRefN, testName }) => {
  const showAlert = (message) => {
    Alert.alert("Action", message);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{`OP Code: ${opCode || "N/A"}`}</Title>
        <Paragraph>{`Test Date: ${testDate || "N/A"}`}</Paragraph>
        <Paragraph>{`Lab Reference: ${labRefN || "N/A"}`}</Paragraph>
        <Paragraph>{`Test Name: ${testName || "N/A"}`}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="download"
          onPress={() => {
            console.log("Download Pressed");
            showAlert("Start to downloading");
          }}
        />
      </Card.Actions>
    </Card>
  );
};

const LabReportsScreen = ({ route }) => {
  const { selectedId } = route.params;
  const [labReports, setLabReports] = useState([]);

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        console.log("Fetching lab reports for patient ID:", selectedId);
        const response = await axios.get(
          `http://192.168.90.203:3000/lab-reports/${selectedId}`
        );
        console.log("Lab reports response:", response.data);
        setLabReports(response.data);
      } catch (error) {
        console.error("Error fetching lab reports:", error);
      }
    };

    fetchLabReports();
  }, [selectedId]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lab Reports</Text>
      {labReports.map((report, index) => (
        <LabReportItem
          key={index}
          opCode={report?.opCode || report[0]}
          testDate={report?.testDate || report[1]}
          labRefN={report?.labRefN || report[2]}
          testName={report?.testName || report[3]}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  card: {
    marginBottom: 20,
  },
});

export default LabReportsScreen;
