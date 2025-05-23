import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';

const LabReportItem = ({ roomNo, radiologyReport }) => {
  const showAlert = (message) => {
    Alert.alert('Action', message);
  };

  return (
    <Card style={styles.labReportItem}>
      <Card.Content>
        {roomNo && <Title>{`Room No: ${roomNo}`}</Title>}
        {radiologyReport && <Paragraph>{`Radiology Report: ${radiologyReport}`}</Paragraph>}
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="eye"
          onPress={() => {
            console.log('View Pressed');
            showAlert('View Pressed');
          }}
        />
        <IconButton
          icon="download"
          onPress={() => {
            console.log('Download Pressed');
            showAlert('Download Pressed');
          }}
        />
      </Card.Actions>
    </Card>
  );
};

const LabReportsScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [additionalReportsVisible, setAdditionalReportsVisible] = useState(false);

  const patientData = {
    name: 'Patient Name 1',
    opCode: 'Op Code 1',
    labReports: [
      { roomNo: '101',date: '24.08.2024', radiologyReport: 'X-Ray' },
      { roomNo: '102',date: '26.08.2024', radiologyReport: 'CT Scan' },
      { roomNo: '103',date: '22.01.2024', radiologyReport: 'MRI' },
      { roomNo: '104', date: '04.08.2024',radiologyReport: 'Ultrasound' },
      { roomNo: '105',date: '05.09.2024', radiologyReport: 'PET Scan' },
      { roomNo: '106', date: '06.10.2024',radiologyReport: 'Mammogram' },
    ],
  };

  const initialReports = patientData.labReports.slice(0, 2);
  const additionalReports = patientData.labReports.slice(2);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lab Reports</Text>
      <View style={styles.patientItem}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{patientData.name}</Text>
            <Text>{`Op Reports: ${patientData.opCode}`}</Text>
          </View>
        </TouchableOpacity>
        {expanded && (
          <>
            <View style={styles.horizontalLine} />
            {initialReports.map((item, index) => (
              <LabReportItem key={index} {...item} />
            ))}
            {!additionalReportsVisible && additionalReports.length > 0 && (
              <TouchableOpacity onPress={() => setAdditionalReportsVisible(true)}>
                <Text style={styles.loadMoreText}>Load More...</Text>
              </TouchableOpacity>
            )}
            {additionalReportsVisible &&
              additionalReports.map((item, index) => (
                <LabReportItem key={index} {...item} />
              ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  patientItem: {
    marginBottom: 20,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  horizontalLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 10,
  },
  labReportItem: {
    marginBottom: 20,
  },
  loadMoreText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LabReportsScreen;
