import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      headerBackTitle: '',
      headerShown: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: '100%', height: 300 }}
          source={require('./assets/images/Home.png')}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Hello!</Text>
        <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center', marginHorizontal: 20 }}>
          Welcome to PSG Hospital. If you are a new user, please Signup.
        </Text>

        <View style={{ flexDirection: 'row', margin: 20, paddingVertical: 20 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={{ backgroundColor: '#0d47a1', padding: 10, width: 150, borderRadius: 30, marginHorizontal: 2 }}
          >
            <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 18 }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}
            style={{
              backgroundColor: '#FFF',
              padding: 10,
              width: 150,
              borderRadius: 30,
              marginHorizontal: 2,
              borderWidth: 1,
              borderColor: '#0d47a1',
            }}
          >
            <Text style={{ textAlign: 'center', color: '#0d47a1', fontSize: 18 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 16, marginTop: 10 }}>Visit our social media</Text>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.facebook.com/PSGHospitalsCoimbatore/')}
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: '#3f51b5',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'blue' }}>f</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.instagram.com/psghospitals/')}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: '#fbad50',
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="logo-instagram" size={30} color="#fccc63" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.psghospitals.com/')}
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: '#1565c0',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>G</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
