/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  mapValues, isNil, get, set,
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
        // added nested array forms functionality
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


    // ???
    addFormItem = (data) => {
      const { form } = this.state;
      const formIsArray = (Array.isArray(form));
      if (!formIsArray) return;

      form.push(data);

      this.setState(form);
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
      const formClone = { ...form };

      let inputItem;
      let targetArray;
      if (Array.isArray(formKey)) {
        targetArray = formKey;
      } else {
        targetArray = formKey.split('.');
      }

      inputItem = get(form, targetArray);

      if (typeItem === 'checkbox') {
        const checkedValue = !!inputItem.value;
        inputItem.value = !checkedValue;
      } else {
        inputItem.value = value;
      }

      inputItem = this.applyNormalizeFormat(inputItem, value);


      formClone[targetArray] = {
        ...inputItem,
      };


      this.setState({
        form: formClone,
      });
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


    /**
     * Function for adding new or updating existing form fields.
     *
     * @param {data} - Form object to add. It can be initialized as empty,
     *                 or contain regular form parameters.
     * @param {formKey} - A path domain to form location.
     *                    Accepts nested values ex. element.0 for now supports 1 depths max for now.
     * @param {format} - Single or Collection for multiple objects
     */
    addOrUpdateFormField = (data = {}, formKey = '', format = 'single') => {
      let completeData;
      let pathArray;
      if (Array.isArray(formKey)) {
        pathArray = formKey;
      } else {
        pathArray = formKey.split('.');
      }
      if (format === 'collection') {
        completeData = mapValues(data, value => this.attachFormKeys(value));
      } else {
        completeData = this.attachFormKeys(data);
      }
      this.updateFormState(pathArray, completeData);
    }


    /**
     * Function for updating dynamic key location
     */
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


    /**
     * Function for checking form validity.
     */
    formIsValid = () => {
      const { form } = this.state;
      let isValid = true;
      const validatedForm = mapValues(form, (field, key) => {
        // write more scalable way
        if (Array.isArray(field)) {
          const nestedForm = field.map((nForm, nKey) => {
            const nValidatedForm = mapValues(nForm, (nfField, nfKey) => {
              const nValidatedField = this.validateField(nfField, `${key}.${nKey}.${nfKey}`);
              if (nValidatedField.error) {
                isValid = false;
              }
              return nValidatedField;
            });
            return nValidatedForm;
          });
          return nestedForm;
        }
        const validatedField = this.validateField(field, key);
        if (validatedField.error) {
          isValid = false;
        }
        return validatedField;
      });
      this.setState({ form: validatedForm });

      return isValid;
    }

    /*
      Validates single field with custom or standard validators
    */
    validateField = (field, formKey) => {
      const element = field;

      element.validations.forEach((val) => {
        if (Array.isArray(val)) {
          const func = val[0];
          const errMsg = val[1];
          element.error = func(element.value, formKey);
          element.errorMessage = errMsg;
        }
        if (typeof val === 'function') {
          element.error = val(element.value, formKey);
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


    /**
     * Adds new validation array
     * @param {formKey} - key to location,
     * @param {validations} - new validations array
    */
    setFieldValidations = (formKey, validations) => {
      const { form } = this.state;
      const formClone = { ...form };
      let pathArray;

      if (Array.isArray(formKey)) {
        pathArray = formKey;
      } else {
        pathArray = formKey.split('.');
      }

      if (isNil(get(formClone, pathArray))) {
        return false;
      }

      if (!Array.isArray(validations)) {
        const err = `FormHoc.setFieldValidations, field "${formKey}": Wrong validation argument. Expected "Array" type`;
        throw err;
      }

      get(formClone, pathArray).validations = validations;


      this.setState({
        form: formClone,
      });

      return true;
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
            setForm: this.setForm,
            setFormFromObject: this.setFormFromObject,
            setFormValue: this.setFormValue,
            getFormAsObject: this.getFormAsObject,
            formGetVal: this.formGetVal,
            formIsValid: this.formIsValid,
            addFormItem: this.addFormItem,
            addOrUpdateFormField: this.addOrUpdateFormField,
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
