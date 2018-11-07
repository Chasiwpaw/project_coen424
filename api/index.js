import { AsyncStorage } from 'react-native';

export const authLogin = async (username, password, state) => {
  fetch(`http://35.182.248.84/api/login?email=${username}&password=${password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then(async (responseJson) => {
      console.log('Im here')
      if(responseJson.success !== null) {
        try {
          await AsyncStorage.setItem('token', responseJson.success.token);
          state.navigate('HomeScreen');
          return true;
        } catch (error) {
          // Error saving data
          console.log(error);
          return false;
        }
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}