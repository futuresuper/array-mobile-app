
import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import {
  Button,
  View,
  Text,
  Icon,
  H1,
  H2,
  H3,
  Grid,
  Row,
  Col,
  Badge,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Accordion,
} from 'native-base';

import TextQuestion from 'src/Components/TextQuestion';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class Investment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barGraph: {
        isSun: true,
        isHeart: false,
      },
      farms: [
        {
          name: 'Brigalow',
          type: 'Solar Farm',
        },
        {
          name: 'Chinchilla',
          type: 'Solar Farm',
        },
        {
          name: 'Silent Hill',
          type: 'Wind Farm',
        },
        {
          name: 'Name goes here',
          type: 'Solar Farm',
        },
        {
          name: 'Name goes here',
          type: 'Solar Farm',
        },
        {
          name: 'Name goes here',
          type: 'Solar Farm',
        },
      ],
    };
  }

  setSunBar() {
    this.setState({
      barGraph: {
        isSun: true,
        isHeart: false,
      },
    });
  }

  setHeartBar() {
    this.setState({
      barGraph: {
        isSun: false,
        isHeart: true,
      },
    });
  }

  renderListFarms() {
    const { farms } = this.state;

    return (
      <List>
        <FlatList
          data={farms}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem noIndent style={styles.investListItem}>
              <Left style={sg.aICenter}>
                <Text>{item.name}</Text>
                <Icon type="FontAwesome5" name="arrow-right" style={[sg.colorGray, sg.fS15, sg.mL10]} />
              </Left>
              <Right style={[sg.flex05]}>
                <Text style={sg.colorGray}>{item.type}</Text>
              </Right>
            </ListItem>
          )}
        />

      </List>
    );
  }

  render() {
    const { barGraph } = this.state;
    const sunBarStyle = barGraph.isSun ? {} : sg.bGGray8;
    const heartBarStyle = barGraph.isHeart ? {} : sg.bGGray8;

    return (
      <View style={sg.mB10}>
        <View style={sg.mH10}>
          <Text>Let&apos;s break down where your money is going.</Text>

          <Grid style={[sg.bGWhite, sg.mV20]}>
            <Col
              style={[sg.center, sg.p10, sunBarStyle]}
              onPress={() => {
                this.setSunBar();
              }}
            >
              <Icon type="FontAwesome5" name="sun" />
            </Col>
            <Col
              style={[sg.center, sg.p10, heartBarStyle]}
              onPress={() => {
                this.setHeartBar();
              }}
            >
              <Icon name="ios-heart" />
            </Col>
          </Grid>

          <Grid>
            <Col style={sg.width130}>
              <Text style={styles.investFarmTitle}>{barGraph.isSun ? 'Solar Farms' : 'Ethical'}</Text>
              <Text style={[styles.investFarmProgress, sg.mV10]}>{barGraph.isSun ? '60%' : '40%'}</Text>
              <TextQuestion text="Target" />
            </Col>
            <Col>
              {barGraph.isSun ? (
                <Text>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                </Text>
              ) : (
                <Text>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.
                </Text>
              )}
            </Col>
          </Grid>

        </View>

        <Accordion
          dataArray={[{
            title: 'See all inverstments',
          }]}
          headerStyle={styles.allInvestHeader}
          contentStyle={{ borderWidth: 0, marginBottom: 0, paddingBottom: 0, }}
          style={{ borderWidth: 0, marginBottom: 0, paddingBottom: 0, marginLeft: 0, paddingLeft: 0 }}
          renderContent={() => this.renderListFarms()}
        />

      </View>
    );
  }
}

export default Investment;
