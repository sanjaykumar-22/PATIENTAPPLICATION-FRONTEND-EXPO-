import { StyleSheet } from 'react-native';

const Logstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: '80%',
    height: '50%',
    marginTop: -200,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    height: 30,
    width: 270,
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom:-90
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Logstyles;
