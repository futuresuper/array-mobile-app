import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import { Icon } from 'native-base';
import BackButton from 'src/Components/BackButton';
import { sg, sc } from 'src/Styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sc.color.containerBgColor,
  },
  header: {
    flex: 0.35,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMessage: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  list: {
    flex: 0.65,
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#CDC8CC',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    color: sc.color.primary,
  },
  inputContainer: {
    borderBottomColor: '#CDC8CC',
    backgroundColor: '#CDC8CC',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#CDC8CC',
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 8,
    borderRadius: 20,
  },
  baloonText: {
    color: '#FFFF',
  },
  itemIn: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 5,
    backgroundColor: '#6A608C',
  },
  itemOut: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 20,
    backgroundColor: '#292049',
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
});


export default class TalkUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1, type: 'in', message: "Hello I'd like some help",
        },
        {
          id: 2, type: 'out', message: 'Hey there. No worries, my name is James. What can I do for you?',
        },
      ],
    };
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
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
          style={styles.list}
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={(message) => {
            const { item } = message;
            const inMessage = item.type === 'in';
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
              underlineColorAndroid="transparent"
              onChangeText={(name_address) => this.setState({ name_address })}
            />
          </View>

          <TouchableOpacity style={styles.btnSend}>
            <Icon type="Ionicons" name="md-send" style={styles.iconSend} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
