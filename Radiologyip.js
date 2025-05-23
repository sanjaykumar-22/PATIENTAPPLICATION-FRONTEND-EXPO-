import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const RadiologyReportItem = ({ roomNo, date, report }) => (
  <Card style={styles.reportItem}>
    <Card.Content>
      <Title>{`Room No: ${roomNo}`}</Title>
      <Paragraph>{`Date: ${date}`}</Paragraph>
      <Paragraph>{`Report: ${report}`}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <IconButton icon="eye" onPress={() => console.log('View Pressed')} />
      <IconButton icon="download" onPress={() => console.log('Download Pressed')} />
    </Card.Actions>
  </Card>
);

const PatientItem = ({ name, opCode, ipCode, radiologyReports }) => (
  <View style={styles.patientItem}>
    <View style={styles.patientInfo}>
      <Text style={styles.patientName}>{name}</Text>
      <Text>{`Op Code: ${opCode}`}</Text>
      <Text>{`IP Code: ${ipCode}`}</Text>
    </View>
    <View style={styles.horizontalLine} />
    <Text style={styles.sectionTitle}>Radiology Reports</Text>
    {radiologyReports.map((item) => (
      <RadiologyReportItem key={item.roomNo} {...item} />
    ))}
  </View>
);

const LabReportsScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Patient Reports</Text>
    <PatientItem
      name="Patient Name 1"
      opCode="Op Code 1"
      ipCode="IP Code 1"
      radiologyReports={[
        { roomNo: 'A23103', date: '24.08.2024', report: 'MRI' },
        { roomNo: 'B11205', date: '25.08.2024', report: 'X-Ray' },
      ]}
    />
    <PatientItem
      name="Patient Name 2"
      opCode="Op Code 2"
      ipCode="IP Code 2"
      radiologyReports={[
        { roomNo: 'C30410', date: '26.08.2024', report: 'CT Scan' },
        { roomNo: 'D21201', date: '27.08.2024', report: 'Ultrasound' },
      ]}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'blue',
  },
  reportItem: {
    marginBottom: 20,
  },
});

export default LabReportsScreen;
