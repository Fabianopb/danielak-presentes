import React from 'react';
import { WrappedFieldProps, WrappedFieldInputProps } from 'redux-form';
import _ from 'lodash';
import {
  Form,
  Input,
  InputProps,
  TextArea,
  TextAreaProps,
  Checkbox,
  CheckboxProps,
  Dropdown,
  DropdownProps,
} from 'semantic-ui-react';
import styles from './FormComponents.module.scss';

const hasErrored = (touched: boolean, errorMessage: string): boolean =>
  touched && !_.isUndefined(errorMessage);

interface FormInputProps extends WrappedFieldProps, InputProps {
  /** Wrapped field label */
  label?: string;
  /** Wrapped field input */
  input: WrappedFieldInputProps;
}

const FormInput = ({
  meta,
  required,
  formLabel,
  label,
  labelPosition,
  input,
  type,
  placeholder,
}: FormInputProps) => {
  const error = hasErrored(meta.touched, meta.error);
  return (
    <Form.Field error={error} required={required}>
      <label>{formLabel}</label>
      <Input
        label={label && { basic: true, content: label }}
        labelPosition={labelPosition}
        {...input}
        type={type}
        placeholder={placeholder}
      />
      <div className={styles.errorMessage}>{error && <span>{meta.error}</span>}</div>
    </Form.Field>
  );
};

interface FormTextAreaProps extends WrappedFieldProps, TextAreaProps {}

const FormTextArea = ({
  meta,
  required,
  formLabel,
  input,
  type,
  placeholder,
}: FormTextAreaProps) => {
  const error = hasErrored(meta.touched, meta.error);
  return (
    <Form.Field error={error} required={required}>
      <label>{formLabel}</label>
      <TextArea {...input} type={type} placeholder={placeholder} />
      <div className={styles.errorMessage}>{error && <span>{meta.error}</span>}</div>
    </Form.Field>
  );
};

interface FormCheckboxProps extends WrappedFieldProps, CheckboxProps {}

const FormCheckbox = ({ meta, required, input, formLabel, value }: FormCheckboxProps) => {
  const error = hasErrored(meta.touched, meta.error);
  return (
    <Form.Field error={error} required={required}>
      <Checkbox
        {...input}
        label={formLabel}
        checked={input.value || false}
        value={value}
        onChange={(_0, data) => input.onChange(data.checked)}
      />
    </Form.Field>
  );
};

interface FormDropdownProps extends WrappedFieldProps, DropdownProps {}

const FormDropdown = ({
  meta,
  required,
  formLabel,
  placeholder,
  input,
  options,
}: FormDropdownProps) => {
  const error = hasErrored(meta.touched, meta.error);
  return (
    <Form.Field error={error} required={required}>
      <label>{formLabel}</label>
      <Dropdown
        placeholder={placeholder}
        value={input.value}
        onChange={(_0, data) => input.onChange(data.value)}
        selection
        options={options}
      />
    </Form.Field>
  );
};

export { FormInput, FormTextArea, FormCheckbox, FormDropdown };
