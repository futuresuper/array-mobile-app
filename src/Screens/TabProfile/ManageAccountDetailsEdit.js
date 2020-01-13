
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  Input,
} from 'src/Components/Form';

import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import {
  sg,
} from 'src/Styles';

class ManageAccountDetailsEdit extends Component {
  componentDidMount() {
    this.setForm();
  }

  onUpdate() {
    const {
      hocs,
      onUpdate,
    } = this.props;

    const formIsValid = hocs.formIsValid();
    if (!formIsValid) {
      return;
    }

    onUpdate(hocs.form.field.value);
  }

  setForm() {
    const { hocs, value } = this.props;
    const form = {
      field: {
        value,
        validations: ['required'],
      },
    };

    hocs.setForm(form);
  }

  render() {
    const { title, hocs } = this.props;
    const { form } = hocs;

    return (
      <Content contentContainerStyle={[sg.flexGrow]} bounces={false} padder>
        <View style={[sg.flex, sg.spaceBetween]}>
          <View>
            <Input
              formData={form}
              formKey="field"
              helper={title}
              onChangeText={hocs.handleInput}
            />
          </View>

          <View style={[]}>
            <Button
              block
              style={sg.mV10}
              onPress={() => this.onUpdate()}
            >
              <Text>Update</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

ManageAccountDetailsEdit.defaultProps = {
  value: null,
};

ManageAccountDetailsEdit.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  onUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const title = ownProps.navigation.getParam('title');
  const value = ownProps.navigation.getParam('value');
  const onUpdate = ownProps.navigation.getParam('onUpdate');

  return {
    title,
    value,
    onUpdate,
  };
};


const res = composeHoc([
  hocNames.FORM,
])(ManageAccountDetailsEdit);

export default connect(mapStateToProps)(res);
