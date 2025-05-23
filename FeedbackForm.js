import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    mobile: "",
    visitDate: "",
    opNo: "",
    ipNo: "",
    hospitalAmbienceDirection: "",
    hospitalAmbienceCleanliness: "",
    outpatientServicesAppointment: "",
    outpatientServicesRegistration: "",
    outpatientServicesPROGuidance: "",
    outpatientServicesDiagnosisTreatment: "",
    outpatientServicesNursingCare: "",
    outpatientServicesOPBilling: "",
    outpatientServicesOPDServices: "",
    outpatientServicesLaboratory: "",
    outpatientServicesRadiology: "",
    outpatientServicesParamedical: "",
    outpatientServicesPharmacy: "",
    outpatientServicesPhysiotherapy: "",
    outpatientServicesSupportiveServices: "",
    inpatientServicesAdmission: "",
    inpatientServicesAmenities: "",
    inpatientServicesSpace: "",
    inpatientServicesPrivacy: "",
    roomServiceDietary: "",
    roomServiceHouseKeeping: "",
    otherServicesIPBilling: "",
    otherServicesInsurance: "",
    feedbackComments: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleInputChange = (name, value) => {
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const setRating = (field, rating) => {
    setFeedback({
      ...feedback,
      [field]: rating,
    });
  };

  const EmojiRating = ({ field }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity onPress={() => setRating(field, "Excellent")}>
        <Text>😃Excellent</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(field, "Good")}>
        <Text>😊Good</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(field, "Average")}>
        <Text>😐Average</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(field, "Poor")}>
        <Text>😞Poor</Text>
      </TouchableOpacity>
    </View>
  );
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    handleInputChange("visitDate", date.toISOString()); // You can format the date string as per your requirement
  };
  const handleSubmit = () => {
    // Handle form submission
    console.log(feedback);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>Feedback Form</Text>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={feedback.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={feedback.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <Text style={styles.inputLabel}>Mobile No:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          value={feedback.mobile}
          onChangeText={(value) => handleInputChange("mobile", value)}
        />
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={showDatePicker}
        >
          <Text style={styles.inputLabel}>Visit Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            editable={false}
            value={
              feedback.visitDate
                ? new Date(feedback.visitDate).toLocaleDateString()
                : ""
            }
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={styles.inputLabel}>Op No:</Text>
        <TextInput
          style={styles.input}
          placeholder="OP No"
          value={feedback.opNo}
          onChangeText={(value) => handleInputChange("opNo", value)}
        />
        <Text style={styles.inputLabel}>Ip No:</Text>
        <TextInput
          style={styles.input}
          placeholder="IP No"
          value={feedback.ipNo}
          onChangeText={(value) => handleInputChange("ipNo", value)}
        />
        <Text style={styles.subHeading}>Hospital Ambience</Text>
        <Text style={styles.subSubHeading}>
          1. Direction boards / floor guidance
        </Text>
        <EmojiRating field="hospitalAmbienceDirection" />
        <Text style={styles.subSubHeading}>2.Cleanliness</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />

        <Text style={styles.subHeading}>outpatientServices</Text>
        <Text style={styles.subSubHeading}>1.Appointment</Text>
        <EmojiRating field="hospitalAmbienceDirection" />
        <Text style={styles.subSubHeading}>2.Registration</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>3.PRO guidance</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>4.Diagnosis & Treatment</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>5.Nursing Care</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>6.OP Billing</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>7.OPD services</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>
          8.Laboratory & Blood sample collection
        </Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>
          {" "}
          9.Radiology ( X-Ray/USG/CT/MRI/Mammo)
        </Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>
          10.Paramedical services (ECG/ECHO/TMT/PFT)
        </Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>11.Pharmacy</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>12.Physiotherapy</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>
          {" "}
          13.Supportive Services (Security, Service assistants, Housekeeping)
        </Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subHeading}>Inpatient Services</Text>
        <Text style={styles.subSubHeading}>1.Admission procedure</Text>
        <EmojiRating field="hospitalAmbienceDirection" />
        <Text style={styles.subSubHeading}> 2.Amenities & facilities</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>3.Space</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subSubHeading}>4.Privacy</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />
        <Text style={styles.subHeading}>Room service</Text>
        <Text style={styles.subSubHeading}>1.Dietary</Text>
        <EmojiRating field="hospitalAmbienceDirection" />
        <Text style={styles.subSubHeading}> 2.House Keeping</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />

        <Text style={styles.subHeading}>Other Services</Text>
        <Text style={styles.subSubHeading}>1. IP Billing</Text>
        <EmojiRating field="hospitalAmbienceDirection" />
        <Text style={styles.subSubHeading}>2. Insurance</Text>
        <EmojiRating field="hospitalAmbienceCleanliness" />

        {/* Repeat similar sections for other services */}
        <Text style={styles.subHeading}>Feedback</Text>
        <Text style={styles.subSubHeading}>
          Please mention your valuable feedback for any improvisation or
          appreciation on our services or department service or individual care.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Feedback Comments"
          value={feedback.feedbackComments}
          onChangeText={(value) => handleInputChange("feedbackComments", value)}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },

  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subSubHeading: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FeedbackForm;
