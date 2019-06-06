
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  H3,
  Text,
} from 'native-base';

import SafeAreaView from 'src/Components/SafeAreaView';
import {
  sg,
} from 'src/Styles';

import CloseCircle from 'src/assets/images/CloseCircle.png';

import { article as styles } from './styles';

class ArticleModal extends Component {
  onRequestClose() {
    const { onRequestClose } = this.props;
    onRequestClose();
  }

  renderContent() {
    const { item } = this.props;

    if (!item) {
      return null;
    }

    const { article } = item;

    return (
      <View>
        {item.subhead && <Text style={[sg.textCenter, sg.fontMedium, sg.fS14, sg.colorGray11]}>{item.subhead}</Text>}
        <H3 style={[sg.fS24, sg.colorDark2, sg.textCenter, sg.aSCenter, sg.mT30, sg.width150, sg.width300]}>{item.headline}</H3>

        {Object.keys(article).map((key, index) => {
          const artItem = article[key];
          let res = null;

          switch (key) {
            case 'paragraph':
              res = <Text style={[sg.contentMarginH, sg.mT10]}>{artItem}</Text>;
              break;
            case 'image':
              res = (
                <View style={[sg.contentMarginH2, sg.mT15]}>
                  <Image source={{ uri: artItem.url }} resizeMode="contain" style={styles.image} />
                  {artItem.description && <Text style={[sg.mT10, sg.colorGray, sg.fS14]}>{artItem.description}</Text>}
                </View>
              );
              break;
            default:
              break;
          }

          res = <View key={index.toString()} style={[sg.mV10]}>{res}</View>;

          return res;
        })
        }
      </View>
    );
  }

  render() {
    const { visible } = this.props;

    return (
      <Modal
        animated
        visible={visible}
        onRequestClose={() => this.onRequestClose()}
        transparent
      >
        <SafeAreaView>
          <View style={[sg.backgroundDefault, sg.contentMarginV2]}>
            <View style={[sg.aIEnd, sg.mH35]}>
              <TouchableOpacity onPress={() => this.onRequestClose()}>
                <Image source={CloseCircle} />
              </TouchableOpacity>
            </View>
            {this.renderContent()}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

ArticleModal.defaultProps = {
  item: null,
  visible: false,
  onRequestClose: () => null,
};

ArticleModal.propTypes = {
  item: PropTypes.object,
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

export default ArticleModal;
