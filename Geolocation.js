import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const MapComponent = () => {
  const navigation = useNavigation();

  const handleReschedule = () => {
    Alert.alert("Reschedule Appointment", "Please select a new date for your appointment.", [
      { text: 'OK', onPress: () => navigation.navigate('Dashboard') }, 
    ]);
  };

  const handleCancellation = () => {
    Alert.alert("Appointment Cancelled", "Your appointment has been cancelled.", [
      { text: 'OK', onPress: () => navigation.navigate('Dashboard') },  
    ]);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: 11.018342,
        longitude: 77.007297,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Reschedule" onPress={handleReschedule} color="lightgreen" />
        </View>
        <View style={styles.button}>
          <Button title="Cancel" onPress={handleCancellation} color="#F44336" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    top: 100,
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 4,
  }
});

export default MapComponent;
