import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HospitalContact = () => {
  const hospital = {
    name: "PSG Hospital",
    contactNumber: "+919952149911",
    email: "feedback@psgimsr.ac.in",
    website: "https://www.psghospitals.com/contact-us/",
  };

  const handlePhoneCall = () => {
    try {
      // Corrected the syntax for initiating a phone call
      Linking.openURL(`tel:${hospital.contactNumber}`);
    } catch (error) {
      console.error("Error while making a phone call: ", error);
    }
  };

  const handleEmail = () => {
    try {
      // Corrected the syntax for opening an email client
      Linking.openURL(`mailto:${hospital.email}`);
    } catch (error) {
      console.error("Error while sending an email: ", error);
    }
  };

  const handleWebsite = () => {
    try {
      Linking.openURL(hospital.website);
    } catch (error) {
      console.error("Error while opening the website: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.text}>
        Peelamedu, Coimbatore - 641004, TamilNadu, INDIA.
      </Text>
      <Text style={styles.label}>Contact Number:</Text>
      <TouchableOpacity onPress={handlePhoneCall}>
        <Text style={[styles.text, styles.link]}>{hospital.contactNumber}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Email:</Text>
      <TouchableOpacity onPress={handleEmail}>
        <Text style={[styles.text, styles.link]}>{hospital.email}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Website:</Text>
      <TouchableOpacity onPress={handleWebsite}>
        <Text style={[styles.text, styles.link]}>{hospital.website}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default HospitalContact;
