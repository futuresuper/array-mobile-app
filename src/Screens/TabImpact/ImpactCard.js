import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
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
    paddingLeft: 8,
  },
  impactNumberText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  impactTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 10,
  },
  impactTitleText: {
    fontSize: 11,
    flexWrap: 'wrap',
    textAlign: 'left',
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
    <CardItem style={{ flexDirection: 'row', flex: 1 }}>
      <View style={styles.impactNumberContainer}>
        <Text style={styles.impactNumberText}>
          {impactNumber}
        </Text>
      </View>
      <View style={styles.impactTitleContainer}>
        <Text style={styles.impactTitleText}>
          {impactTitle}
        </Text>
      </View>
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
