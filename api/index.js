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
          await AsyncStorage.setItem('token', 'Bearer ' + responseJson.success.token);
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

export const register = async(name, email, password, c_password, state, pusher) => {
  fetch(`http://35.182.248.84/api/register?name=${name}&email=${email}&password=${password}&c_password=${c_password}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then(async (responseJson) => {
    if(responseJson.success !== null) {
      try {
        await AsyncStorage.setItem('token', 'Bearer ' + responseJson.success.token);
        state.setParams({pusher})
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
  })
}

export const profile = async(token) => {
  fetch('http://35.182.248.84/api/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })
  .then((response) => response.json())
  .then(async (responseJson) => {
    console.log('Im here')
    if(responseJson.success !== null) {
      try {
        // await AsyncStorage.setItem('token', 'Bearer ' + responseJson.success.token);
        // state.navigate('HomeScreen');
        console.log(responseJson.success);
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
  })
}

export const listRestaurants = async(position, radius, limit) => {
  const { latitude, longitude } = position.coords;
  fetch(`http://35.182.248.84/api/places?latitude=${latitude}&longitude=${longitude}&radius=${radius}&term=Restaurant&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await AsyncStorage.getItem('token'),
    },
  })
  .then((response) => response.json())
  .then(async (responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
    return false;
  })
}

export const recommendRestaurants = async() => {
  fetch('http://35.182.248.84/api/recommend', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await AsyncStorage.getItem('token'),
    },
  })
  .then((response) => response.json())
  .then(async (responseJson) => {
    console.log(responseJson);
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
    return false;
  })
}

export const updateReview = async(id, star, comment) => {
  const no_comment = 'No Comment';
  const commentText = comment !== '' ? `&text=${comment}` : `&text=${no_comment}`;
  fetch(`http://35.182.248.84/api/review?business_id=${id}&stars=${star}${commentText}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await AsyncStorage.getItem('token'),
    },
  })
  .then((response) => response.json())
  .then(async (responseJson) => {
    console.log(responseJson);
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
    return false;
  })
}