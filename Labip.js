import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const LabReportItem = ({ labId, opCode, ipCode, date, report }) => (
  <Card style={styles.labReportItem}>
    <Card.Content>
      <Title>{`Lab Id: ${labId}`}</Title>
      <Paragraph>{`Op Code: ${opCode}`}</Paragraph>
      <Paragraph>{`IP Code: ${ipCode}`}</Paragraph>
      <Paragraph>{`Date: ${date}`}</Paragraph>
      <Paragraph>{`Report: ${report}`}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <IconButton icon="eye" onPress={() => console.log('View Pressed')} />
      <IconButton icon="download" onPress={() => console.log('Download Pressed')} />
    </Card.Actions>
  </Card>
);

const PatientItem = ({ name, opCode, ipCode, labReports }) => (
  <View style={styles.patientItem}>
    <View style={styles.patientInfo}>
      <Text style={styles.patientName}>{name}</Text>
      <Text>{`Op Code: ${opCode}`}</Text>
      <Text>{`IP Code: ${ipCode}`}</Text>
    </View>
    <View style={styles.horizontalLine} />
    {labReports.map((item) => (
      <LabReportItem key={item.labId} {...item} />
    ))}
  </View>
);

const LabReportsScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Lab Reports</Text>
    <PatientItem
      name="Patient Name 1"
      opCode="Op Code 1"
      ipCode="IP Code 1"
      labReports={[
        { labId: '24mDA01', date: '24.08.2024', report: 'Blood' },
        { labId: '24mDA02', date: '25.08.2024', report: 'Urinalysis' },
      ]}
    />
    <PatientItem
      name="Patient Name 2"
      opCode="Op Code 2"
      ipCode="IP Code 2"
      labReports={[
        { labId: '24mDA03', date: '26.08.2024', report: 'X-Ray' },
        { labId: '24mDA04', date: '27.08.2024', report: 'MRI' },
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
  labReportItem: {
    marginBottom: 20,
  },
});

export default LabReportsScreen;
