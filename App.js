import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import Signup from "./Signup";
import VerificationScreen from "./VerificationScreen";
import Dashboard from "./Dashboard";
import HMenu from "./HMenu";
import Medicalrecords from "./Medicalrecords";
import Report from "./Report";
import LabReports from "./lab";
import RadiologyReports from "./Radiology";
import Lapip from "./Labip";
import Radiologyip from "./Radiologyip";
import About from "./About";
import Appointment from "./Appointment";
import PatientList from "./PatientList";
import CareType from "./CareType";
import upcoming from "./Upcoming";
import History from "./History";
import Department from "./Department";
import Doctor from "./Doctor";
import Emergency from "./Emergency";
import BookAmbulance from "./BookAmbulence";
import EmergencyConatctScreen from "./EmergencyContactScreen";
import HomeCare from "./HomeCare";
import DoctorConfirmation from "./DoctorConfirmation";
import Geolocation from "./Geolocation";
import SelectDoctor from "./SelectDoctor";
import IpReport from "./IpReport";
import Ipchoose from "./Ipchoose";
import FeedbackForm from "./FeedbackForm";
import UserProfile from "./UserProfile";
import HomeDoctor from "./HomeDoctor";
import Message from "./Message";


const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationContainer>

          <Stack.Navigator>
            
          {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
          {/* <Stack.Screen name="HomeCare" component={HomeCare} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Message" component={Message} />


          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="BookAmbulance" component={BookAmbulance} />
          <Stack.Screen name="SelectDoctor" component={SelectDoctor} />
          <Stack.Screen name="HomeDoctor" component={HomeDoctor} />
          <Stack.Screen name="HomeCare" component={HomeCare} />
          <Stack.Screen name="Medicalrecords" component={Medicalrecords} />


          
        

          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}

          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="UserProfile" component={UserProfile} />



          {/* <Stack.Screen name="Medicalrecords" component={Medicalrecords} /> */}
          <Stack.Screen name="Department" component={Department} />

          <Stack.Screen name="PatientList" component={PatientList} />
          {/* <Stack.Screen name="Department" component={Department} /> */}

          <Stack.Screen name="Doctor" component={Doctor} />

          {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
          <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="FeedbackForm" component={FeedbackForm} />

            {/* <Stack.Screen name="Medicalrecords" component={Medicalrecords} /> */}
            <Stack.Screen name="HMenu" component={HMenu} />
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

            {/* <Stack.Screen name="Department" component={Department} /> */}

            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
            {/* <Stack.Screen name="Signup" component={Signup} /> */}
            <Stack.Screen name="VerificationScreen" component={VerificationScreen}/>

            {/* <Stack.Screen name="PatientList" component={PatientList} /> */}
            {/* <Stack.Screen name="SelectDoctor" component={SelectDoctor} /> */}
            <Stack.Screen name="Appointment" component={Appointment} />
            {/* <Stack.Screen name="Department" component={Department} /> */}
            {/* <Stack.Screen name="Doctor" component={Doctor} /> */}
            <Stack.Screen name="CareType" component={CareType} />
            <Stack.Screen name="Upcoming" component={upcoming} />
            <Stack.Screen name="History" component={History} />

            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="lab" component={LabReports} />
            <Stack.Screen name="Radiology" component={RadiologyReports} />
            <Stack.Screen name="IpReport" component={IpReport} />
            <Stack.Screen name="Ipchoose" component={Ipchoose} />
            <Stack.Screen name="Labip" component={Lapip} />
            <Stack.Screen name="Radiologyip" component={Radiologyip} />

            <Stack.Screen name="About" component={About} />
            {/* <Stack.Screen name="BookAmbulance" component={BookAmbulance} /> */}

            <Stack.Screen
              name="DoctorConfirmation"
              component={DoctorConfirmation}
            />
            {/* <Stack.Screen name="HomeCare" component={HomeCare} /> */}
            {/* <Stack.Screen name="Emergency" component={Emergency} /> */}

            <Stack.Screen name="Emergency" component={Emergency} />
            {/* <Stack.Screen name="BookAmbulance" component={BookAmbulance} />  */}
            <Stack.Screen
              name="EmergencyContactScreen"
              component={EmergencyConatctScreen}
            />
            <Stack.Screen name="Geolocation" component={Geolocation} />


          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
