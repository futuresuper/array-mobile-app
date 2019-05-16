
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Animated,
} from 'react-native';
import {
  Content,
  Text,
  Button,
} from 'native-base';

import { BottomInfo, BottomInfoModal } from 'src/Components/BottomInfo';

import {
  sg,
} from 'src/Styles';

class AccountType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      visible: false,
    };
  }

  toggleHz() {
    this.BottomInfo.show();
  }

  render() {
    const { screenProps } = this.props;
    const { visible, bounceValue } = this.state;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, { paddingLeft: 0, paddingBottom: 0 }]} bounces={false}>
      <View style={[sg.spaceBetween]}>
        <View>
          <Text style={sg.formHeading}>
          Your account
          </Text>

          <Text>
          Who are you interested in setting an account up as?
          </Text>

        </View>

        <View>
          <Button
            onPress={() => {
              this.toggleHz();
            }}
          >
            <Text>vv</Text>
          </Button>

          {/* <Button
            onPress={() => {
              this.toggleHz();
            }}
          >
            <Text>modal</Text>
          </Button> */}

          <BottomInfo
            ref={(c) => {
              if (c) this.BottomInfo = c;
            }}
            // animation={false}
            // visible
          >
            <Text>body</Text>
          </BottomInfo>

            {/* <PanGestureHandler
              activeOffsetY={[-10, 10]}
              onGestureEvent={(e, ee, eee) => {
                // console.log('!!!', { e, ee, eee });
                console.log('!!!', {  });
              }}
            >
            <Animated.View style={[
              {
                height: this.state.bounceValue,
                overflow: 'hidden',
              backgroundColor: "#FFFFFF",
              },
            ]}>
              <Text>hhhh</Text>
              <Button
                onPress={() => {
                  this.toggleHz();
                }}
              >
                <Text>hh</Text>
              </Button>
            </Animated.View>
            </PanGestureHandler> */}
        </View>


      </View>
      </Content>
    );
  }
}

export default connect()(AccountType);
