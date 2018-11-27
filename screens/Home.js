import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Container, Content, Title, Header, Left, Body, Right, Icon, Item, Input, Card, CardItem } from 'native-base';
import Swiper from 'react-native-swiper';
import RecommendationItem from '../components/RecommendationItem';

export default class Home extends Component {
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
              Welcome John!
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
              <Input placeholder="Search" />
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
            <CardItem header>
              <Text>Your Recommendations</Text>
            </CardItem>

            <RecommendationItem
              imageUri={require('../assets/images/bigimage5.jpg')}
              itemName="blablabla"
              itemPrice="$-$$"
              itemRating={4}
              />
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
    marginTop: 70,
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
  }
});