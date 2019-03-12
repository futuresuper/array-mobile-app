
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Dialog from 'react-native-dialog';

export default class Alert extends Component {
  constructor(props) {
    super(props);

    this.optionsDef = {
      title: '',
      body: '',
    };

    this.state = {
      dialogVisible: false,
      options: this.optionsDef,
    };
  }

  showDialog = (options) => {
    this.setState({
      dialogVisible: true,
      options: {
        ...this.optionsDef,
        ...options,
      },
    });
  };

  handleOK = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    const {
      dialogVisible,
      options,
    } = this.state;
    const {
      title,
      body,
    } = options;

    return (
      dialogVisible
      && (
        <View>
          <Dialog.Container visible>
            {title && <Dialog.Title>{title}</Dialog.Title>}
            {body
              && (
                <Dialog.Description>
                  {body}
                </Dialog.Description>
              )
            }
            <Dialog.Button label="OK" onPress={this.handleOK} />
          </Dialog.Container>
        </View>
      )
    );
  }
}
