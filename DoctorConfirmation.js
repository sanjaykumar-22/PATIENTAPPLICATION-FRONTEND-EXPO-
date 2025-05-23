import React, { useState } from 'react';
import { TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const TaskTimelineApp = () => {
  const [pendingProgress, setPendingProgress] = useState(0);
  const [approvedProgress, setApprovedProgress] = useState(0);
  const [completedProgress, setCompletedProgress] = useState(0);

  const getStatus = () => {
    if (completedProgress > 0) {
      return 'Overall Status: Completed';
    } else if (approvedProgress > 0) {
      return 'Overall Status: Approved';
    } else if (pendingProgress > 0) {
      return 'Overall Status: Wait for Approve';
    } else {
      return 'Overall Status: Not Started';
    }
  };

  const moveToApproved = () => {
    setPendingProgress(100);
    setApprovedProgress(50);
    setCompletedProgress(0);
  };

  const moveToCompleted = () => {
    setPendingProgress(100);
    setApprovedProgress(100);
    setCompletedProgress(50);
  };

  const resetProgress = () => {
    setPendingProgress(0);
    setApprovedProgress(0);
    setCompletedProgress(0);
  };

  const navigation = useNavigation(); // Initialize the navigation hook

  const handleViewLocation = () => {
    // Handle View Location logic here
    console.log('View Location pressed');
    // Navigate to the 'ViewLocation' screen
    navigation.navigate('Geolocation');
  };

  const handleReschedule = () => {
    console.log('Reschedule pressed');
    navigation.navigate('HomeCare');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#3498db" barStyle="light-content" />
      <Text style={styles.overallStatus}>{getStatus()}</Text>
      <View style={styles.timelineContainer}>
        <TouchableOpacity onPress={moveToApproved} style={styles.dotContainer}>
          <View style={[styles.circle, { opacity: pendingProgress > 0 ? 1 : 0 }]} />
          <Text style={styles.label}>Wait for Approve</Text>
          <Text style={styles.status}>{getStatus()}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={moveToCompleted} style={styles.dotContainer}>
          <View style={[styles.circle, { opacity: approvedProgress > 0 ? 1 : 0 }]} />
          <Text style={styles.label}>Complete</Text>
          <Text style={styles.status}>{getStatus()}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={resetProgress} style={styles.dotContainer}>
          <View style={[styles.circle, { opacity: completedProgress > 0 ? 1 : 0 }]} />
          <Text style={styles.label}>Reschedule</Text>
          <Text style={styles.status}>{getStatus()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View Location"
          onPress={handleViewLocation}
          color="#FF0000" // Red color
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Reschedule"
          onPress={handleReschedule}
          color="#FF0000" // Red color
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overallStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
  },
  timelineContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dotContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3498db',
    marginBottom: 8,
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: '#bdc3c7',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  status: {
    fontSize: 12,
    color: '#2ecc71', // Green color for status
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default TaskTimelineApp;
