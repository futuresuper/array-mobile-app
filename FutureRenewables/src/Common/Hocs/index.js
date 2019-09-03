
import {
  compose,
} from 'redux';
import hocNames from './hocNames';
import FormHoc from './FormHoc';
import SubscriptionHoc from './SubscriptionHoc';

export default function composeHoc(data) {
  const list = [];

  data.forEach((item) => {
    switch (item) {
      case hocNames.FORM:
        list.push(FormHoc);
        break;
      case hocNames.SUBSCRIPTION:
        list.push(SubscriptionHoc);
        break;
      default:
        break;
    }
  });

  if (list.length) {
    return compose(...list);
  }

  return null;
}

export {
  composeHoc,
  hocNames,
  FormHoc,
  SubscriptionHoc,
};
