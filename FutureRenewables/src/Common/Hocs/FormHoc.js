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
  title: null,
  validations: [],
  normalize: null,
  format: null,
  error: false,
  errorMessage: '',
};

export default function FormHoc(WrappedComponent) {
  const Def = class Def extends Component {
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

            item = this.applyNormalizeFormat(item);

            return item;
          });

          return formTmp;
        });
      } else {
        form = _.mapValues(formInp, (itemInp) => {
          let item = itemInp;
          item = { ...fromKeys, ...item };

          item = this.applyNormalizeFormat(item);

          return item;
        });
      }

      return new Promise((resolve) => {
        this.setState({
          form,
        }, resolve);
      });
    }

    setFormFromObject(data) {
      const form = {};

      Object.keys(data).forEach((key) => {
        const value = data[key];

        form[key] = {
          value,
          validations: [
            'reduired',
          ],
        };
      });

      return this.setForm(form);
    }

    getFormAsObject = () => {
      const { form } = this.state;
      const res = {};

      Object.keys(form).forEach((key) => {
        const item = form[key];

        res[key] = item.value;
      });

      return res;
    }

    setFormFieldValue = (value, field, dataKey = null, fieldProp = 'value') => {
      const { form } = this.state;
      const formIsArray = (Array.isArray(form));
      if (formIsArray) {
        if (dataKey && form[dataKey]) {
          form[dataKey][field][fieldProp] = value;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (form[field]) {
          form[field][fieldProp] = value;
        }
      }

      this.setState({
        form,
      });
    }

    setFormValue = (value, field, dataKey = null) => {
      this.setFormFieldValue(value, field, dataKey);
    };

    setFormTitle = (value, field, dataKey = null) => {
      this.setFormFieldValue(value, field, dataKey, 'title');
    };

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
            const errorKeys = Object.keys(form).filter(item => form[item].error);
            const { errorMessage } = form[errorKeys[0]];

            screenProps.toastDanger(errorMessage);
          } else {
            screenProps.toastDanger('Please enter valid values');
          }
        }
      }

      return res;
    }

    handleSubmit = () => {
    }

    handlePicker = (value, formKey, dataKey = null) => {
      this.handleInput(value, formKey, dataKey);
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


      // if (
      //   inputItem.normalize
      //   && (typeof inputItem.normalize === 'function')
      // ) {
      //   inputItem.value = inputItem.normalize(value) || fromKeys.value;
      // }

      // if (
      //   inputItem.format
      //   && (typeof inputItem.format === 'function')
      // ) {
      //   const valueFormat = inputItem.format(inputItem.value);
      //   inputItem.valueDisplay = !_.isNil(valueFormat) ? valueFormat : fromKeys.valueDisplay;
      // }

      inputItem = this.applyNormalizeFormat(inputItem, value);

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

    setFieldValidations = (formKey, validations) => {
      const { form } = this.state;
      const formIsArray = (Array.isArray(form));
      if (formIsArray) {
        return false;
      }

      if (_.isNil(form[formKey])) {
        return false;
      }

      if (!Array.isArray(validations)) {
        const err = `FormHoc.setFieldValidations, field "${formKey}": Wrong validation argument. Expected "Array" type`;
        throw err;
      }

      form[formKey].validations = validations;

      this.setState({
        form,
      });

      return true;
    }

    setFieldNormalize = (formKey, value) => this.setFieldKey(formKey, 'normalize', value);

    setFieldFormat = (formKey, value) => this.setFieldKey(formKey, 'format', value);

    setFieldKey = (formKey, formFieldKey, formFieldValue) => {
      const { form } = this.state;
      const formIsArray = (Array.isArray(form));
      if (formIsArray) {
        return false;
      }

      if (_.isNil(form[formKey])) {
        return false;
      }

      form[formKey][formFieldKey] = formFieldValue;

      this.setState({
        form,
      });

      return true;
    }

    applyNormalizeFormat(inputItemInp, valueInp = null) {
      const inputItem = inputItemInp;
      const value = !_.isNil(valueInp) ? valueInp : inputItem.value;

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

      return inputItem;
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
      const { hocs, forwardedRef, ...passThroughtProps } = this.props;
      const { form } = this.state;

      return (
        <WrappedComponent
          hocs={{
            ...hocs,
            form,
            handleSubmit: this.handleSubmit,
            handleInput: this.handleInput,
            handleCheckBox: this.handleCheckBox,
            handlePicker: this.handlePicker,
            setForm: this.setForm,
            setFormFromObject: this.setFormFromObject,
            setFormValue: this.setFormValue,
            setFormTitle: this.setFormTitle,
            getFormAsObject: this.getFormAsObject,
            formGetVal: this.formGetVal,
            formIsValid: this.formIsValid,
            addFormItem: this.addFormItem,
            setFieldValidations: this.setFieldValidations,
            setFieldNormalize: this.setFieldNormalize,
            setFieldFormat: this.setFieldFormat,
          }}
          {...passThroughtProps}
          ref={forwardedRef}
        />
      );
    }
  };

  // eslint-disable-next-line react/no-multi-comp
  const DefRef = React.forwardRef((props, ref) => <Def {...props} forwardedRef={ref} />);

  return CopyModuleHoc(DefRef, WrappedComponent);
}
