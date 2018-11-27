import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const LoginScreen = createStackNavigator({
  LoginScreen: { 
    screen: Login,
    navigationOptions: {
      headerTransparent: true,
    },
  },
  RegisterScreen: { 
    screen: Register,
    navigationOptions: {
      title: 'Register Form',
      headerTransparent: true,
    },
  },
  HomeScreen: {
    screen: createDrawerNavigator({
      Home :{
        screen: Home,
      },
      Profile: {
        screen: Home,
      },
      Logout: {
        screen: Login,
      }
    }, {
      disableGestures: true,
      drawerLockMode: 'locked-closed'
    }),
    navigationOptions: {
      header: null,
      disabledBackGesture: true,
      gesturesEnabled: false,
    },
  }
});

const AppNavigator = createStackNavigator({
  login: {
    screen: LoginScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
}, {
  headerMode: 'none',
  initialRouteName: 'login',
  drawerLockMode: 'locked-closed',
  swipeEnabled: false,
});

export default AppNavigator;