import React from 'react';
import _ from 'lodash';
import { Form, Input, TextArea, Checkbox } from 'semantic-ui-react';

const hasErrored = (touched, errorMessage) => (touched && !_.isUndefined(errorMessage));

const FormInput = (field) => {
  const error = hasErrored(field.meta.touched, field.meta.error);
  return (
    <Form.Field error={error} required={field.required} >
      <label>{field.formLabel}</label>
      <Input
        label={field.label && { basic: true, content: field.label }}
        labelPosition={field.labelPosition}
        {...field.input}
        type={field.type}
        placeholder={field.placeholder} />
      <div className='error-message'>{error && <span>{field.meta.error}</span>}</div>
    </Form.Field>
  );
};

const FormTextArea = (field) => {
  const error = hasErrored(field.meta.touched, field.meta.error);
  return (
    <Form.Field error={error} required={field.required} >
      <label>{field.formLabel}</label>
      <TextArea {...field.input} type={field.type} placeholder={field.placeholder} />
      <div className='error-message'>{error && <span>{field.meta.error}</span>}</div>
    </Form.Field>
  );
};

const FormCheckbox = (field) => {
  const error = hasErrored(field.meta.touched, field.meta.error);
  return (
    <Form.Field error={error} required={field.required} >
      <Checkbox
        {...field.input}
        label={field.formLabel}
        checked={field.input.value || false}
        value={field.value}
        onChange={(param, data) => {
          field.input.onChange(data.checked);
        }} />
    </Form.Field>
  );
};

export {FormInput, FormTextArea, FormCheckbox};
