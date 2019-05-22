
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
  Button,
  Grid,
  Col,
} from 'native-base';

import {
  Input,
} from 'src/Components/Form';
import BadgeCheckmark from 'src/Components/BadgeCheckmark';
import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import {
  routeNames,
} from 'src/Navigation';
import signUploginUtils from 'src/Common/signUpLogin';

import {
  sg,
} from 'src/Styles';

import { ArtistName as styles } from './styles';

class ArtistName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: {
          validations: [
            'required',
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

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo(routeNames.EMAIL, {
        accountType: signUploginUtils.ACCOUNT_TYPE.FEAT,
      });
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow]} bounces={false}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>Artist / Industry Participant Name</Text>

            <Input
              formData={form}
              formKey="name"
              helper="Artist / Band /  Industry name"
              onChangeText={hocs.handleInput}
            />

            <Grid style={[sg.mT60, sg.mB10]}>
              <Col style={[sg.flexNull, sg.mR20]}>
                <View style={styles.checkmarkContainer}>
                  <BadgeCheckmark
                    style={styles.checkmark}
                    styleTick={styles.checkmarkTick}
                  />
                </View>
              </Col>
              <Col>
                <Text style={sg.textBold}>Help promote FEAT & Array</Text>
                <Text>
                  It’s okay to list our artist name as one of the FEAT artists in launch communications
                </Text>
              </Col>
            </Grid>
          </View>

          <Button
            block
            onPress={() => this.handlePress()}
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(ArtistName);

export default connect()(res);
