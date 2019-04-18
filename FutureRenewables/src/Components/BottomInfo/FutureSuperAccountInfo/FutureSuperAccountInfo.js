
import React from 'react';
import {
  View,
} from 'react-native';
import {
  H2,
  Text,
  Button,
  Icon,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

const FutureSuperAccountInfo = () => (
  <View>
    <H2>What&apos;s a Future Super account?</H2>

    <Text style={[sg.mT10, sg.colorGray]}>
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

    <Button
      transparent
      dark
      block
      small
      iconRight
    >
      <Text>Learn more</Text>
      <Icon name="md-arrow-forward" style={sg.fS15} />
    </Button>
  </View>
);

export default FutureSuperAccountInfo;
