
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';

import {
  Content,
  Text,
  H1,
  Grid,
  Col,
  Card,
  CardItem,
  Body,
} from 'native-base';

import CloseButton from 'src/Components/CloseButton';
import WeatherWidget from 'src/Components/WeatherWidget';
import {
  TabBarWrapper,
} from 'src/Components/TabBar';

import deviceUtils from 'src/Common/device';

import {
  featuredSolarFarmSelector,
} from 'src/Redux/AppContent';

import {
  sg,
  sc,
} from 'src/Styles';

import styles from './styles';

class SolarFarm extends Component {
  renderPhotoItem({ item }) {
    return (
      <Card style={styles.solarFarmPhotoCard}>
        <CardItem style={styles.solarFarmPhotoCardItem}>
          <Body>
            <Image source={{ uri: item }} style={styles.solarFarmPhotoPhoto} resizeMode="cover" />
          </Body>
        </CardItem>
      </Card>
    );
  }

  renderStats() {
    const { item } = this.props;

    return (
      <Grid style={styles.solarFarmStatBl}>
        {item.stats.map(({ number, label }, index) => (
          <Col style={styles.solarFarmStatCol} key={index.toString()}>
            <Text style={styles.solarForamStatAmount}>{number}</Text>
            <Text style={styles.solarForamStatDescription}>{label}</Text>
          </Col>
        ))}
      </Grid>
    );
  }

  render() {
    const { item } = this.props;

    if (!item) {
      return null;
    }

    const imageUrl = item.featureImage.portrait;
    const photos = item.otherImages;

    return (
      <TabBarWrapper {...this.props}>
        <Content contentContainerStyle={[sg.mT0]} bounces={false}>
          <ImageBackground source={{ uri: imageUrl }} resizeMode="stretch" style={[{ height: (deviceUtils.screenHeight() - sc.footerHeight - 54) }]}>

            <View style={[sg.aIEnd, sg.mT40]}>
              <CloseButton white {...this.props} />
            </View>

            <View style={[sg.aICenter, sg.spaceBetween]}>
              <View>
                <WeatherWidget
                  coordinate={item.coordinate}
                  style={styles.solarFarmWeatherWidget}
                />

                <H1 style={[sg.fS35, sg.mT30, sg.mB5, sg.colorDark3]}>{item.name}</H1>
                <Text style={styles.solarFarmItemDescription}>{item.location}</Text>
              </View>

              <View style={sg.aICenter}>
                {item.completionDate && <Text style={[styles.solarFarmFinishDate, sg.mB50]}>{`Projected finish date: ${item.completionDate}`}</Text>}
                {this.renderStats()}
              </View>

            </View>
          </ImageBackground>

          <Text style={[sg.fS24, sg.textBold, sg.aSCenter, sg.mT30]} color2>About</Text>
          <Text style={[sg.contentMarginH, sg.mT20, sg.mB30]}>{item.about}</Text>

          <FlatList
            data={photos}
            keyExtractor={(i, index) => index.toString()}
            renderItem={(...args) => this.renderPhotoItem(...args)}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={sg.mB30}
          />

        </Content>
      </TabBarWrapper>
    );
  }
}

SolarFarm.defaultProps = {
  item: null,
};

SolarFarm.propTypes = {
  item: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  let item = ownProps.navigation.getParam('item', null);

  if (!item) {
    item = featuredSolarFarmSelector(state);
  }

  return {
    item,
  };
};

export default connect(mapStateToProps)(SolarFarm);
