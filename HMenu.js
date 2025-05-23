import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HMenu = () => {
  const navigation = useNavigation();

  const navigateToDashboard = () => {
    // Navigate to dashboard
    navigation.navigate("Dashboard");
  };

  const navigateToPatientList = () => {
    // Navigate to patient list screen
    navigation.navigate("PatientList");
  };

  const navigateToUpcoming = () => {
    // Navigate to upcoming appointments screen
    navigation.navigate("Upcoming");
  };

  const navigateToAbout = () => {
    // Navigate to the screen you want
    navigation.navigate("About");
  };
  const navigateToHealthpackage = () => {
    // Navigate to the screen you want
    navigation.navigate("Healthpackage");
  };
  const navigateToService = () => {
    // Navigate to the screen you want
    navigation.navigate("Service");
  };
  const navigateToQualitypolicy = () => {
    // Navigate to the screen you want
    navigation.navigate("Qualitypolicy");
  };
  const navigateToApppermission = () => {
    // Navigate to the screen you want
    navigation.navigate("Apppermission");
  };

  return (
    <View style={styles.hmenu}>
      <Pressable style={styles.menuItem} onPress={navigateToDashboard}>
        <Image style={styles.menuIcon} source={require("./assets/home.png")} />
        <Text style={styles.menuText}>Home</Text>
      </Pressable>

      <Pressable style={styles.menuItem} onPress={navigateToPatientList}>
        <Image
          style={styles.menuIcon}
          source={require("./assets/register.png")}
        />
        <Text style={styles.menuText}>Register</Text>
      </Pressable>

      <Pressable style={styles.menuItem} onPress={navigateToUpcoming}>
        <Image
          style={styles.menuIcon}
          source={require("./assets/appointment.png")}
        />
        <Text style={styles.menuText}>Appointment</Text>
      </Pressable>

      <Pressable style={styles.menuItem} onPress={navigateToAbout}>
        <Image
          style={styles.menuIcon}
          source={require("./assets/image.png")} // Replace with your image
        />
        <Text style={styles.menuText}>About Us</Text>
      </Pressable>
      <Pressable style={styles.menuItem} onPress={navigateToHealthpackage}>
        <Image
          style={styles.menuIcon}
          source={require("./assets/hp.png")} // Replace with your image
        />
        <Text style={styles.menuText}>Health Package</Text>
      </Pressable>
      <Pressable style={styles.menuItem} onPress={navigateToService}>
        <Image
          style={styles.menuIcon}
          source={require("./assets/ser.png")} // Replace with your image
        />
        <Text style={styles.menuText}>Service</Text>
      </Pressable>
      <Pressable style={styles.menuItem} onPress={navigateToQualitypolicy}>
        <Image
          style={styles.menuIcon}
          source={require("./assets/image-41.png")} // Replace with your image
        />
        <Text style={styles.menuText}>Quality Policy</Text>
      </Pressable>
      <Pressable style={styles.menuItem} onPress={navigateToApppermission}>
        <Image
          style={styles.menuIcon}
          source={require("./assets/image-42.png")} // Replace with your image
        />
        <Text style={styles.menuText}>App Permission</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  hmenu: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start", // Align items to the start of the container horizontally
    justifyContent: "flex-start", // Align items to the start of the container vertically
    marginTop: 10, // Add margin from the top
    marginLeft: 10, // Add margin from the left
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Add margin between menu items
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 10, // Add padding to the right side of each text content
  },
});

export default HMenu;
