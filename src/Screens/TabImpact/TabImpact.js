/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';

import { Content, Text } from 'native-base';
import { sg } from 'src/Styles';
import ImpactCard from './ImpactCard';
import ArrayGif from '../../assets/images/Array-Solar-Farm.gif';

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
              image={ArrayGif}
              header="CLEANER ENERGY"
              headerColor="#73C9AC"
              impactNumber="1,446"
              impactTitle="MWh of renewable energy generated per year"
              impactNote="That's enough to charge 5.6 million iPhones"
            />
            <ImpactCard
              image={ArrayGif}
              header="HEALTH AND WELLBEING"
              headerColor="#EE6B62"
              impactNumber="420"
              impactTitle="illnesses avoided per year"
              impactNote="Based on research on pollution related diseases"
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
