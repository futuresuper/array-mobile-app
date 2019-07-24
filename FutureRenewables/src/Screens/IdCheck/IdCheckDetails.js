
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Content,
  Text,
  View,
  Button,
} from 'native-base';

import {
  Input,
} from 'src/Components/Form';
import {
  routeNames,
} from 'src/Navigation';

import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import idCheckUtils from 'src/Common/idCheck';

import {
  sg,
} from 'src/Styles';

class IdCheckDetails extends Component {
  componentDidMount() {
    const { item, newItemByType } = this.props;

    if (newItemByType) {
      this.setForm({
        type: newItemByType,
        name: '',
        no: '',
        state: '',
      });
    } else {
      this.setForm(item);
    }
  }

  onSubmit() {
    const { hocs, screenProps } = this.props;
    const formIsValid = hocs.formIsValid();

    if (!formIsValid) {
      return;
    }

    screenProps.navigateTo(routeNames.ID_CHECK_FINISH);
  }

  setForm(item) {
    const { hocs } = this.props;

    hocs.setFormFromObject(item).then(() => {
      hocs.setFieldValidations('name', [
        'required',
      ]);

      hocs.setFieldValidations('no', [
        'required',
      ]);

      // if (item.type === idCheckUtils.ID_TYPE.PASSPORT) {

      // } else if (item.type === idCheckUtils.ID_TYPE.PASSPORT) {
      // }

      hocs.setFieldValidations('state', [
        'required',
      ]);
    });
  }

  getTitle() {
    const { newItemByType } = this.props;
    let res = 'Update ID Details';

    if (newItemByType) {
      res = `${idCheckUtils.getTypeName(newItemByType)} details`;
    }

    return res;
  }

  renderForm() {
    const { hocs } = this.props;
    const { form } = hocs;

    if (!form) {
      return null;
    }

    return (
      <View>
        <Input
          formData={form}
          formKey="name"
          helper="Full name on licence"
          onChangeText={hocs.handleInput}
          color2
        />

        <Input
          formData={form}
          formKey="no"
          helper="Licence number"
          onChangeText={hocs.handleInput}
          color2
        />

        <Input
          formData={form}
          formKey="state"
          helper="State"
          onChangeText={hocs.handleInput}
          color2
        />
      </View>
    );
  }


  render() {
    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pT0]}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading32]}>
              {this.getTitle()}
            </Text>

            {this.renderForm()}
          </View>

          <Button
            block
            onPress={() => this.onSubmit()}
          >
            <Text>Submit</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

IdCheckDetails.defaultProps = {
  item: null,
  newItemByType: null,
};

IdCheckDetails.propTypes = {
  item: PropTypes.object,
  newItemByType: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.navigation.getParam('item'),
  newItemByType: ownProps.navigation.getParam('newItemByType'),
});

const res = composeHoc([
  hocNames.FORM,
])(IdCheckDetails);

export default connect(mapStateToProps)(res);
