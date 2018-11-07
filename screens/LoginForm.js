import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, AsyncStorage } from 'react-native';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username:'',
    password:''
  }

  handleLogin = () => {
    const { username, password } = this.state;
    return this.props.onLoginPress(username, password);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          />

        <TextInput
          value={this.state.username}
          onChangeText={username => this.setState({username})}
          placeholder="Username/Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          returnKeyType="go"
          ref={(input) => this.passwordInput = input}
          style={styles.input}
          />
        <View style={styles.flexgroup}>
          <TouchableOpacity onPress={this.handleLogin} style={styles.buttonContainer}>
            <Text> LOGIN </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ this.props.onRegisterPress } style={styles.buttonContainer}>
            <Text> REGISTER </Text>
          </TouchableOpacity>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#d35400',
    paddingVertical: 15,
    flexGrow: 1,
    margin: 1,
    alignItems: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  flexgroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});