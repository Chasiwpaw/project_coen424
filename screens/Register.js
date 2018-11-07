import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';

export default class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          />

        <TextInput
          placeholder="Username"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          onSubmitEditing={() => this.emailInput.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          />

        <TextInput
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
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => this.passwordConfirmInput.focus()}
          ref={(input) => this.passwordInput = input}
          style={styles.input}
          />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          secureTextEntry
          returnKeyType="go"
          ref={(input) => this.passwordConfirmInput = input}
          style={styles.input}
          />

        <View style={styles.flexgroup}>
          <TouchableOpacity onPress={ this.props.onPress } style={styles.buttonContainer}>
            <Text> REGISTER </Text>
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