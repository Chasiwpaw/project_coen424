import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, CardItem, Right } from 'native-base';
import StarRating from 'react-native-star-rating';

export default class RecommendationCardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expended: false,
      starRating: 0,
    }

    this.toggleRating = this.toggleRating.bind(this);
    this.onStartRatingPress = this.onStartRatingPress.bind(this);
  }

  toggleRating() {
    this.setState({
      expended: !this.state.expended
    })
  }

  onStartRatingPress(rating) {
    this.setState({
      starRating: rating,
    })
  }

  render() {
    return (
      <Card>
        <CardItem button onPress={this.toggleRating}>
          <View>
            <Image
              style={styles.viewImage}
              source={{uri: this.props.imageUri}}
              />
          </View>
          <Right style={styles.right}>
            <Text style={styles.bold}>{this.props.itemName}</Text>
            <Text>
              <Text>Price: </Text>
              {this.props.itemPrice}
            </Text>
            <StarRating 
              disabled={true}
              maxStars={5}
              rating={this.props.itemRating}
              starSize={12}
              fullStarColor='orange'
              emptyStarColor='orange'
              />
          </Right>
        </CardItem>
        {this.state.expended && <CardItem key={this.props.id} footer bordered>
          <Text>
            Review Me! :)
          </Text>
          <StarRating
            maxStars={5}
            starSize={16}
            fullStarColor='orange'
            emptyStarColor='orange'
            rating={this.state.starRating}
            selectedStar={(rating) => this.onStartRatingPress(rating)}
            />
        </CardItem>}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  viewImage: {
    height: 90,
    width: 120,
  },
  right: {
    flex: 1,
    alignItems: 'flex-start',
    height: 90,
    paddingHorizontal: 20,
  },
  bold: {
    fontWeight: 'bold',
  }
});