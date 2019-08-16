import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  Grid,
  Col,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import {
  styleGlobal,
} from 'src/Styles';

import composeHoc from 'src/Common/Hocs';
import moment from 'src/Common/moment';
import {
  Input,
} from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';

class DateOfBirth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        day: {
          validations: [
            'required',
            [this.isDayValid, 'Day not valid'],
          ],
          format: this.formayDay,
        },
        month: {
          validations: [
            'required',
            [this.isMonthValid, 'Month not valid'],
          ],
        },
        year: {
          validations: [
            'required',
            [this.isYearValid, 'Year not valid'],
          ],
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
    const val = parseInt(valInp, 10);

    if (!valInp.match(/^\d+$/)) {
      return false;
    }

    if (
      (val < 1)
      || (val > 31)
    ) {
      return false;
    }

    return true;
  }

  isMonthValid = (valInp) => {
    const val = parseInt(valInp, 10);

    if (!valInp.match(/^\d+$/)) {
      return false;
    }

    if (
      (val < 1)
      || (val > 12)
    ) {
      return false;
    }

    return true;
  }

  isYearValid = (valInp) => {
    if (!valInp.match(/^\d+$/)) {
      return false;
    }

    if (valInp.length !== 4) {
      return false;
    }

    return true;
  }

  pad(num) {
    const s = `0${num}`;
    return s.substr(s.length - 2);
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid({
      fieldError: true,
    });

    if (formIsValid) {
      const birthDate = `${hocs.form.year.value}-${this.pad(hocs.form.month.value)}-${this.pad(hocs.form.day.value)}`;
      const isEighteen = (moment().diff(birthDate, 'years') >= 18);

      if (!isEighteen) {
        screenProps.toastDanger('You must be over 18 to invest');
        return;
      }
      
      screenProps.Api.post('/user', {
        birthDate,
      }, () => {
        screenProps.navigateTo(routeNames.HOME_ADDRESS);
      }, () => {
        screenProps.toastDanger('Error. Try again.');
      });
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.flexGrow}>
        <View style={styleGlobal.spaceBetween}>
          <View>
            <Text style={[styleGlobal.formHeading, styleGlobal.mB50]}>
              Date of birth
            </Text>

            <Grid>
              <Col>
                <Input
                  formData={form}
                  formKey="day"
                  helper="Day"
                  onChangeText={hocs.handleInput}
                  keyboardType="numeric"
                />
              </Col>
              <Col style={styleGlobal.mH20}>
                <Input
                  formData={form}
                  formKey="month"
                  helper="Month"
                  onChangeText={hocs.handleInput}
                  keyboardType="numeric"
                />
              </Col>
              <Col>
                <Input
                  formData={form}
                  formKey="year"
                  helper="Year"
                  onChangeText={hocs.handleInput}
                  keyboardType="numeric"
                />
              </Col>
            </Grid>
          </View>
          <KeyboardAvoidingView keyboardVerticalOffset={100}>
            <Button
              onPress={() => this.handlePress()}
              block
            >
              <Text>Next</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(DateOfBirth);

export default connect()(res);
