import React, { Component } from 'react';
import CopyModuleHoc from './CopyModuleHoc';

export default function SubscriptionHoc(WrappedComponent) {
  let Def = class Def extends Component {
    constructor(props) {
      super(props);
      this.subs = [];
      this.addListener = this.addListener.bind(this);
    }

    componentWillUnmount() {
      this.subs.forEach((sub) => {
        sub.remove();
      });
    }

    addListener(name, func) {
      const { navigation } = this.props;

      this.subs.push(
        navigation.addListener(name, func),
      );
    }

    render() {
      const { hocs, ...passThroughProps } = this.props;

      return (
        <WrappedComponent
          hocs={{
            ...hocs,
            addListener: this.addListener,
          }}
          {...passThroughProps}
        />
      );
    }
  };

  Def = CopyModuleHoc(Def, WrappedComponent);

  return Def;
}
