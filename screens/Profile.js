import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, AsyncStorage } from 'react-native';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      password: '',
      c_password: '',
      profile: null,
    }
    this.handleRegister = this.handleRegister.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  getProfile = async() => {
    // fetch('http://35.182.248.84/api/me', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': await AsyncStorage.getItem('token'),
    //   },
    // })
    // .then((response) => response.json())
    // .then(async (responseJson) => {
    //   console.log(responseJson)
    //   return this.setState({
    //     profile: responseJson,
    //   });
    // })
    // .catch((error) => {
    //   console.error(error);
    //   return false;
    // })
    return true;
  }

  componentDidMount() {
    this.getProfile();
  }

  handleRegister() {
    const {name, email, password, c_password} = this.state;
    register(name, email, password, c_password, this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          />

        <TextInput
          value={this.state.name}
          onChangeText={name => this.setState({name})}
          placeholder="Username"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          onSubmitEditing={() => this.emailInput.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          />

        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          ref={(input) => this.emailInput = input}
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
          returnKeyType="next"
          onSubmitEditing={() => this.passwordConfirmInput.focus()}
          ref={(input) => this.passwordInput = input}
          style={styles.input}
          />

        <TextInput
          value={this.state.c_password}
          onChangeText={c_password => this.setState({c_password})}
          placeholder="Confirm Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          returnKeyType="go"
          ref={(input) => this.passwordConfirmInput = input}
          style={styles.input}
          />

        <View style={styles.flexgroup}>
          <TouchableOpacity onPress={ this.handleRegister } style={styles.buttonContainer}>
            <Text> UPDATE </Text>
          </TouchableOpacity>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFA500',
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