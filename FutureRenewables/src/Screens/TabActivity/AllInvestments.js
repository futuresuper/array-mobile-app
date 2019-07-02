
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Image,
} from 'react-native';
import {
  Content,
  Text,
  Grid,
  Col,
  Row,
  Icon,
} from 'native-base';

import SunDark from 'src/assets/images/SunDark.png';
import HeartDark from 'src/assets/images/HeartDark.png';

import {
  sg,
} from 'src/Styles';
import { allInvestments as styles } from './styles';


class AllInvestments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      farms: [
        {
          name: 'Brigalow',
          type: 'Solar Farm',
          icon: 'sun',
        },
        {
          name: 'Chinchilla',
          type: 'Solar Farm',
          icon: 'sun',
        },
        {
          name: 'Silent Hill',
          type: 'Wind Farm',
          icon: 'sun',
        },
        {
          name: 'Name goes here',
          type: 'Solar Farm',
          icon: 'sun',
        },
        {
          name: 'Name goes here',
          type: 'Solar Farm',
          icon: 'heart',
        },
        {
          name: 'Name goes here',
          type: 'Solar Farm',
          icon: 'heart',
        },
      ],
    };
  }

  render() {
    const { screenProps } = this.props;
    const { farms } = this.state;
    const theme = screenProps.getTheme();

    return (
      <Content padder contentContainerStyle={sg.contentPadding2}>
        <FlatList
          data={farms}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isSunIcon = (item.icon === 'sun');
            const icon = {
              source: isSunIcon ? SunDark : HeartDark,
              style: isSunIcon ? styles.iconSun : styles.iconHeart,
            };

            return (
              <Grid style={[sg.borderColor(theme.borderColorList), styles.itemContainer, (index === 0 ? styles.itemContainerFirst : {})]}>
                <Row style={[sg.pV20, sg.pL10, sg.pR20]}>
                  <Col style={[sg.jCCenter, sg.flexNull, sg.width30]}>
                    <Image source={icon.source} style={icon.style} resizeMode="contain" />
                  </Col>
                  <Col style={[sg.mL20, sg.mR20]}>
                    <Text style={[sg.fS14, sg.textBold]}>{item.name}</Text>
                  </Col>
                  <Col style={sg.jCCenter}>
                    <Text style={[sg.fS14, sg.fontMedium, sg.colorGray11]}>{item.type}</Text>
                  </Col>
                  <Col style={[sg.jCCenter, sg.mL30, sg.width10, sg.flexNull]}>
                    <Icon name="ios-arrow-forward" style={[sg.colorGray, sg.fS14]} />
                  </Col>
                </Row>
              </Grid>
            );
          }}
        />
      </Content>
    );
  }
}

export default connect()(AllInvestments);
