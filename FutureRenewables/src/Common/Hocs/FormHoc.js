import React, { Component } from 'react';
import _ from 'lodash';

import {
  isEmail,
} from 'src/Common/Helpers';
import CopyModuleHoc from './CopyModuleHoc';

const errorMessages = {
  invalid: 'not a valid value',
  required: 'field is required',
  email: 'must be a valid email address',
  date: 'not a valid date',
};

const fromKeys = {
  value: '',
  valueDisplay: null,
  validations: [],
  normalize: null,
  format: null,
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
      let form;
      if (Array.isArray(formInp)) {
        form = formInp.map((formItem) => {
          const formTmp = _.mapValues(formItem, (itemInp) => {
            let item = itemInp;
            item = { ...fromKeys, ...item };
            return item;
          });

          return formTmp;
        });
      } else {
        form = _.mapValues(formInp, (itemInp) => {
          let item = itemInp;
          item = { ...fromKeys, ...item };
          return item;
        });
      }

      this.setState({
        form,
      });
    }

    addFormItem = (data) => {
      const { form } = this.state;
      const formIsArray = (Array.isArray(form));
      if (!formIsArray) return;

      form.push(data);

      this.setState(form);
    }

    formIsValid = (dataKeyInp = null, showToastInp = true) => {
      const options = this.formIsValidOptions(dataKeyInp, showToastInp);
      const {
        dataKey,
        showToast,
        fieldError,
      } = options;
      const { screenProps } = this.props;
      const { form: formOrig } = this.state;
      let res = true;
      let form;
      if (!_.isNil(dataKey)) form = formOrig[dataKey];
      else form = formOrig;
      const formIsArray = (Array.isArray(form));

      if (formIsArray) {
        for (let i = 0; i < form.length; i += 1) {
          const formTmp = form[i];
          const itemValid = this.formItemIsValid(formTmp);

          form[i] = itemValid.form;
          if (!itemValid.isValid) res = false;
        }
      } else {
        const itemValid = this.formItemIsValid(form);
        ({ form } = itemValid);
        res = itemValid.isValid;
      }

      if (!res) {
        let formNew;
        if (!_.isNil(dataKey)) {
          formNew = formOrig;
          formNew[dataKey] = form;
        } else {
          formNew = form;
        }

        this.setState({
          form: formNew,
        });

        if (showToast) {
          if (fieldError && !formIsArray) {
            screenProps.toastDanger(form[Object.keys(form)[0]].errorMessage);
          } else {
            screenProps.toastDanger('Please enter valid values');
          }
        }
      }

      return res;
    }

    handleSubmit = () => {
    }

    handleCheckBox = (formKey, dataKey = null) => {
      this.handleInput(null, formKey, dataKey, 'checkbox');
    }

    handleInput = (value, formKey, dataKey = null, typeItem = 'input') => {
      const { form } = this.state;
      const formIsArray = (Array.isArray(form));
      let inputItem;
      if (formIsArray) {
        inputItem = form[dataKey][formKey];
      } else {
        inputItem = form[formKey];
      }

      if (typeItem === 'checkbox') {
        const checkedValue = !!inputItem.value;
        inputItem.value = !checkedValue;
      } else {
        inputItem.value = value;
      }


      if (
        inputItem.normalize
        && (typeof inputItem.normalize === 'function')
      ) {
        inputItem.value = inputItem.normalize(value) || fromKeys.value;
      }

      if (
        inputItem.format
        && (typeof inputItem.format === 'function')
      ) {
        const valueFormat = inputItem.format(inputItem.value);
        inputItem.valueDisplay = !_.isNil(valueFormat) ? valueFormat : fromKeys.valueDisplay;
      }

      const validation = this.checkValidation(inputItem);

      if (formIsArray) {
        form[dataKey][formKey] = {
          ...inputItem,
          ...validation,
        };
      } else {
        form[formKey] = {
          ...inputItem,
          ...validation,
        };
      }

      this.setState({
        form,
      });
    }

    // eslint-disable-next-line class-methods-use-this
    formIsValidOptions(dataKey = null, showToast = true) {
      let options = {
        dataKey: null,
        showToast: true,
        fieldError: false,
      };

      if (typeof dataKey !== 'object') {
        options = {
          ...options,
          dataKey,
          showToast,
        };
      } else {
        options = {
          ...options,
          ...dataKey,
        };
      }

      return options;
    }

    formItemIsValid(formInp) {
      const form = formInp;
      const res = {
        isValid: true,
        form,
      };

      _.forOwn(form, (item, key) => {
        if (
          item.validations
          && Array.isArray(item.validations)
          && item.validations.length
        ) {
          const validation = this.checkValidation(item);
          if (validation.error) {
            res.form[key] = {
              ...form[key],
              ...validation,
            };

            res.isValid = false;
          }
        }
      });

      return res;
    }

    // eslint-disable-next-line class-methods-use-this
    checkValidation(item) {
      const { validations, value } = item;
      const res = {
        error: false,
        errorMessage: '',
      };

      for (let i = 0; i < validations.length; i += 1) {
        let errorMessage;
        let validation;
        let isValid = true;
        const validationItem = validations[i];
        const validationIsArray = Array.isArray(validationItem);

        if (validationIsArray) {
          [validation, errorMessage] = validationItem;
        } else {
          validation = validationItem;
        }

        const validationIsFunction = (typeof validation === 'function');

        if (validationIsFunction) {
          res.errorMessage = errorMessage || errorMessages.invalid;

          isValid = validation(value);
        } else {
          res.errorMessage = errorMessage || errorMessages[validation] || errorMessages.invalid;

          switch (validation) {
            case 'required': {
              if (!value) {
                isValid = false;
              }
              break;
            }
            case 'email': {
              isValid = isEmail(value);
              break;
            }
            case 'date': {
              isValid = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
              isValid = !!isValid;

              break;
            }
            default: {
              isValid = true;
            }
          }
        }

        if (!isValid) {
          res.error = true;

          return res;
        }
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
            handleCheckBox: this.handleCheckBox,
            setForm: this.setForm,
            formGetVal: this.formGetVal,
            formIsValid: this.formIsValid,
            addFormItem: this.addFormItem,
          }}
          {...passThroughtProps}
        />
      );
    }
  };

  Def = CopyModuleHoc(Def, WrappedComponent);

  return Def;
}
