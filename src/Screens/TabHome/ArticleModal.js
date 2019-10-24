import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Modal, ScrollView,
} from 'react-native';
import { H3, Text } from 'native-base';
import Video from 'react-native-video';
import SafeAreaView from 'src/Components/SafeAreaView';
import CloseButton from 'src/Components/CloseButton';
import { sg } from 'src/Styles';

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
        {item.subhead && (
          <Text style={[sg.fontMedium, sg.fS14, sg.colorGray11, sg.contentMarginH]}>
            {item.subhead}
          </Text>
        )}
        <H3
          style={[
            sg.fS24,
            sg.mT30,
            sg.contentMarginH,
            styles.header,
          ]}
        >
          {item.headline}
        </H3>

        {article.map((artItem, index) => {
          let res = null;
          const { contentType, content, description, url } = artItem;
          switch (contentType) {
            case 'paragraph':
              res = (
                <Text style={[sg.contentMarginH, sg.mT10, styles.paragraphStyles]}>{content}</Text>
              );
              break;
            case 'image':
              res = (
                <View style={[sg.contentMarginH2, sg.mT15]}>
                  <Image
                    source={{ uri: content }}
                    style={styles.image}
                    borderRadius={8}
                  />
                  {description && (
                    <Text style={[sg.mT15, sg.colorGray, sg.fS14]}>{description}</Text>
                  )}
                </View>
              );
              break;
            case 'video':
              res = (
                <Video
                  source={{ uri: url }} // Test with real response
                  style={sg.width100p}
                />
              );
              break;
            case 'heading':
              res = (
                <H3
                  style={[
                    sg.fS24,
                    sg.mT30,
                    sg.contentMarginH,
                    styles.header,
                  ]}
                >
                  {content}
                </H3>
              );
              break;
            default:
              break;
          }

          res = (
            <View key={index.toString()} style={[sg.mV10]}>
              {res}
            </View>
          );

          return res;
        })}
      </View>
    );
  }

  render() {
    const { visible, themeMode } = this.props;

    return (
      <Modal animated visible={visible} onRequestClose={() => this.onRequestClose()} transparent>
        <SafeAreaView themeMode={themeMode}>
          <ScrollView>
            <View style={[sg.contentMarginV2]}>
              <View style={[sg.aIEnd]}>
                <CloseButton themeMode={themeMode} white onPress={() => this.onRequestClose()} />
              </View>
              {this.renderContent()}
            </View>
          </ScrollView>
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
  themeMode: PropTypes.string.isRequired,
};

export default ArticleModal;
