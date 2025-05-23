import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute hook
import 'react-native-gesture-handler';

const Dashboard = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute hook to access route object
  const phoneNumber = route.params?.phoneNumber; 

  const handleMenuPress = () => {
    navigation.navigate('HMenu');
  };

  const handleMedicalrecordPress = () => {
    navigation.navigate('Medicalrecords', { phoneNumber: phoneNumber });
  };

  const handleAppointmentPress = () => {
    navigation.navigate('PatientList', { phoneNumber: phoneNumber });
  };

  const handleaAmbulancePress = () => {
    navigation.navigate('Emergency', { phoneNumber: phoneNumber });
  };

  const handleHomeCarePress = () => {
    navigation.navigate('SelectDoctor',{ phoneNumber: phoneNumber });
  };

  const handleConatctPress = () => {
    navigation.navigate('About');
  };  

  const handelalarmIconPress = () => {
    navigation.navigate('Message', { phoneNumber: phoneNumber });
  };
  
  const handlefeedbackPress = () => {
    navigation.navigate('FeedbackForm');
  };



  // const handleProfilePress = () => {
  //   navigation.navigate('UserProfile', { phoneNumber: phoneNumber });
  // };

  return (
    <View style={styles.dashboard}>
      <Image
        style={styles.dashimageIcon}
        resizeMode="cover"
        source={require('./assets/dashboardimage.png')}
      />
      <Text style={[styles.ambulanceBooking, styles.feedbackTypo]}>Ambulance Booking</Text>
      <Text style={[styles.bookAppointment, styles.feedbackTypo]}>Book Appointment</Text>
      <Text style={[styles.notification, styles.contactUsTypo]}>Notification</Text>
     
      <TouchableOpacity style={styles.contactUs} onPress={handleConatctPress}>
      <Image
        style={styles.contactUsIcon}
        resizeMode="cover"
        source={require('./assets/contactus-icon.png')}
      />
      </TouchableOpacity>
    
      <Text style={[styles.contactUs, styles.contactUsTypo]}>Contact Us</Text>
    
      <TouchableOpacity style={styles.mrIcon} onPress={handleMedicalrecordPress}>
        <Image
          style={styles.mrIconLayout}
          resizeMode="cover"
          source={require('./assets/mricon.png')}
        />
      </TouchableOpacity>
      <Text style={[styles.medicalRecord, styles.feedbackTypo]}>Medical Record</Text>
     
      <TouchableOpacity style={styles.feedbackIcon} onPress={handlefeedbackPress}>
      <Image
        style={styles.feedbackIcon}
        resizeMode="cover"
        source={require('./assets/feedbackicon.png')}
      />
            </TouchableOpacity>
      <Text style={[styles.feedback, styles.feedbackTypo]}>Feedback</Text>
     
      <TouchableOpacity style= {styles.alarmIcon} onPress={handelalarmIconPress}>
      <Image
        style={styles.alarmIcon}
        resizeMode="cover"
        source={require('./assets/alarmicon.png')}
      />
     </TouchableOpacity>

      <TouchableOpacity style= {styles.ambulanceIcon} onPress={handleaAmbulancePress}>
      <Image
        style={styles.ambulanceIcon}
        resizeMode="cover"
        source={require('./assets/ambulanceicon.png')}
      />
      </TouchableOpacity>

      <Text style={[styles.homeCare, styles.feedbackTypo]}>Home care</Text>
      
      <TouchableOpacity style={styles.healthIcon} onPress={handleHomeCarePress}>
      <Image
        style={styles.healthIcon}
        resizeMode="cover"
        source={require('./assets/healthicon.png')}
      />
      </TouchableOpacity>

      <TouchableOpacity style= {styles.bookIcon} onPress={handleAppointmentPress}>
        <Image
          style={styles.bookIcon}
          resizeMode="cover"
          source={require('./assets/bookicon.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
        <Image
          style={styles.menuIcon}
          resizeMode="cover"
          source={require('./assets/menu.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackTypo: {
    textAlign: 'left',
    fontFamily: 'System',
    position: 'absolute',
    paddingLeft: 0,
  },
  contactUsTypo: {
    width: 74,
    textAlign: 'left',
    color: 'black',
    fontFamily: 'System',
    fontSize: 12,
    position: 'absolute',
  },
  mrIconLayout: {
    top: 15,
    left: 290,
    height: 50,
    width:50
  },
  // healthIconLayout: {
  //   height: -10,
  //   width: -10,
  //   position: 'absolute',
  // },
  dashimageIcon: {
    top: 496,
    left: 0,
    borderRadius: 3,
    width: 410,
    height: 324,
    position: 'absolute',
  },
  ambulanceBooking: {
    width: 128,
    height: 23,
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'System',
    left: 4,
    top: 245,
  },
  psgHospital: {
    top: 23,
    left: 90,
    fontSize: 24,
    color: '#58a728',
    width: 158,
    height: 33,
    textAlign: 'left',
    fontFamily: 'System',
  },
  bookAppointment: {
    width: 114,
    height: 15,
    top: 136,
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'System',
    left: 4,
  },
  notification: {
    left: 160,
    height: 16,
    top: 136,
  },
  contactUsIcon: {
    top: -60,
    left: 0,
    height: 53,
    width:53 
  },
  contactUs: {
    left: 162,
    height: 15,
    top: 245,
  },
  mrIcon: {
    top: 48,
    left: 0,
    height: 65,
  },
  medicalRecord: {
    left: 275,
    width: 103,
    top: 136,
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'System',
  },
  feedbackIcon: {
    top: 97,
    left: 145,
    width: 47,
    height: 48,
    position: 'absolute',
  },
  feedback: {
    top: 249,
    left: 289,
    width: 64,
    height: 19,
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'System',
  },
  alarmIcon: {
    top: 36,
    left: 75,
    width: 90,
    height: 48,
    position: 'absolute',
  },
  ambulanceIcon: {
    top: 54,
    left: 14,
    height:50,
    width:50
  },
  homeCare: {
    top: 345,
    left: 18,
    width: 75,
    height: 15,
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'System',
  },
  healthIcon: {
    top: 82,
    left: 6,
    height:55,
    width:55
  },
  bookIcon: {
    top: 40,
    left: 10,
    height: 43,
    width: 65,
    position: 'absolute',
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    padding: 10,
  },
  menuIcon: {
    width: 43,
    height: 35,
  },
  dashboard: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    height: 1000,
    overflow: 'hidden', 
  },
});

export default Dashboard;
