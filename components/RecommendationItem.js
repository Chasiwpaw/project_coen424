import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Card, CardItem, Right } from 'native-base';
import StarRating from 'react-native-star-rating';
import { updateReview } from '../api';

export default class RecommendationCardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expended: false,
      starRating: 0,
      comments: '',
    }

    this.toggleRating = this.toggleRating.bind(this);
    this.onStartRatingPress = this.onStartRatingPress.bind(this);
    this.submitReview = this.submitReview.bind(this);
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

  submitReview() {
    const { starRating, comments } = this.state;
    updateReview(this.props.restoId, starRating, comments);
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
        {this.state.expended && <CardItem key={this.props.id} footer bordered style={styles.footerCard}>
          <Text style={styles.bold}>
            Rate Me! :)
          </Text>
          <StarRating
            maxStars={5}
            starSize={40}
            fullStarColor='orange'
            emptyStarColor='orange'
            rating={this.state.starRating}
            selectedStar={(rating) => this.onStartRatingPress(rating)}
            />
          <Text style={styles.bold}>
            Comment:
          </Text>
          <View style={styles.commentBox}>
            <TextInput
              style={styles.textArea}
              placeholder='Share us your thought!'
              editable={true}
              maxLength={40}
              multiline={true}
              numberOfLines={4}
              onChangeText={(comments) => this.setState({comments})}
              value={this.state.comments}
              />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.submitReview}>
            <Text>
              Submit Review
            </Text>
          </TouchableOpacity>
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
    paddingBottom: 5, 
  },
  footerCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  commentBox: {
    borderWidth: 1,
    borderColor: '#dee0e2',
    width: '100%',
    padding: 5,
    marginBottom: 5,
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
  },
  button: {
    width: '100%',
    color: 'black',
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    flexGrow: 1,
    alignItems: 'center'
  }
});