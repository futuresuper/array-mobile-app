
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Image,
} from 'react-native';
import {
  Content,
  H3,
  Text,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import { article as styles } from './styles';

class Article extends Component {
  componentDidMount() {
    const { navigation, item } = this.props;

    navigation.setParams({
      title: item.subhead,
    });
  }

  render() {
    const { item } = this.props;
    const { article } = item;

    return (
      <Content padder>
        <H3 style={sg.mB10}>{item.headline}</H3>

        {Object.keys(article).map((key, index) => {
          const artItem = article[key];
          let res = null;

          switch (key) {
            case 'paragraph':
              res = <Text>{artItem}</Text>;
              break;
            case 'image':
              res = (
                <View>
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
      </Content>
    );
  }
}

Article.propTypes = {
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const item = ownProps.navigation.getParam('item', []);

  return {
    item,
  };
};

export default connect(mapStateToProps)(Article);
