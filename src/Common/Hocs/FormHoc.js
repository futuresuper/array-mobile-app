/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  mapValues, isNil, forOwn, get, uniq, map,
} from 'lodash';

import {
  isEmail,
} from 'src/Common/Helpers';
import CopyModuleHoc from './CopyModuleHoc';

const errorValidators = {
  invalid: {
    text: 'This is not a valid value',
  },
  required: {
    text: 'This field is required',
    validatorMethod(value) {
      if (value) {
        return false;
      }
      return true;
    },
  },
  email: {
    text: 'This must be a valid email address',
    validatorMethod(value) {
      if (isEmail(value)) {
        return false;
      }
      return true;
    },
  },
  date: {
    text: 'This is not a valid date',
    validatorMethod(value) {
      if (value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {
        return false;
      }
      return true;
    },
  },
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
      state = {
        formError: false,
        form: null,
      };

    setForm = (obj) => {
      const form = mapValues(obj, (i) => {
        // added nested forms functionality
        if (Array.isArray(i)) {
          const arrayElement = i.map(element => mapValues(element, ei => this.attachFormKeys(ei)));
          return arrayElement;
        }
        let formItem = this.attachFormKeys(i);
        formItem = this.applyNormalizeFormat(formItem);
        return formItem;
      });


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

    attachFormKeys = obj => (
      { ...fromKeys, ...obj }
    )

    getFormAsObject = () => {
      const { form } = this.state;
      const res = {};

      Object.keys(form).forEach((key) => {
        const item = form[key];

        res[key] = item.value;
      });

      return res;
    }

    setFormFieldValue = (value, field, fieldProp = 'value') => {
      const { form } = this.state;
      form[field][fieldProp] = value;
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


    // ???
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
      if (!isNil(dataKey)) form = get(formOrig, dataKey);
      else form = formOrig;


      const itemValid = this.formItemIsValid(form);

      ({ form } = itemValid);
      res = itemValid.isValid;

      if (!res) {
        let formNew;
        if (!isNil(dataKey)) {
          formNew = formOrig;
          formNew[dataKey] = form;
        } else {
          formNew = form;
        }

        this.setState({
          form: formNew,
        });

        if (showToast) {
          if (fieldError) {
            const errorKeys = Object.keys(form).filter(item => form[item].error);
            const { errorMessage } = form[errorKeys[0]];

            screenProps.toastDanger(errorMessage);
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
      let inputItem;
      inputItem = get(form, formKey.split('.'));

      if (typeItem === 'checkbox') {
        const checkedValue = !!inputItem.value;
        inputItem.value = !checkedValue;
      } else {
        inputItem.value = value;
      }

      // ??
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
      //   inputItem.valueDisplay = !isNil(valueFormat) ? valueFormat : fromKeys.valueDisplay;
      // }

      inputItem = this.applyNormalizeFormat(inputItem, value);

      const validation = this.checkValidation(inputItem);

      form[formKey] = {
        ...inputItem,
        ...validation,
      };


      this.setState({
        form,
      });
    }

    setFieldValidations = (formKey, validations) => {
      const { form } = this.state;

      if (isNil(form[formKey])) {
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

      if (isNil(get(form, formKey.split('.')))) {
        return false;
      }

      get(form, formKey)[formFieldKey] = formFieldValue;

      this.setState({
        form,
      });

      return true;
    }

    applyNormalizeFormat(inputItemInp, valueInp = null) {
      const inputItem = inputItemInp;
      const value = !isNil(valueInp) ? valueInp : inputItem.value;

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
        inputItem.valueDisplay = !isNil(valueFormat) ? valueFormat : fromKeys.valueDisplay;
      }

      return inputItem;
    }

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

      forOwn(form, (item, key) => {
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
          res.errorMessage = errorMessage || errorValidators.invalid.text;

          isValid = validation(value);
        } else {
          res.errorMessage = errorMessage || errorValidators[validation].text || errorValidators.invalid.text;

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


    /**
     * Function for adding new or updating existing form fields.
     *
     * @param {data} - Form object to add. It can be initialized as empty,
     *                 or contain regular form parameters. Supports arrays.
     * @param {formKey} - A path domain to form location.
     *                    Accepts nested values ex. element.0 for now supports 1 depths max for now.
     */
    addOrUpdateFormField = (data = {}, formKey = '') => {
      const completeData = mapValues(data, value => this.attachFormKeys(value));
      const pathArray = formKey.split('.');
      this.updateFormState(pathArray, completeData);
    }


    // update dynamic key location
    updateFormState(pathArray, data) {
      const { form } = this.state;
      const formClone = { ...form };

      const nestedObject = pathArray
        .slice(0, -1)
        .reduce((object, part) => (object === undefined ? undefined : object[part]), formClone);

      if (nestedObject !== undefined) {
        // Obtain last key in path
        const [pathTail] = pathArray.slice(-1);

        // Update value of last key on target object to new value
        nestedObject[pathTail] = data;
      }

      this.setState({ form: formClone });
    }

    formIsValid2 = () => {
      const { form } = this.state;
      let isValid = true;
      const validatedForm = mapValues(form, (field) => {
        // write more scalable way
        if (Array.isArray(field)) {
          const nestedForm = field.map((nForm) => {
            const nValidatedForm = mapValues(nForm, (nfField) => {
              const nValidatedField = this.validateField(nfField);
              if (nValidatedField.error) {
                isValid = false;
              }
            });
            return nValidatedForm;
          });
          return nestedForm;
        }
        const validatedField = this.validateField(field);
        if (validatedField.error) {
          isValid = false;
        }
        return validatedField;
      });
      this.setState({ form: validatedForm });

      return isValid;
    }

    /* Validates single field with custom or standard validators */
    validateField = (field) => {
      const element = field;

      element.validations.forEach((val) => {
        if (typeof val === 'function') {
          element.error = val(element.value);
          element.errorMessage = errorValidators.invalid.text;
        }
        mapValues(errorValidators, (e, k) => {
          if (k === val) {
            element.error = e.validatorMethod(element.value);
            element.errorMessage = e.text;
          }
        });
      });
      return element;
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
            addOrUpdateFormField: this.addOrUpdateFormField,
            setFieldValidations: this.setFieldValidations,
            setFieldNormalize: this.setFieldNormalize,
            setFieldFormat: this.setFieldFormat,
            formIsValid2: this.formIsValid2,
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
