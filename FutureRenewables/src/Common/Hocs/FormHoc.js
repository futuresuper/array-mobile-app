import React, { Component } from 'react';
import _ from 'lodash';

import CopyModuleHoc from './CopyModuleHoc';

const errorMessages = {
  required: 'field is required',
  email: 'must be a valid email address',
};

const fromKeys = {
  value: '',
  validations: [],
  error: false,
  errorMessage: '',
};

export default function FormHoc(WrappedComponent) {
  let Def = class Def extends Component {
    constructor(props) {
      super(props);

      this.state = {
        form: null,
      };
    }

    setForm = (formInp) => {
      const form = _.mapValues(formInp, (itemInp) => {
        let item = itemInp;
        item = { ...fromKeys, ...item };
        return item;
      });

      this.setState({
        form,
      });
    }

    formIsValid = () => {
      const { form } = this.state;

      _.forOwn(form, (item, key) => {
        if (
          item.validations
          && Array.isArray(item.validations)
          && item.validations.length
        ) {
          const isValid = this.inputIsValid(item);
					console.log('!!!: Def -> formIsValid -> isValid', isValid);
        }
      });

    }

    handleSubmit = () => {
      console.log('!!!z', this.state);
    }

    handleInput = (e, key) => {
      const { form } = this.state;
      this.setState({
        form: {
          ...form,
          [key]: {
            ...form[key],
            value: e,
          },
        },
      });
    }

    // eslint-disable-next-line class-methods-use-this
    inputIsValid(item) {
      const { validations, value } = item;
      let res = {
        error: true,
        errorMessage: '',
      };

      for (let i = 0; i < validations.length; i += 1) {
        const validation = validations[i];
        let isValid;

        switch (validation) {
          case 'required': {
            if (!value) {
              res.error = false;
              res.errorMessage = errorMessages[validation];
            }
            break;
          }
          case 'email': {
            isValid = false;
            break;
          }
          default: {
            isValid = true;
          }
        }

        console.log('!!!', validation,':', isValid);

        // return false;
      }

      return res;
    }

    render() {
      const { hocs, ...passThroughtProps } = this.props;
      const { form } = this.state;

      return (
        <WrappedComponent
          hocs={{
            ...hocs,
            form,
            handleSubmit: this.handleSubmit,
            handleInput: this.handleInput,
            setForm: this.setForm,
            formGetVal: this.formGetVal,
            formIsValid: this.formIsValid,
          }}
          {...passThroughtProps}
        />
      );
    }
  };

  Def = CopyModuleHoc(Def, WrappedComponent);

  return Def;
}
