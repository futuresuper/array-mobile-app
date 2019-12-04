/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';

import { Content, Text } from 'native-base';
import { sg } from 'src/Styles';
import ImpactCard from './ImpactCard';
import Solar from '../../assets/images/impactGifs/Solar.gif';
import Health from '../../assets/images/impactGifs/Health.gif';
import Car from '../../assets/images/impactGifs/Car.gif';
import Water from '../../assets/images/impactGifs/Water.gif';
import Employment from '../../assets/images/impactGifs/Employment.gif';

class TabHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <Content>
        <View style={[sg.contentPadding2, sg.zIndex10]}>
          <View style={sg.mB40}>
            <View style={[sg.aICenter, sg.jCCenter, sg.mT20, sg.mB50]}>
              <Text style={[sg.fS20, sg.textBold]}>
                Impact
              </Text>
            </View>
            <ImpactCard
              image={Solar}
              header="CLEANER ENERGY"
              headerColor="#73C9AC"
              impactNumber="1,446"
              impactTitle="MWh of renewable energy generated per year"
              impactNote="That's enough to charge 5.6 million iPhones"
            />
            <ImpactCard
              image={Health}
              header="HEALTH AND WELLBEING"
              headerColor="#EE6B62"
              impactNumber="420"
              impactTitle="illnesses avoided per year"
              impactNote="Based on research on pollution related diseases"
            />
            <ImpactCard
              image={Car}
              header="GREENHOUSE GAS REDUCTION"
              headerColor="#FFAD3A"
              impactNumber="1,378"
              impactTitle="tons of CO2e emissions avoided"
              impactNote="That’s like taking 324 cars off the road"
            />
            <ImpactCard
              image={Water}
              header="WATER SAVING"
              headerColor="#2F2353"
              impactNumber="15"
              impactTitle="thousand litres of water saved compared to equivalent power from grid"
              impactNote="That’s 746 backyard swimming pools of water"
            />
            <ImpactCard
              image={Employment}
              header="EMPLOYMENT"
              headerColor="#EE6B62"
              impactNumber="2"
              impactTitle="full time construction jobs created"
              impactNote="During the construction of the farms"
            />
          </View>
        </View>
      </Content>
    );
  }
}

TabHome.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
