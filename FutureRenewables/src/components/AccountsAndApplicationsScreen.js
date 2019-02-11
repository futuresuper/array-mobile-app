import React from 'react';
import { TouchableOpacity, FlatList, Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from './ui/Button';

export default class AccountsAndApplicationsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        smsCode: '',
        userData: {},
        userDataMock: {
          accounts: [
            {
              id: 74,
              owner_type: "individual",
              account_name: "Andrew Sellen",
              balance: "3000",
              status: "active",
            },
            {
              id: 26,
              owner_type: "joint",
              account_name: "Andrew Sellen and Melissa Sellen",
              status: "application",
            }
          ]
        },
      };
    };

    static navigationOptions = {
      title: 'Accounts and Applications',
    };

    async componentDidMount() {
      const url = "https://api.staging.futurerenewablesfund.com.au/api/v1/users/646"
      fetch(url, {
          method: 'GET',
          headers: {
          "Accept": "application/json",
          'Content-Type': "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMDlhMTA0MmZlYzQ0OWI1OWJlMjhlY2EyOTQ4MWYxMjdjZmQ1ZTNhNzA2NjRiN2I5MTQ1YzU2ZjJmZTM4OTlhOGU2MzQzZWUwMWU1MTYwIn0.eyJhdWQiOiI3IiwianRpIjoiOWUwOWExMDQyZmVjNDQ5YjU5YmUyOGVjYTI5NDgxZjEyN2NmZDVlM2E3MDY2NGI3YjkxNDVjNTZmMmZlMzg5OWE4ZTYzNDNlZTAxZTUxNjAiLCJpYXQiOjE1NDgxMTYyNDMsIm5iZiI6MTU0ODExNjI0MywiZXhwIjoxNTUwNzA4MjQzLCJzdWIiOiI2NDYiLCJzY29wZXMiOltdfQ.STByrW3c6Ha-neo5y3MxwbU1tMVpH8ajzXLGMj0n1nFv2C2IkLdaH5HxAYnilEFzXj-76JQXAK74QhdnUQtZLcLkpUh9UE7jLU112iooeGH76jTxPcwuEp2adnZoy8g13YD28HWJGn0IvKDtrPrhPuJt5YZIw81Pg75gG5UNgVm-tOUqbA_QklEqN2rXt0Q6i4gscRuxweejuZf9uObWkOyOT-pW3e2ys1clh2XegTRPUS9RoKN76SlJ7SMHchJ30EHp3S91ZEDCER6goAJ__y3yrxnHWDj0WzYOvI0dMfRQGq9h9fdtZpSa2DJrLVjwANcRGibpAUj1--RBcH8FksgoIJXGpaeuimM4bE6RjCLsh8sSA8KZDKX-s_1HFhIEaIKuOWzHi_nUJiRGLNmMDiRa-hKaNoJ-EmmdbiVH01G5k2HvFX8HFiIFGRKLMjamYLAyzysuY7yv4c9HbOzL8vOnPubtVm4NjJv1byKdnzEGqRtOdLA3s-HzLTuMDUpIUWO1WQdAPrLJLATMLIClCrjHs35gkMSEv-Qwxm9zM1zw1-6p8rZvtjCxI2j7ijmKCcESqXyNdOWBGdIZ9YCqkTkg8tGIUh6CyNjrc8pInoBAX0zh8mcGazpZn-N2De1ufN1Y_2LO_T3lONE3FYcOOwdlIxj-ccpB_5_w2557DB0",
          }
      })
      .then(response => {
        return response.json();
      })
      .then(userData => {
        this.setState({ "userData" : userData.data });
      })
      .catch(err => {
        console.log("Error: " + err);
      });
    };

    _keyExtractor = (item, index) => item.id.toString();

    render() {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.userDataMock.accounts}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.accountCard}
                onPress={() =>
                  (item.status === "active")
                  ? this.props.navigation.navigate('Feed')
                  : this.props.navigation.navigate('ApplicationType')
                }
              >
                <Text>Account Name: {item.account_name}</Text>
                <Text>Account Type: {item.owner_type}</Text>
                <Text>Balance: ${item.balance}</Text>
                <Text>Status: {item.status}</Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <View>
                <TouchableOpacity
                  style={styles.accountCard}
                  onPress={() => this.props.navigation.navigate('ApplicationType')}
                >
                  <Text>+ Start a new account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.accountCard}
                >
                  <Text>+ Open a Future Super account</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      );
    };

}

const styles = StyleSheet.create({
  accountCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "salmon",
  },
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
