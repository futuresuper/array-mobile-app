/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Image,
  CardItem,
  Body,
  Left,
  Text,
  H3,
} from 'native-base';

const ArticleCard = (props) => {
  const {
    image, onPressOpen, subhead, textAtTop,
  } = props;
  console.log(props);
  return (
    <Card>
      <CardItem
        onPress={() => {
          onPressOpen(props);
        }}
      >
        <Left>
          <Body>
            <H3>{subhead}</H3>
            <Text>{textAtTop}</Text>
          </Body>
        </Left>
      </CardItem>

      {/* <CardItem
        cardBody
        onPress={() => {
          onPressOpen(props);
        }}
      >
        {image && <Image source={{ uri: image }} style={{ height: 200, width: null, flex: 1 }} />}
      </CardItem> */}
    </Card>
  );
};

ArticleCard.propTypes = {
  image: PropTypes.string,
  textAtTop: PropTypes.string,
  subhead: PropTypes.string,
  onPressOpen: PropTypes.func.isRequired,
};

export default ArticleCard;
