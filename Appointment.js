import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSection, setSelectedSection] = useState('Book');
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {}; // Receive id from route.params or default to an empty object

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const dateStringToday = today.toISOString().split('T')[0];
  const dateStringMax = maxDate.toISOString().split('T')[0];

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleManualDateSelect = () => {
    navigation.navigate('Department', { selectedDate, id, upcomingPageId: id }); // Pass selectedDate and id to Department screen
  };

  const handleUpcomingPress = () => {
    navigation.navigate('Upcoming', { id }); // Pass id to UpcomingAppointmentsPage
  };

  const handleHistoryPress = () => {
    navigation.navigate('History', { id }); // Pass id to HistoryAppointmentsPage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appointment Page</Text>

      <View style={styles.toggleButtons}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedSection === 'Book' && styles.selectedButton]}
          onPress={() => setSelectedSection('Book')}>
          <Text>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedSection === 'upcoming' && styles.selectedButton]}
          onPress={handleUpcomingPress}>
          <Text>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, selectedSection === 'history' && styles.selectedButton]}
          onPress={handleHistoryPress}>
          <Text>History</Text>
        </TouchableOpacity>
      </View>

      {selectedSection === 'Book' && (
        <Calendar
          current={dateStringToday}
          minDate={dateStringToday}
          maxDate={dateStringMax}
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' },
          }}
        />
      )}

      {selectedDate && (
        <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
      )}

      <Button title="Select Date" onPress={handleManualDateSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: 'lightblue',
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default AppointmentPage;
