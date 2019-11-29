
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

import {
  investmentsSelector,
} from 'src/Redux/AppContent';

import SunDark from 'src/assets/images/SunDark.png';
import HeartDark from 'src/assets/images/HeartDark.png';

import {
  sg,
} from 'src/Styles';
import { allInvestments as styles } from './styles';


const DATA = [
  {
    category: 'renewables',
    name: 'Brigalow',
    subCategory: 'Solar Farm',
    solarFarmId: '1',
  },
  {
    category: 'renewables',
    name: 'Chinchilla',
    subCategory: 'Solar Farm',
    solarFarmId: '2',
  },
  {
    category: 'renewables',
    name: 'Swan Hill',
    subCategory: 'Solar Farm',
    solarFarmId: '3',
  },
  {
    category: 'ethical',
    name: 'Juice Capital Energy',
    subCategory: 'Renewables Lending',
  },
  {
    category: 'ethical',
    name: 'RateSetter (National Clean Energy Market)',
    subCategory: 'Renewables Lending',
  },
  {
    category: 'ethical',
    name: 'NextDC Floating Rate Note',
    subCategory: 'Fixed Interest',
  },
  {
    category: 'ethical',
    name: 'Bendigo and Adelaide Bank Floating Rate Note',
    subCategory: 'Fixed Interest',
  },
  {
    category: 'ethical',
    name: 'Insurance Australia Group Floating Rate Note',
    subCategory: 'Fixed Interest',
  },
  {
    category: 'ethical',
    name: 'Bank of Queensland Floating Rate Note',
    subCategory: 'Fixed Interest',
  },
  {
    category: 'ethical',
    name: 'Centuria Funds Management Floating Rate Note',
    subCategory: 'Fixed Interest',
  },
  {
    category: 'ethical',
    name: 'Challenger Floating Rate Note',
    subCategory: 'Fixed Interest',
  },
  {
    category: 'ethical',
    name: 'BNY Custodian Omni Bank Account',
    subCategory: 'Cash',
  },
  {
    category: 'ethical',
    name: 'St George Bank (Investment Account)',
    subCategory: 'Cash',
  },
];

class AllInvestments extends PureComponent {
  render() {
    const { screenProps, investments } = this.props;
    const theme = screenProps.getTheme();

    // console.log(investments);

    return (
      <Content padder contentContainerStyle={sg.contentPadding2}>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const {
              name,
              subCategory,
            } = item;
            const isSunIcon = (subCategory === 'Solar Farm' || subCategory === 'Renewables Lending');
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
                    <Text style={[sg.fS14, sg.textBold]}>{name}</Text>
                  </Col>
                  <Col style={sg.jCCenter}>
                    <Text style={[sg.fS14, sg.fontMedium, sg.colorGray11]}>{subCategory}</Text>
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

AllInvestments.propTypes = {
  investments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const investments = investmentsSelector(state);

  return {
    investments,
  };
};

export default connect(mapStateToProps)(AllInvestments);
