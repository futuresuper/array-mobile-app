
import React from 'react';
import {
  View,
} from 'react-native';
import {
  H2,
  Text,
  Button,
} from 'native-base';

import TextUnderline from 'src/Components/TextUnderline';

import {
  sg,
} from 'src/Styles';

const FutureSuperAccountInfo = () => (
  <View style={[sg.aICenter, sg.mH15]}>
    <H2 style={[sg.fS20, sg.colorDark2, sg.textCenter]}>
      What&apos;s a Future Super
      {'\n'}
      account?
    </H2>

    <Text style={[sg.mT15, sg.textCenter]}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
    </Text>

    <Button
      transparent
      bordered
      dark
      block
      style={[sg.mV20]}
    >
      <Text>Start one now</Text>
    </Button>

    <TextUnderline>
      Learn more
    </TextUnderline>
  </View>
);

export default FutureSuperAccountInfo;
