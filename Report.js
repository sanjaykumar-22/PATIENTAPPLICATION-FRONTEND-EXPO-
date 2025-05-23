import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Report = ({ route }) => {
  const navigation = useNavigation();
  const { selectedId, selectedPatient } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const handleLabReportSelection = () => {
    navigation.navigate('lab', { selectedId, selectedPatient });
  };

  const handleRadiologyReportSelection = () => {
    navigation.navigate('RadiologyReport', { selectedId, selectedPatient });
  };

  const handleIpSelection = () => {
    navigation.navigate('IpReport', { selectedId, selectedPatient });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Option</Text>
      <View style={styles.horizontalLine} />

      <TouchableOpacity
        style={[styles.button, selectedOption === 'Op' && styles.selectedButton]}
        onPress={() => handleOptionSelection('Op')}
      >
        <Text style={styles.buttonText}>Op</Text>
      </TouchableOpacity>

      {selectedOption === 'Op' && (
        <>
          <TouchableOpacity
            style={styles.subButton}
            onPress={handleLabReportSelection}
          >
            <Text style={styles.buttonText}>Lab Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subButton}
            onPress={handleRadiologyReportSelection}
          >
            <Text style={styles.buttonText}>Radiology Report</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={[styles.button, selectedOption === 'Ip' && styles.selectedButton]}
        onPress={handleIpSelection}
      >
        <Text style={styles.buttonText}>Ip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  subButton: {
    paddingVertical: 15,
    width: '70%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  selectedButton: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  horizontalLine: {
    width: '80%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginVertical: 10,
  },
});

export default Report;
