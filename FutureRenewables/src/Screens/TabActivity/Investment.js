
import React, { Component } from 'react';
import {
  FlatList,
  Image,
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

import SunDark from 'src/assets/images/SunDark.png';
import HeartDark from 'src/assets/images/HeartDark.png';
import Oval from './images/Oval.png';

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

  renderListFramsHeader({ title }) {

    return (
      <View style={styles.allInvestHeader}>
        <Text style={[sg.fontMedium]}>{title}</Text>
        <Icon name="ios-arrow-forward" style={[sg.colorDark3, { fontSize: 20 }]} />
      </View>
    );
  }

  renderInvTitle(image, title) {
    return (
      <Grid style={styles.activityInvTitle}>
        <Row style={[sg.aICenter]}>
          <Image source={image} />
          <Text style={[sg.headingS, sg.colorDark2, sg.mL15]}>{title}</Text>
        </Row>
      </Grid>
    );
  }

  renderInvBody(value) {
    return (
      <Grid style={sg.contentMarginH}>
        <Col style={sg.width110}>
          <Text style={[sg.headingS, sg.colorDark2]}>{value}</Text>
          <Text style={[sg.fS14, sg.colorGray11]}>Target</Text>
        </Col>
        <Col>
          <Text style={[sg.fS14]}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
          </Text>
        </Col>
      </Grid>
    );
  }

  render() {
    const { barGraph } = this.state;
    const sunBarStyle = barGraph.isSun ? {} : sg.bGGray8;
    const heartBarStyle = barGraph.isHeart ? {} : sg.bGGray8;

    return (
      <View style={sg.mB10}>
        <View style={sg.mH0}>
          <Text style={[sg.fontMedium, sg.contentMarginH]}>Let&apos;s break down where your money is going.</Text>

          <Image source={Oval} style={[sg.aSCenter, sg.mT20, sg.mB30]} />

          {this.renderInvTitle(SunDark, 'Renewables')}
          {this.renderInvBody('60%')}

          <View style={sg.mT40} />

          {this.renderInvTitle(HeartDark, 'Ethical')}
          {this.renderInvBody('40%')}

        </View>

        <Accordion
          dataArray={[{
            title: 'See all inverstments',
          }]}
          headerStyle={styles.allInvestHeader}
          contentStyle={{ borderWidth: 0, marginBottom: 0, paddingBottom: 0, }}
          style={{ borderWidth: 0, marginBottom: 0, paddingBottom: 0, marginLeft: 0, paddingLeft: 0 }}
          iconStyle={{ color: 'red'}}
          renderContent={() => this.renderListFarms()}
          renderHeader={(...args) => this.renderListFramsHeader(...args)}
        />

      </View>
    );
  }
}

export default Investment;
