import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CustomDrawerContentComponent from '../components/CustomDrawerContentComponent';

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
  ProfileScreen: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile Form',
      headerTransparent: true,
    }
  },
  HomeScreen: {
    screen: createDrawerNavigator({
      Home :{
        screen: Home,
      },
    }, {
      drawerPosition: 'left',
      contentComponent: CustomDrawerContentComponent,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      disableGestures: true,
      drawerLockMode: 'locked-closed',
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