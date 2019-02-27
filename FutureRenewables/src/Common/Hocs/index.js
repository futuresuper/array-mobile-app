
import {
  compose,
} from 'redux';
import FormHoc from './FormHoc';

export default function composeHoc(data) {
  const list = [];

  data.forEach((item) => {
    switch (item) {
      case 'FormHoc':
        list.push(FormHoc);
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
  FormHoc,
};
