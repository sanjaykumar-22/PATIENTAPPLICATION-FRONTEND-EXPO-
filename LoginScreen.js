import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./LogStyles";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = async () => {
    try {
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

      if (cleanedPhoneNumber.length === 10) {
        const formattedPhoneNumber = `+91${cleanedPhoneNumber}`;

        // Check if the phone number exists in the database
        const response = await axios.post(
          "http://192.168.90.203:3000/check-phone-number",
          {
            phoneNumber: formattedPhoneNumber,
          }
        );

        // Log the response to see what data is received
        console.log(response.data);

        if (response.data.exists) {
          // Phone number exists, proceed to OTP verification
          const otpResponse = await axios.post(
            "http://192.168.90.203:3000/send-otp",
            {
              to: formattedPhoneNumber,
            }
          );

          if (otpResponse.data.success) {
            navigation.navigate("VerificationScreen", {
              phoneNumber: formattedPhoneNumber,
            });
          } else {
            alert("Failed to send OTP. Please try again.");
          }
        } else {
          // Phone number exists but the response indicates otherwise
          console.log("Phone number exists:", response.data.exists);
          alert("Phone Number does not exist please go to up sigup.");
        }
      } else {
        alert("Please enter a valid 10-digit phone number.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={require("./assets/images/Home.png")}
        resizeMode="contain"
        style={styles.Image}
      />

      <Text style={styles.title}>Enter your Phone number</Text>
      <Text style={styles.subtitle}>We will send you a verification code</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Phone Number"
          keyboardType="phone-pad"
          onChangeText={(text) => {
            if (text.length <= 10) {
              setPhoneNumber(text);
            }
          }}
          maxLength={10}
          value={phoneNumber}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
