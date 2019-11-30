import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';
import {
  Card, CardItem, Body, Text, Left, Right,
} from 'native-base';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  impactNumberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactNumberText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  impactTitleContainer: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactTitleText: {
    fontSize: 11,
  },
  impactNoteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  impactNoteText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 11,
  },
});

const ImpactCard = ({
  image,
  header,
  headerColor,
  impactNumber,
  impactTitle,
  impactNote,
}) => (
  <Card>
    <CardItem style={{ backgroundColor: headerColor, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
      <Body style={[styles.headerContainer]}>
        <Text style={styles.headerText}>{header}</Text>
      </Body>
    </CardItem>
    <CardItem cardBody>
      <Image source={image} style={{ height: 200, width: null, flex: 1 }} />
    </CardItem>
    <CardItem>
      <Left style={{ flex: 0.4 }}>
        <Body style={styles.impactNumberContainer}>
          <Text style={styles.impactNumberText}>
            {impactNumber}
          </Text>
        </Body>
      </Left>
      <Right>
        <Body style={[styles.impactTitleContainer]}>
          <Text style={styles.impactTitleText}>
            {impactTitle}
          </Text>
        </Body>
      </Right>
    </CardItem>
    <CardItem>
      <Body style={styles.impactNoteContainer}>
        <Text style={styles.impactNoteText}>
          {impactNote}
        </Text>
      </Body>
    </CardItem>
  </Card>
);


ImpactCard.propTypes = {
  image: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
  headerColor: PropTypes.string.isRequired,
  impactNumber: PropTypes.string.isRequired,
  impactTitle: PropTypes.string.isRequired,
  impactNote: PropTypes.string.isRequired,

};

export default ImpactCard;
