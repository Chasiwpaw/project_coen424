import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';

export default class Home extends Component {
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
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          />
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