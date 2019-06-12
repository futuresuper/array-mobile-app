
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  Row,
  Card,
  CardItem,
  Body,
} from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

import BackButton from 'src/Components/BackButton';
import CloseButton from 'src/Components/CloseButton';
import WeatherWidget from 'src/Components/WeatherWidget';

import deviceUtils from 'src/Common/device';

import {
  sg,
  sc,
} from 'src/Styles';

import styles from './styles';

const imageUrl = 'http://www.gone-fishing.co.za/wp-content/uploads/2009/07/ab0001.jpg';

class SolarFarm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      photos: [
        {
          id: 1,
          description: 'description',
          photo: 'https://cdn-02.independent.ie/business/farming/article35962536.ece/e4bd2/AUTOCROP/w620/2017-07-25_bus_33141392_I1.JPG',
        },
        {
          id: 2,
          description: 'description 2',
          photo: 'https://www.revisionenergy.com/wp-content/uploads/2015/06/20.jpg',
        },
        {
          id: 3,
          description: 'description 3',
          photo: 'https://futurism.com/wp-content/uploads/2017/07/Carter-Farm-Solar-Project-Plains-1020x610-1-300x179.jpg',
        },
      ],
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', {});

    this.setState({
      item,
    });
  }

  renderPhotoItem = ({ item }) => (
    <Card style={styles.solarFarmPhotoCard}>
      <CardItem style={styles.solarFarmPhotoCardItem}>
        <Body>
          <Image source={{ uri: item.photo }} style={styles.solarFarmPhotoPhoto} resizeMode="cover" />
          <View style={styles.solarFarmPhotoTextBl}>
            <Text style={styles.solarFarmPhotoDescription}>{item.description}</Text>
          </View>
        </Body>
      </CardItem>
    </Card>
  )

  render() {
    const { item, photos } = this.state;

    return (
      <Content contentContainerStyle={[sg.mT0]} bounces={false}>
        <ImageBackground source={{ uri: imageUrl }} resizeMode="stretch" style={[{ height: (deviceUtils.screenHeight() - sc.footerHeight - 34) }]}>

          <View style={[sg.aIEnd, sg.mT40]}>
            <CloseButton white {...this.props} />
          </View>

          <View style={[sg.aICenter, sg.spaceBetween]}>
            <View>
              <WeatherWidget
                coordinate={item.coordinate}
                style={styles.solarFarmWeatherWidget}
              />

              <H1 style={[sg.fS35, sg.mT30, sg.mB5]}>{item.title}</H1>
              <Text style={styles.solarFarmItemDescription}>{item.description}</Text>
            </View>

            <View>
              <Text style={styles.solarFarmFinishDate}>Projected finish date: Jan 2020</Text>

              <Grid style={styles.solarFarmStatBl}>
                <Col style={styles.solarFarmStatCol}>
                  <Text style={styles.solarForamStatAmount}>85</Text>
                  <Text style={styles.solarForamStatDescription}>New panels added</Text>
                </Col>
                <Col style={styles.solarFarmStatCol}>
                  <Text style={styles.solarForamStatAmount}>60k</Text>
                  <Text style={styles.solarForamStatDescription}>Tonnes of carbon reduced</Text>
                </Col>
                <Col style={styles.solarFarmStatCol}>
                  <Text style={styles.solarForamStatAmount}>400</Text>
                  <Text style={styles.solarForamStatDescription}>New jobs created</Text>
                </Col>
              </Grid>
            </View>

          </View>
        </ImageBackground>

        <View>
          <Text>asd</Text>
          <Text>asd</Text>
          <Text>asd</Text>
        </View>


        {/* <View>
          <Grid>
            <Row>
              <Col style={sg.mL20}>
                <H1>{item.title}</H1>
                <Text style={styles.solarFarmItemDescription}>{item.description}</Text>
              </Col>
            </Row>
          </Grid>
        </View> */}

        {/* <Grid style={[sg.p20]}>
          <Col style={sg.width100}>
            <H1>About</H1>
          </Col>
          <Col>
            <Text style={sg.colorGray}>
              A 34.5MW solar farm under developnet near Pittsworth in southeast Queensland. When complete,
              Brigalow will power the equivalent of 11,300 average Ausstralian homes and expected to avoid adding 60 tonnes of Gold from the atmoshere.
            </Text>
          </Col>
        </Grid>

        <FlatList
          data={photos}
          keyExtractor={person => person.id.toString()}
          renderItem={this.renderPhotoItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photosBl}
        /> */}

      </Content>
    );
  }
}

export default connect()(SolarFarm);
