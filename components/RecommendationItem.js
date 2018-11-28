import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CardItem, Right } from 'native-base';
import StarRating from 'react-native-star-rating';

export default class RecommendationCardItem extends Component {
  render() {
    return (
      <CardItem>
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