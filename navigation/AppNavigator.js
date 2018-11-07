import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const AppNavigator = createStackNavigator({
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
    screen: Home,
    navigationOptions: {
      headerLeft: null,
    }
  }
});

export default AppNavigator;