/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
  Item,
  Button,
} from 'native-base';

import {
  Input,
  Picker,
} from 'src/Components/Form';
import TextUnderline from 'src/Components/TextUnderline';
import Br from 'src/Components/Br';
import TextQuestion from 'src/Components/TextQuestion';
import BottomInfo from 'src/Components/BottomInfo';

import {
  routeNames,
} from 'src/Navigation';

import {
  formatAmountDollar,
  normalizeAmount,
} from 'src/Common/Helpers';
import composeHoc from 'src/Common/Hocs';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      segment: {
        isSpecificAmount: true,
        isWholeBalance: false,
      },
      form: {
        amount: {
          validations: [
            'required',
          ],
          normalize: normalizeAmount,
          format: formatAmountDollar,
        },
        from: {
          validations: [
            'required',
          ],
        },
        into: {
          validations: [
            'required',
          ],
        },
      },
      accountList: [
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 0981928',
        },
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 222',
        },
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 333',
        },
      ],
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  segmentSpecificAmount = () => {
    this.setState({
      segment: {
        isSpecificAmount: true,
        isWholeBalance: false,
      },
    });
  }

  segmentWholeBalance = () => {
    this.setState({
      segment: {
        isSpecificAmount: false,
        isWholeBalance: true,
      },
    });
  }

  onNext = () => {
    const { hocs, screenProps } = this.props;
    const formIsValid = hocs.formIsValid();

    if (formIsValid) {
      // screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW_DONE);
    }
  }

  onNotifyWithdraw = () => {
    const { navigation } = this.props;
    navigation.popToTop();
  }

  render() {
    return (
      <Content padder contentContainerStyle={[sg.flexGrow]}>
        <View style={sg.spaceBetween}>
          <View>
            <Text>
              There is no current open ‘Withdrawal Offer’.
            </Text>
            {/*
            <TextQuestion
              text="There is no current open ‘Withdrawal Offer’."
              onPress={() => {
                BottomInfo.showWithdraw();
              }}
            />
            */}
          </View>
        </View>

        {/*
        <Button
          block
          onPress={this.onNotifyWithdraw}
        >
          <Text>Notify me when I can withdraw</Text>
        </Button>
        */}
      </Content>
    );

    // const { hocs } = this.props;
    // const { form } = hocs;
    // const { accountList, segment } = this.state;

    // return (
    //   <Content padder contentContainerStyle={[sg.flexGrow]}>
    //     <View style={sg.spaceBetween}>
    //       <View>
    //         <View style={[sg.row]}>
    //           <Br style={[sg.footerBl]} />

    //           <Button
    //             transparent
    //             onPress={this.segmentSpecificAmount}
    //             style={[sg.mT0, sg.pT0, sg.heightNull]}
    //           >
    //             <Text style={[styles.tabTextActive, (!segment.isSpecificAmount ? styles.tabText : {})]}>Specific Amount</Text>
    //           </Button>

    //           <Button
    //             transparent
    //             onPress={this.segmentWholeBalance}
    //             style={[sg.mT0, sg.pT0, sg.heightNull]}
    //           >
    //             <Text style={[styles.tabTextActive, sg.mL10, (!segment.isWholeBalance ? styles.tabText : {})]}>Whole Balance</Text>
    //           </Button>
    //         </View>


    //         <Input
    //           formData={form}
    //           formKey="amount"
    //           onChangeText={hocs.handleInput}
    //           keyboardType="numeric"
    //           style={[sg.fS24]}
    //           color2
    //           componentRight={<Text color4>Available: $2,901.50</Text>}
    //         />

    //         <Item
    //           style={[sg.noBorder]}
    //         >
    //           <Picker
    //             formData={form}
    //             formKey="from"
    //             label="From"
    //             title="Liv"
    //             list={accountList}
    //             renderItem={({ item }) => (
    //               <View>
    //                 <Text style={sg.pickerItemText}>{item.name}</Text>
    //                 <Text style={sg.pickerItemText2}>{item.number}</Text>
    //               </View>
    //             )}
    //             onPressItem={({ item }, formKey, dataKey) => {
    //               hocs.handlePicker(item.number, formKey, dataKey);
    //               hocs.setFormTitle(item.number, formKey, dataKey);
    //             }}
    //           />
    //         </Item>

    //         <Item
    //           style={[sg.noBorder]}
    //         >
    //           <Picker
    //             formData={form}
    //             formKey="into"
    //             label="Into"
    //             title="ING account"
    //             list={accountList}
    //             renderItem={({ item }) => (
    //               <View>
    //                 <Text style={sg.pickerItemText}>{item.name}</Text>
    //                 <Text style={sg.pickerItemText2}>{item.number}</Text>
    //               </View>
    //             )}
    //             onPressItem={({ item }, formKey, dataKey) => {
    //               hocs.handlePicker(item.number, formKey, dataKey);
    //               hocs.setFormTitle(item.number, formKey, dataKey);
    //             }}
    //           />
    //         </Item>

    //         <Text style={[sg.mT30]}>
    //           Withdrawal offers are currently
    //           &nbsp;
    //           <Text style={sg.textBold}>open</Text>
    //           .
    //           For more info on how withdrawls work,
    //         </Text>
    //         <TextUnderline
    //           theme2
    //           style={[sg.aSStart]}
    //           styleText={[sg.fS16]}
    //         >
    //           read more here.
    //         </TextUnderline>

    //       </View>
    //     </View>
    //   </Content>
    // );
  }
}

const res = composeHoc([
  'FormHoc',
])(Withdraw);

export default connect()(res);
