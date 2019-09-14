import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Content, Button, Text, Grid, Col,
} from 'native-base';

import { routeNames } from 'src/Navigation';
import { styleGlobal } from 'src/Styles';

import { formatFullDate } from 'src/Common/Helpers';

import composeHoc from 'src/Common/Hocs';
import moment from 'src/Common/moment';
import { Input } from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';

class DateOfBirth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        birthDate: {
          validations: ['required', [this.isDayValid, 'Day not valid'], [this.isMonthValid, 'Month not valid'], [this.isYearValid, 'Year not valid']],
          format: formatFullDate,
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  isDayValid = (valInp) => {
    const day = valInp.split('/')[0];

    if (!day) {
      return false;
    }

    const val = parseInt(day, 10);

    if (!day.match(/^\d+$/)) {
      return false;
    }

    if (val < 1 || val > 31) {
      return false;
    }

    return true;
  };

  isMonthValid = (valInp) => {
    const month = valInp.split('/')[1];

    if (!month) {
      return false;
    }

    const val = parseInt(month, 10);

    if (!month.match(/^\d+$/)) {
      return false;
    }

    if (val < 1 || val > 12) {
      return false;
    }

    return true;
  };

  isYearValid = (valInp) => {
    const year = valInp.split('/')[2];

    if (!year) {
      return false;
    }

    if (!year.match(/^\d+$/)) {
      console.log(year.match(/^\d+$/));
      return false;
    }

    if (year.length !== 3) {
      return false;
    }

    return true;
  };

  pad(num) {
    const s = `0${num}`;
    return s.substr(s.length - 2);
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    const birthday = hocs.form.birthDate.value;

    if (formIsValid) {
      const isEighteen = moment().diff(moment(birthday.split('/')[2], 'YYYY'), 'years') >= 18;

      if (!isEighteen) {
        screenProps.toastDanger('You must be over 18 to invest');
        return;
      }
      const birthDate = hocs.form.birthDate.value.replace(/\//g, '-');
      screenProps.Api.post(
        '/user',
        {
          birthDate,
        },
        () => {
          screenProps.navigateTo(routeNames.HOME_ADDRESS);
        },
        () => {
          screenProps.toastDanger('Error. Try again.');
        },
      );
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.flexGrow}>
        <View style={styleGlobal.spaceBetween}>
          <View>
            <Text style={[styleGlobal.formHeading, styleGlobal.mB50]}>Date of birth</Text>
            <Input
              formData={form}
              formKey="birthDate"
              placeholder="dd/mm/yyyy"
              maxLength={10}
              helper="Birth Date"
              onChangeText={hocs.handleInput}
              keyboardType="numeric"
            />
          </View>
          <KeyboardAvoidingView keyboardVerticalOffset={100}>
            <Button onPress={() => this.handlePress()} block>
              <Text>Next</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </Content>
    );
  }
}

const res = composeHoc(['FormHoc'])(DateOfBirth);

export default connect()(res);
