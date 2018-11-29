import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Container, Content, Title, Header, Left, Body, Right, Icon, Item, Input, Card, CardItem } from 'native-base';
import Swiper from 'react-native-swiper';
import RecommendationItem from '../components/RecommendationItem';
import { AsyncStorage } from 'react-native';
import Pusher from 'pusher-js/react-native';
// import { listRestaurants } from '../api';

export default class Home extends Component {
  static navigationOptions = {
    header: null,
    disabledBackGesture: true,
    gesturesEnabled: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      restos: null,
      temp_restos: null,
      search: '',
      position: null,
      limit: 10,
      radius: 100,
    };

    this.pusher = null;
    this.user_channel = null;
    this.populateRestaurants = this.populateRestaurants.bind(this);
    this.listRestaurants = this.listRestaurants.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  listRestaurants = async(position) => {
    const { limit, radius } = this.state;
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
      return this.setState({
        restos: responseJson.businesses,
        temp_restos: responseJson.businesses,
        position: position,
      });
    })
    .catch((error) => {
      console.error(error);
      return false;
    })
  }

  searchSubmit = async() => {
    const { position, search, limit, radius } = this.state;
    const { latitude, longitude } = position.coords;
    
    fetch(`http://35.182.248.84/api/places?latitude=${latitude}&longitude=${longitude}&term=${search}&limit=${limit}&radius=${radius}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await AsyncStorage.getItem('token'),
      },
    })
    .then((response) => response.json())
    .then(async (responseJson) => {
      return this.setState({
        restos: responseJson.businesses,
        temp_restos: responseJson.businesses,
      });
    })
    .catch((error) => {
      console.error(error);
      return false;
    })
  }

  componentDidMount() {
    this.pusher = new Pusher('0804ef5e4cd344d9d174', {
      cluster: 'us2',
      forceTLS: true,
    });;
    this.user_channel = this.pusher.subscribe('my-channel');
    this.user_channel.bind('pusher:subscription_error', status => {
      Alert.alert('Error occured', 'Cannot connect to Pusher. Please restart the app.');
    });
    this.user_channel.bind('pusher:subscription_succeeded', () => {
      this.user_channel.bind('my-event', data => {
        if(data.success !== undefined) {
          this.setState({
            restos: data.success,
            temp_restos: data.success,
          })
        }
      })
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.listRestaurants(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('my-channel');
  }

  populateRestaurants() {
    if(this.state.restos !== null) {
      return this.state.temp_restos.map((resto, index) => {
        return (
          <RecommendationItem
            key={index}
            restoId={resto.id}
            imageUri={resto.image_url}
            itemName={resto.name}
            itemPrice={resto.price}
            itemRating={resto.rating}
          />
        )
      })
    } else {
      return;
    }
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <Icon onPress={() => this.props.navigation.openDrawer()} name='md-menu' style={styles.icon} />
            <Image style={styles.logo} source={require('../assets/images/burger.png')}/>
          </Left>
          <Body>
            <Title style={styles.fontSize}>
              FeedMeFinder!
            </Title>
          </Body>
          <Right>
            <Icon name='md-heart' style={styles.icon} />
          </Right>
        </Header>
        <View style={styles.view}>
          <TouchableOpacity>
            <View style={styles.touchableView}>
              <Text style={styles.fontSize}>Filter by ...</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.searchView}>
            <Item style={styles.item}>
              <Icon name='md-search' style={styles.searchIcon} />
              <Input 
                placeholder="Search"
                returnKeyType="search"
                onChangeText={(search) => this.setState({search})}
                onSubmitEditing={this.searchSubmit}
              />
            </Item>
          </View>
        </View>

        <Content style={styles.content}>
          <Swiper style={styles.swiper}>
            <View style={styles.swiperView}>
              <Image 
                style={styles.swiperImage}
                source={require('../assets/images/bigimage.jpg')}
                />
            </View>
            <View style={styles.swiperView}>
              <Image 
                style={styles.swiperImage}
                source={require('../assets/images/bigimage2.jpg')}
                />
            </View>
            <View style={styles.swiperView}>
              <Image 
                style={styles.swiperImage}
                source={require('../assets/images/bigimage3.jpg')}
                />
            </View>
            <View style={styles.swiperView}>
              <Image 
                style={styles.swiperImage}
                source={require('../assets/images/bigimage4.jpg')}
                />
            </View>
          </Swiper>

          <Card>
            <CardItem header style={styles.cardHeader}>
              <Text>Your Recommendations</Text>
            </CardItem>

            {
              this.populateRestaurants()
            }
          </Card>
        </Content>
      </Container>
    ); 
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFA500',
    height: 70,
    borderBottomColor: '#757575',
  },
  left: {
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    marginRight: 15,
  },
  logo: {
    height: 30,
    width: 30,
  },
  faIcon: {
    fontSize: 32,
  },
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 70,
    height: 60,
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  touchableView: {
    width: 100,
    backgroundColor: '#e7e7eb',
    height: 40,
    borderRadius: 4, padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSize: {
    fontSize: 12,
  },
  searchIcon: {
    fontSize: 20,
    paddingTop: 5,
  },
  searchView: {
    flex: 1,
    height: '100%',
    marginLeft: 5,
    justifyContent: 'center',
  },
  item: {
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  content: {
    backgroundColor: '#d5d5db',
    marginTop: 60,
  },
  swiper: {
    height: 160,
  },
  swiperView: {
    flex: 1,
  },
  swiperImage: {
    flex:1,
    height: null,
    width: null,
    resizeMode: 'stretch',
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#dee0e2',
  }
});