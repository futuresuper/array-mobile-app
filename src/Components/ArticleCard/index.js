/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Video from 'react-native-video';

import {
  Card,
  CardItem,
  Body,
  Icon,
  Left,
  Text,
  Button,
  H3,
} from 'native-base';

import { ImageBackground, View } from 'react-native';

import styles from './styles';

const ArticleCard = (props) => {
  const {
    image, onPressOpen, subhead, textAtTop, otherLikes, headline, userLiked, onPressLike, id, updateType, url
  } = props;
  return (
    <Card>
      <CardItem
        button
        onPress={() => {
          onPressOpen(props);
        }}
      >
        <Body>
          <H3 style={styles.subheadText}>{subhead}</H3>
          <Text style={styles.textAtTop}>{textAtTop}</Text>
        </Body>
      </CardItem>
      {updateType === "video" && image && (
        <CardItem
          cardBody
        >
          <Video
            source={{ uri: url }}
            style={styles.video}
            controls
            muted
          />
        </CardItem>
      )}
      {updateType === "article" && image && (
        <CardItem
          cardBody
          button
          onPress={() => {
            onPressOpen(props);
          }}
        >
          <ImageBackground
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.image}
          >
            {headline && (
              <View style={styles.imageOverlayContainer}>
                <Text style={styles.imageOverlayContainerText}>
                  {headline}
                </Text>
                <View style={styles.imageOverlayContainerButton}>
                  <Button
                    small
                    onPress={() => {
                      onPressOpen(props);
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>
                    View
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          </ImageBackground>
        </CardItem>
      )}
      <CardItem>
        <Left>
          {userLiked ? (
            <Button transparent small onPress={() => onPressLike({ id, like: false })}>
              <Icon type="FontAwesome" style={{ color: 'red' }} name="heart" />
              <Text style={{ color: 'black', fontSize: 10 }}>
                {`You and ${otherLikes} liked this`}
              </Text>
            </Button>
          ) : (
            <Button transparent small onPress={() => onPressLike({ id, like: true })}>
              <Icon type="FontAwesome" style={{ color: 'red' }} name="heart-o" />
              <Text style={{ color: 'black', fontSize: 10 }}>
                {`${otherLikes} people like this`}
              </Text>
            </Button>
          )}
        </Left>
      </CardItem>
    </Card>
  );
};


ArticleCard.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  textAtTop: PropTypes.string,
  headline: PropTypes.string,
  subhead: PropTypes.string,
  onPressOpen: PropTypes.func.isRequired,
  onPressLike: PropTypes.func.isRequired,
  otherLikes: PropTypes.number,
  userLiked: PropTypes.bool,
};

export default ArticleCard;
