
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  Icon,
  Col,
  Grid,
} from 'native-base';

class ListLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { navigateTo, data } = this.props;
    const { visible } = this.state;

    if (!visible) return null;

    return (
      <View
        style={{
          position: 'absolute', bottom: 10, right: 0, left: 0,
        }}
      >
        <Grid>
          <Col style={{ flex: 0.2 }}>
            <Button
             small
             transparent
             onPress={() => this.hide()}
            >
              <Icon name={'close'} />
            </Button>
          </Col>
          <Col style={{ flex: 0.8 }}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigateTo(item.screen);
              }}
            >
              <Text style={{ color: 'black' }}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          </Col>
        </Grid>
      </View>
    );
  }
}

ListLinks.propTypes = {
  data: PropTypes.array.isRequired,
  navigateTo: PropTypes.func.isRequired,
};

export default ListLinks;
