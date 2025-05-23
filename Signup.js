import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Signup = () => {
  const navigation = useNavigation();

  const [forms, setForms] = useState({
    name: "",
    dob: new Date(),
    gender: "",
    religion: "",
    marriedStatus: "",
    aadhaar: "",
    state: "",
    occupation: "",
    currentAddress: "",
    homeAddress: "",
    city: "",
    phoneNumber: "",
    countryCode: "+91",
    bloodGroup: "",
    visitedBefore: "",
    opNumber: "",
    showDatePicker: false,
    age: "",
  });

  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const [cityPopulation, setCityPopulation] = useState({
    Coimbatore: 1600000,
    Thoothukudi: 240000,
  });

  const setField = (field, value) => {
    setForms((prevForms) => ({ ...prevForms, [field]: value }));

    if (field === "dob" && value instanceof Date) {
      const age = calculateAge(value);
      setForms((prevForms) => ({ ...prevForms, age }));
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age.toString();
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "dob",
      "age",
      "gender",
      "religion",
      "marriedStatus",
      "aadhaar",
      "state",
      "occupation",
      "currentAddress",
      "homeAddress",
      "city",
      "phoneNumber",
      "bloodGroup",
    ];

    for (const field of requiredFields) {
      if (!forms[field]) {
        setError(`Field '${field}' is missing.`);
        return false;
      }
    }

    if (forms.phoneNumber.length !== 10) {
      setError("Phone number must be 10 digits.");
      return false;
    }

    if (forms.aadhaar.length !== 12) {
      setError("Aadhaar number must be 12 digits.");
      return false;
    }

    setError("");
    return true;
  };

  const handleDatePickerChange = (event, selectedDate) => {
    setForms((prevForms) => ({
      ...prevForms,
      dob: selectedDate || prevForms.dob,
      showDatePicker: false,
    }));

    if (selectedDate) {
      const age = calculateAge(selectedDate);
      setForms((prevForms) => ({ ...prevForms, age }));
    }
  };

  const showDatePicker = () => {
    setForms((prevForms) => ({ ...prevForms, showDatePicker: true }));
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const formattedDate = moment(forms.dob).format("YYYY-MM-DD");
        const response = await axios.post(
          "http://192.168.90.203:3000/REGISTER",
          { ...forms, dob: formattedDate },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          navigation.navigate("Login");
        } else {
          console.error("Server Error:", response.data.error);
          setError(response.data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
        setError("Network Error: Unable to connect to the server.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.background}>
          <Text style={styles.header}>SIGNUP FORM</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Name"
              value={forms.name}
              onChangeText={(value) =>
                setForms((prevForms) => ({ ...prevForms, name: value }))
              }
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.datePickerContainer}>
              <TouchableOpacity
                onPress={() =>
                  setForms((prevForms) => ({
                    ...prevForms,
                    showDatePicker: true,
                  }))
                }
              >
                {forms.showDatePicker && (
                  <DateTimePicker
                    value={forms.dob}
                    mode="date"
                    display="spinner"
                    onChange={handleDatePickerChange}
                  />
                )}
                <Text style={styles.buttonText}>Pick a date</Text>
              </TouchableOpacity>

              <Text style={styles.ageText}>Age: {forms.age}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Gender</Text>
            <Picker
              selectedValue={forms.gender}
              onValueChange={(value) =>
                setForms((prevForms) => ({ ...prevForms, gender: value }))
              }
              style={styles.input}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <Text style={styles.label}>Religion</Text>
          <Picker
            selectedValue={forms.religion}
            onValueChange={(value) => setField("religion", value)}
            style={styles.input}
          >
            <Picker.Item label="Select Religion" value="" />
            <Picker.Item label="Christianity" value="Christianity" />
            <Picker.Item label="Islam" value="Islam" />
            <Picker.Item label="Hinduism" value="Hinduism" />
            <Picker.Item label="Buddhism" value="Buddhism" />
            <Picker.Item label="Judaism" value="Judaism" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Married Status</Text>
            <Picker
              selectedValue={forms.marriedStatus}
              onValueChange={(value) =>
                setForms((prevForms) => ({
                  ...prevForms,
                  marriedStatus: value,
                }))
              }
              style={styles.input}
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="Married" value="Married" />
              <Picker.Item label="Single" value="Single" />
            </Picker>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>State</Text>
            <Picker
              selectedValue={forms.state}
              onValueChange={(value) =>
                setForms((prevForms) => ({ ...prevForms, state: value }))
              }
              style={styles.input}
            >
              <Picker.Item label="Select State" value="" />
              <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
              <Picker.Item
                label="Arunachal Pradesh"
                value="Arunachal Pradesh"
              />
              <Picker.Item label="Assam" value="Assam" />
              <Picker.Item label="Bihar" value="Bihar" />
              <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
              <Picker.Item label="Goa" value="Goa" />
              <Picker.Item label="Gujarat" value="Gujarat" />
              <Picker.Item label="Haryana" value="Haryana" />
              <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
              <Picker.Item label="Jharkhand" value="Jharkhand" />
              <Picker.Item label="Karnataka" value="Karnataka" />
              <Picker.Item label="Kerala" value="Kerala" />
              <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
              <Picker.Item label="Maharashtra" value="Maharashtra" />
              <Picker.Item label="Manipur" value="Manipur" />
              <Picker.Item label="Meghalaya" value="Meghalaya" />
              <Picker.Item label="Mizoram" value="Mizoram" />
              <Picker.Item label="Nagaland" value="Nagaland" />
              <Picker.Item label="Odisha" value="Odisha" />
              <Picker.Item label="Punjab" value="Punjab" />
              <Picker.Item label="Rajasthan" value="Rajasthan" />
              <Picker.Item label="Sikkim" value="Sikkim" />
              <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
              <Picker.Item label="Telangana" value="Telangana" />
              <Picker.Item label="Tripura" value="Tripura" />
              <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
              <Picker.Item label="Uttarakhand" value="Uttarakhand" />
              <Picker.Item label="West Bengal" value="West Bengal" />
              {/* Add other Indian states here */}
            </Picker>
          </View>

          <TextInput
            placeholder="Aadhaar Number"
            value={forms.aadhaar}
            onChangeText={(value) =>
              setForms((prevForms) => ({ ...prevForms, aadhaar: value }))
            }
            keyboardType="numeric"
            style={styles.input}
            maxLength={12}
          />

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Door Number</Text>
            <TextInput
              placeholder="Door Number"
              value={forms.doorNo}
              onChangeText={(value) =>
                setForms((prevForms) => ({ ...prevForms, doorNo: value }))
              }
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Occupation</Text>
            <TextInput
              placeholder="Occupation"
              value={forms.occupation}
              onChangeText={(value) =>
                setForms((prevForms) => ({ ...prevForms, occupation: value }))
              }
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Current Address</Text>
            <TextInput
              placeholder="Current Address"
              value={forms.currentAddress}
              onChangeText={(value) =>
                setForms((prevForms) => ({
                  ...prevForms,
                  currentAddress: value,
                }))
              }
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Permanent Address</Text>
            <TextInput
              placeholder="Permanent Address"
              value={forms.homeAddress}
              onChangeText={(value) =>
                setForms((prevForms) => ({ ...prevForms, homeAddress: value }))
              }
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>City</Text>
            <Picker
              selectedValue={forms.city}
              onValueChange={(value) =>
                setForms((prevForms) => ({ ...prevForms, city: value }))
              }
              style={styles.input}
            >
              <Picker.Item label="Select City" value="" />
              <Picker.Item label="Chennai" value="Chennai" />
              <Picker.Item label="Coimbatore" value="Coimbatore" />
              <Picker.Item label="Madurai" value="Madurai" />
              <Picker.Item label="Tiruchirappalli" value="Tiruchirappalli" />
              <Picker.Item label="Salem" value="Salem" />
              <Picker.Item label="Ambattur" value="Ambattur" />
              <Picker.Item label="Tirunelveli" value="Tirunelveli" />
              <Picker.Item label="Tiruppur" value="Tiruppur" />
              <Picker.Item label="Avadi" value="Avadi" />
              <Picker.Item label="Tiruvottiyur" value="Tiruvottiyur" />
              <Picker.Item label="Thoothukudi" value="Thoothukudi" />
              <Picker.Item label="	Nagercoil" value="	Nagercoil" />
              <Picker.Item label="Thanjavur" value="Thanjavur" />
              <Picker.Item label="	Pallavaram" value="	Pallavaram" />
              <Picker.Item label="Dindigul" value="Dindigul" />
              <Picker.Item label="	Vellore" value="	Vellore" />
              <Picker.Item label="Tambaram" value="Tambaram" />
              <Picker.Item label="Cuddalore" value="Cuddalore" />
              <Picker.Item label="Kancheepuram" value="Kancheepuram" />
              <Picker.Item label="Alandur" value="Alandur" />
              <Picker.Item label="Erode" value="Erode" />
              <Picker.Item label="Tiruvannamalai" value="Tiruvannamalai" />
              <Picker.Item label="Kumbakonam" value="Kumbakonam" />
              <Picker.Item label="	Rajapalayam" value="	Rajapalayam" />
              <Picker.Item label="Kurichi" value="Kurichi" />
              <Picker.Item label="Madavaram" value="Madavaram" />
              <Picker.Item label="Pudukkottai" value="Pudukkottai" />
              <Picker.Item label="Hosur" value="Hosur" />
              <Picker.Item label="	Karaikkudi" value="	Karaikkudi" />
              <Picker.Item label="Ambur" value="Ambur" />
              <Picker.Item label="	Neyveli" value="	Neyveli" />
              <Picker.Item label="Nagapattinam" value="Nagapattinam" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              placeholder="Pincode"
              value={forms.pincode}
              onChangeText={(value) =>
                setForms((prevForms) => ({ ...prevForms, pincode: value }))
              }
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Country Code + Phone Number"
              value={`${forms.countryCode} ${forms.phoneNumber}`}
              onChangeText={(value) => {
                const [countryCode, phoneNumber] = value.split(" ");
                setForms((prevForms) => ({
                  ...prevForms,
                  countryCode,
                  phoneNumber,
                }));
              }}
              keyboardType="phone-pad"
              style={styles.input}
              maxLength={14} // Country code (3) + Space (1) + Phone number (10)
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Blood Group</Text>
            <Picker
              selectedValue={forms.bloodGroup}
              onValueChange={(value) =>
                setForms((prevForms) => ({ ...prevForms, bloodGroup: value }))
              }
              style={styles.input}
            >
              <Picker.Item label="Select Blood Group" value="" />
              <Picker.Item label="o+" value="o+" />
              <Picker.Item label="o-" value="o-" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
            </Picker>
          </View>

          {error !== "" && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  background: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  buttonText: {
    color: "#007BFF",
    marginTop: 30,
    bottom: 55,
    right: -110,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 60,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 110,
    top: -26,
  },
  buttonText: {
    color: "#007BFF",
    marginRight: 0, // Adjust this value as needed
  },
  ageText: {
    marginLeft: 25,
    top: -1, // Pushes the age text to the right
    fontWeight: "bold",
  },
});

export default Signup;
