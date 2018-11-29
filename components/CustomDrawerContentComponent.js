import React, {Component} from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import {Container, Header, Content } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, AsyncStorage } from 'react-native';

export default class CustomDrawerContentComponent extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout = async() => {
    try {      
      await AsyncStorage.removeItem('token');
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({routeName: 'login'})
          ]
        })
      )
    } catch {

    }
  }

  render() {
    return (
      <Container>
        <Header style={styles.menu}>
          <Text style={styles.font}>
            Menu
          </Text>
        </Header>
        <Content>
          <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()} style={styles.menuItem}>
            <Text>
              Home
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')} style={styles.menuItem}>
            <Text>
              Profile
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={this.logout} style={styles.menuItem}>
            <Text>
              Logout
            </Text>
          </TouchableOpacity>
  
        </Content>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#FFA500',
    height: 70,
    borderBottomColor: '#757575',
    alignItems: 'center',
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee0e2',
  },
  font: {
    fontSize: 20,
  }
});