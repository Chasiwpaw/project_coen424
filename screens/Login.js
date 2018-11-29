import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';
import { authLogin } from '../api/index';
import Pusher from 'pusher-js/react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.pusher = null;
  }

  componentDidMount() {
    Pusher.logToConsole = true;
  }

  handleLoginNav = (username, password) => {
    authLogin(username, password, this.props.navigation, this.pusher);
  }

  handleRegisterNav = () => {
    this.props.navigation.navigate('RegisterScreen');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/images/burger.png')}
            />

          <Text style={styles.title}>Your Local Food Recommender</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm
            onLoginPress={this.handleLoginNav}
            onRegisterPress={this.handleRegisterNav}
            />
        </View>
      </KeyboardAvoidingView> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#00000000'
  },
  title: {
    color: '#FFF',
    marginTop: 1,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  }
});