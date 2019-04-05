
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
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import TextQuestion from 'src/Components/TextQuestion';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class Investment extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const { screenProps } = this.props;
    const { farms } = this.state;

    return (
      <View style={sg.mB10}>
        <Text>Let&apos;s break down where your money is going.</Text>

        <Grid style={[sg.bGWhite, sg.mV20]}>
          <Col style={[sg.center, sg.p20]}>
            <Icon type="FontAwesome5" name="sun" />
          </Col>
          <Col style={[sg.center, sg.p20, sg.bGGray8]}>
            <Icon name="ios-heart" />
          </Col>
        </Grid>

        <Grid>
          <Col style={sg.width130}>
            <Text style={styles.investFarmTitle}>Solar Farms</Text>
            <Text style={[styles.investFarmProgress, sg.mV10]}>60%</Text>
            <TextQuestion text="Target" />
          </Col>
          <Col>
            <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
            </Text>
          </Col>
        </Grid>

        <List>
          <ListItem noIndent />

          <ListItem noIndent>
            <Left style={sg.aICenter}>
              <Text>See all investments</Text>
            </Left>
            <Right>
              <Icon name="ios-arrow-up" style={sg.colorDark} />
            </Right>
          </ListItem>

          <FlatList
            data={farms}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListItem noIndent>
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


          <Button
            iconRight
            block
            gray4
            style={sg.mV30}
            onPress={() => {
              screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW);
            }}
          >
            <Text>Deposit</Text>
            <Icon name="add" />
          </Button>

        </List>

      </View>
    );
  }
}

export default Investment;
