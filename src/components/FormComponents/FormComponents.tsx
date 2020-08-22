import React from 'react';
import { WrappedFieldProps, WrappedFieldInputProps } from 'redux-form';
import _ from 'lodash';
import { Form, Input, InputProps, TextArea, TextAreaProps, Checkbox, CheckboxProps, Dropdown, DropdownProps } from 'semantic-ui-react';
import styles from './FormComponents.module.scss';

const hasErrored = (touched: boolean, errorMessage: string): boolean => (touched && !_.isUndefined(errorMessage));

interface FormInputProps extends WrappedFieldProps, InputProps {
  /** Wrapped field label */
  label?: string;
  /** Wrapped field input */
  input: WrappedFieldInputProps;
}

const FormInput = (props: FormInputProps) => {
  const error = hasErrored(props.meta.touched, props.meta.error);
  return (
    <Form.Field error={error} required={props.required} >
      <label>{props.formLabel}</label>
      <Input
        label={props.label && { basic: true, content: props.label }}
        labelPosition={props.labelPosition}
        {...props.input}
        type={props.type}
        placeholder={props.placeholder}
      />
      <div className={styles.errorMessage}>{error && <span>{props.meta.error}</span>}</div>
    </Form.Field>
  );
};

interface FormTextAreaProps extends WrappedFieldProps, TextAreaProps {}

const FormTextArea = (props: FormTextAreaProps) => {
  const error = hasErrored(props.meta.touched, props.meta.error);
  return (
    <Form.Field error={error} required={props.required} >
      <label>{props.formLabel}</label>
      <TextArea {...props.input} type={props.type} placeholder={props.placeholder} />
      <div className={styles.errorMessage}>{error && <span>{props.meta.error}</span>}</div>
    </Form.Field>
  );
};

interface FormCheckboxProps extends WrappedFieldProps, CheckboxProps {}

const FormCheckbox = (props: FormCheckboxProps) => {
  const error = hasErrored(props.meta.touched, props.meta.error);
  return (
    <Form.Field error={error} required={props.required} >
      <Checkbox
        {...props.input}
        label={props.formLabel}
        checked={props.input.value || false}
        value={props.value}
        onChange={(_0, data) => props.input.onChange(data.checked)}
      />
    </Form.Field>
  );
};

interface FormDropdownProps extends WrappedFieldProps, DropdownProps {}

const FormDropdown = (props: FormDropdownProps) => {
  const error = hasErrored(props.meta.touched, props.meta.error);
  return (
    <Form.Field error={error} required={props.required}>
      <label>{props.formLabel}</label>
      <Dropdown
        placeholder={props.placeholder}
        value={props.input.value}
        onChange={(_0, data) => props.input.onChange(data.value)}
        selection={true}
        options={props.options}
      />
    </Form.Field>
  );
};

export {FormInput, FormTextArea, FormCheckbox, FormDropdown};
