
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
} from 'react-native';
import {
  Button,
  Icon,
  Grid,
  List,
  ListItem,
  Left,
  Right,
  Row,
  Col,
  Body,
  Thumbnail,
  Text,
} from 'native-base';

import {
  accountsSelector,
} from 'src/Redux/AppContent';

import {
  routeNames,
} from 'src/Navigation';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';
import TextUnderline from 'src/Components/TextUnderline';
import {
  sg,
} from 'src/Styles';

import styles from './styles';

class AccountsInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          name: 'Hugh Jackman',
          //image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/World_Premiere_Logan_Berlinale_2017.jpg/220px-World_Premiere_Logan_Berlinale_2017.jpg',
          active: true,
        },
        {
          name: 'Cate Blanchett',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Cate_Blanchett_Deauville_2013_3.jpg/176px-Cate_Blanchett_Deauville_2013_3.jpg',
          active: false,
        },
      ],
    };
  }

  renderAccounts() {
      const { accounts, screenProps } = this.props;

      return accounts.map((account) => {
        
        return (
            <ListItem
              button
              noIndent
              key={account.id}
              onPress={() => {
                // Navigate to the Home screen with the selected Account Active
                // PK2 is the Account ID
                screenProps.navigateTo(routeNames.TAB_HOME, {
                  accountId: account.id,
                });

              }}
              style={[sg.pL0, sg.pT25, sg.pB25, sg.pR35]}
            >
              <Body>

                <Grid>
                  <Row>
                    <Col style={[sg.flexNull]}>

                      <Text style={[sg.mL0, sg.mB10, sg.fS20, sg.textBold]} color2>{account.nickName}</Text>

                      {account.status === 'unitsIssued' && account.balance && (
                        <Text style={[sg.mL0, sg.fS16]} color4>
                          Balance:&nbsp;
                          <Text color4>
                            {formatAmountDollarCent(account.balance)}
                          </Text>
                        </Text>
                      )}

                    </Col>
                    <Col style={[sg.jCCenter, sg.aIEnd]}>
                      <Icon name="ios-arrow-forward" style={sg.fS20} />
                    </Col>
                  </Row>

                </Grid>

              </Body>
            </ListItem>
          );

      });

  }

  render() {
    const { screenProps } = this.props;
    const { superAccount } = this.props;
    const { list } = this.state;

    return (
      <View style={sg.mH5}>
        <List>
          { this.renderAccounts() }
          {/*
          <FlatList
            data={list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListItem noIndent style={[styles.listItem, (index === 0 ? sg.pT0 : {})]}>
                <Left style={[sg.flexNull]}>
                  <Thumbnail source={{ uri: item.image }} style={styles.thumbnail} />
                </Left>
                <Body>
                  <Text style={[sg.fontMedium, sg.fS20, sg.colorDark2, sg.mL20]}>{item.name}</Text>
                </Body>
                <Right style={[sg.flexNull, sg.width30]}>
                  <BadgeCheckmark inverted checked={item.active} style={sg.aSEnd} />
                </Right>
              </ListItem>
            )}
          />
          */}
        </List>

        <View style={[sg.mT30, sg.mH10]}>
          <Button
            block
            iconRight
          >
            <Text>Add account</Text>
            <Icon name="add" />
          </Button>

          {superAccount && (
            <View>
              <Button
                transparent
                bordered
                dark
                block
                style={sg.mT15}
              >
                <Text>Future Super Account</Text>
              </Button>

              <TextUnderline style={[sg.mT25]}>What&apos;s a Future Super Account?</TextUnderline>
            </View>
          )}
        </View>
      </View>
    );
  }
}

AccountsInfo.defaultProps = {
  superAccount: true,
};

AccountsInfo.propTypes = {
  superAccount: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const accounts = accountsSelector(state);

  return {
    accounts,
  };
};

export default connect(mapStateToProps)(AccountsInfo);
// export default AccountsInfo;
