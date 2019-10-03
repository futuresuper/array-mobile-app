import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'src/Common/moment';

export class LiveClock extends Component {
  constructor(props) {
    super(props);
    const { format, utcOffset } = this.props;
    this.state = {
      time: moment().utcOffset(utcOffset).format(format),
    };
  }


  componentDidMount() {
    const { time, utcOffset, format } = this.props;
    this.clock = setInterval(() => {
      this.setState({
        time: time.utcOffset(utcOffset).format(format),
      });
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.clock);
  }

  render() {
    const { time } = this.state;
    const { style } = this.props;
    return (
      <Text style={style}>{time}</Text>
    );
  }
}

LiveClock.defaultProps = {
  utcOffset: 0,
  time: moment(),
  format: 'hh:mma',
  style: {},
};

LiveClock.propTypes = {
  time: PropTypes.object,
  utcOffset: PropTypes.number,
  format: PropTypes.string,
  style: PropTypes.object,
};

export default LiveClock;
