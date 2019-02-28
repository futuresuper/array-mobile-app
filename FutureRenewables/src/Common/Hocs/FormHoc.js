import React, { Component } from 'react';
import _ from 'lodash';

import {
  isEmail,
} from 'src/Common/Helpers';
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

    formIsValid = (showToast = true) => {
      const { screenProps } = this.props;
      let { form } = this.state;
      const formIsArray = (Array.isArray(form));
      let res = true;

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
        this.setState({
          form,
        });

        if (showToast) screenProps.toastDanger('Please enter valid values');
      }

      return res;
    }

    handleSubmit = () => {
    }

    handleInput = (value, formKey, dataKey = null) => {
      const { form } = this.state;
      const formIsArray = (Array.isArray(form));
      let inputItem;
      if (formIsArray) {
        inputItem = form[dataKey][formKey];
      } else {
        inputItem = form[formKey];
      }
      inputItem.value = value;

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
        const validation = validations[i];
        let isValid = true;

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
          default: {
            isValid = true;
          }
        }

        if (!isValid) {
          res.error = true;
          res.errorMessage = errorMessages[validation];

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
