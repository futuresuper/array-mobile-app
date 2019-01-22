import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from '../../ui/Button';

export default class ApplicationType extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        smsCode: ''
      };
    }

    static navigationOptions = {
      title: 'Application Type',
    }

    handlePress(type) {
      console.log("Pressed Button: " + type);
    }

    render() {
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.h2}>
              What sort of account would you like to set up?
            </Text>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <Button
              text="Individual"
              onPress={() => this.handlePress("individual")}
            />
            <Button
              text="Joint"
              onPress={() => this.handlePress("joint")}
              secondary
            />
            <Button
              text="Adult for child"
              onPress={() => this.handlePress("adultForChild")}
              secondary
            />
            <View style={{ height: 100 }} />
          </KeyboardAvoidingView>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
  },
  input: {
    fontFamily: 'Lato',
    height: 40,
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 4,
  },
  h2: {
    fontFamily: 'Lato',
    fontSize: 17,
    fontWeight: "900",
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
});
