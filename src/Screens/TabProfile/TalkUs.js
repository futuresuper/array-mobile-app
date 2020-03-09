import React, { Component } from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

import { Icon } from 'native-base';
import BackButton from 'src/Components/BackButton';
import { sg } from 'src/Styles';

import { talkUs as styles } from './styles';

export default class TalkUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
    };

    this.isAutoLoadingMessages = false;
  }

  async componentDidMount() {
    try {
      const messages = await this.getMessages();
      this.setState({ messages });
    } catch (e) {
      // empty
    }

    this.startGetMessagesAuto();
  }

  componentWillUnmount() {
    this.stopGetMessagesAuto();
  }

  getMessages(spinner = true) {
    return new Promise((resolve, reject) => {
      const { screenProps } = this.props;
      screenProps.Api.get('/messages', {}, (resInp) => {
        const res = _.orderBy(resInp, ['date'], ['desc']);

        resolve(res);
      }, (err) => {
        reject(err);
      }, spinner);
    });
  }

  startGetMessagesAuto() {
    this.stopGetMessagesAuto();

    this.intervalMessages = setInterval(() => {
      if (this.isAutoLoadingMessages) {
        return;
      }

      this.isAutoLoadingMessages = true;

      this.getMessages(false).then((messages) => {
        this.setState({ messages });

        this.isAutoLoadingMessages = false;
      }).catch(() => {
        this.isAutoLoadingMessages = false;
      });
    }, 7000);
  }

  stopGetMessagesAuto() {
    if (this.intervalMessages) {
      clearInterval(this.intervalMessages);
    }
  }

  sendMessage() {
    const { screenProps } = this.props;
    const { message } = this.state;

    const messageDate = new Date();
    const msg = {
      message,
      date: messageDate,
      from: 'user',
    };

    this.setState((prevState) => ({
      message: '',
      messages: [
        msg,
        ...prevState.messages,
      ],
    }));


    screenProps.Api.post('/message', { message }, () => {
    }, () => {
      this.setState((prevState) => ({
        messages: prevState.messages.filter(({ date }) => date !== messageDate),
      }));
    }, false);
  }

  render() {
    const { messages, message } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <View style={styles.header}>
          <View style={styles.headerNav}>
            <BackButton
              header={false}
              style={{ ...sg.pL20, ...sg.pT20 }}
              iconStyle={sg.mL0}
              {...this.props}
            />
            <Text style={[sg.formHeading, sg.fS20, sg.pT20]}>
            Talk to Us
            </Text>
          </View>
          <View style={styles.headerMessage}>
            <Text>
              {"We're usually available 9-5 on weekdays"}
            </Text>
          </View>
        </View>
        <FlatList
          inverted
          style={styles.list}
          data={messages}
          keyExtractor={(item) => String(item.date)}
          renderItem={(msg) => {
            const { item } = msg;
            const inMessage = item.from === 'admin';
            const itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle]}>
                <View style={styles.balloon}>
                  <Text style={styles.baloonText}>{item.message}</Text>
                </View>
              </View>
            );
          }}
        />
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Write a message"
              value={message}
              underlineColorAndroid="transparent"
              onChangeText={(value) => this.setState({ message: value })}
              onSubmitEditing={() => this.sendMessage()}
            />
          </View>

          <TouchableOpacity style={styles.btnSend} onPress={() => this.sendMessage()}>
            <Icon type="Ionicons" name="md-send" style={styles.iconSend} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
