import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./verificationstyle";

const VerificationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [resendPressed, setResendPressed] = useState(false);
  const otpInputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (resendCountdown > 0 && resendDisabled) {
      timer = setInterval(() => {
        setResendCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [resendCountdown, resendDisabled]);

  const handleResendCode = async () => {
    setResendDisabled(true);
    setResendPressed(true);
    setTimeout(() => {
      setResendDisabled(false);
      setResendCountdown(60);
      setResendPressed(false);
    }, 3000);
  };

  const handleVerify = async () => {
    if (/^\d{6}$/.test(otp)) {
      try {
        setIsLoading(true);

        const response = await axios.post(
          "http://192.168.90.203:3000/verify-otp",
          {
            phoneNumber: phoneNumber.replace("+91", ""), // Remove the '+91' prefix
            otp: otp,
          }
        );

        if (response.data.success) {
          // Navigate to Dashboard screen with phoneNumber as parameter
          navigation.navigate("Dashboard", {
            phoneNumber: phoneNumber.replace("+91", ""),
          });
        } else {
          alert("OTP verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("Failed to verify OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid 6-digit OTP.");
      setOtp("");
      otpInputRef.current.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={require("./assets/images/Home.png")}
        resizeMode="contain"
        style={styles.verificationImage}
      />

      <Text style={styles.title}>Verify your Phone number</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to {phoneNumber}.{" "}
        {!resendDisabled ? (
          <Text
            style={[styles.resendText, resendPressed && { color: "red" }]}
            onPress={handleResendCode}
          >
            Resend Code
          </Text>
        ) : (
          <Text>Resend in {resendCountdown} seconds</Text>
        )}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          ref={otpInputRef}
          style={[styles.input, isLoading && styles.disabledInput]}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={6}
          onChangeText={(text) => setOtp(text)}
          editable={!isLoading}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerificationScreen;
