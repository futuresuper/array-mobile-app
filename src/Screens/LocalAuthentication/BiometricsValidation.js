import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
} from 'native-base';

import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';
import { localAuthValidate } from 'src/Redux/Auth';

import BiometricsInput from 'src/Components/BiometricsInput';


import {
  styleGlobal,
} from 'src/Styles';

class BiometricsValidation extends React.PureComponent {
  handleBiometricsSuccess() {
    const { localAuthValidateConnect, screenProps, navigation } = this.props;
    localAuthValidateConnect();
    screenProps.navigateTo(navigation.getParam('next', 'TAB_HOME'));
  }

  handleBiometricsError(error) {
    console.log(error);
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.flexGrow}>
        <View style={styleGlobal.spaceBetween}>
          <View style={[styleGlobal.center, styleGlobal.mT50]}>
            <BiometricsInput onSuccess={() => this.handleBiometricsSuccess()} onError={error => this.handleBiometricsError(error)} />
          </View>
        </View>
      </Content>
    );
  }
}

BiometricsValidation.propTypes = {
  localAuthValidateConnect: PropTypes.func.isRequired,
};


const mapDispatchToProps = {
  localAuthValidateConnect: localAuthValidate,
};

const mapStateToProps = state => ({
});


const res = composeHoc([
  hocNames.FORM,
])(BiometricsValidation);

export default connect(mapStateToProps, mapDispatchToProps)(res);
