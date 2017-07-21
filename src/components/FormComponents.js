import React from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';

const hasErrored = (touched, errorMessage) => {
  if (touched && errorMessage) {
    return true;
  }
  return false;
};

const FormInput = (field) => {
  const error = hasErrored(field.meta.touched, field.meta.error);
  return (
    <Form.Field error={error} >
      <label>{field.label}</label>
      <Input {...field.input} type={field.type} placeholder={field.placeholder} />
      <div className='error-message'>{error && <span>{field.meta.error}</span>}</div>
    </Form.Field>
  );
};

const FormTextArea = (field) => {
  const error = hasErrored(field.meta.touched, field.meta.error);
  return (
    <Form.Field error={error} >
      <label>{field.label}</label>
      <TextArea {...field.input} type={field.type} placeholder={field.placeholder} />
      <div className='error-message'>{error && <span>{field.meta.error}</span>}</div>
    </Form.Field>
  );
};

// const FormDropdown = (field) => {
//   const error = hasErrored(field.meta.touched, field.meta.error);
//   return (
//     <Form.Field>
//       <label>{field.label}</label>
//       <Dropdown {...field.input}
//         icon={field.icon}
//         error={error}
//         disabled={field.disabled}
//         selection
//         options={field.options}
//         placeholder={field.placeholder}
//         onChange={(param, data) => field.input.onChange(data.value)} />
//       <div className='error-message'>{error && <span>{field.meta.error}</span>}</div>
//     </Form.Field>
//   );
// };

// const FormRadioGroup = (field) => {
//   const error = hasErrored(field.meta.touched, field.meta.error);
//   return (
//     <Form.Group className='form-radio-group'>
//       {field.options.map(radio => (
//         <Form.Field key={radio.value}>
//           <Radio
//             value={radio.value}
//             label={radio.label}
//             checked={field.input.value === radio.value}
//             onChange={(param, data) => field.input.onChange(data.value)} />
//         </Form.Field>
//       ))}
//       <div className='error-message'>{error && <span>{field.meta.error}</span>}</div>
//     </Form.Group>
//   );
// };

export {FormInput, FormTextArea};
