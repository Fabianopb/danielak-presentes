import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

import { FormInput } from '../../components/FormComponents/FormComponents';
import styles from './Login.module.scss';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'email',
    'password'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Field required';
    }
  });
  return errors;
};

class Login extends Component {
  render () {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className={styles.loginForm}>
        <Form onSubmit={handleSubmit} >
          <Field component={FormInput} formLabel='e-mail' placeholder='e-mail' name='email' required />
          <Field component={FormInput} formLabel='password' type='password' placeholder='password' name='password' required />
          <Form.Button disabled={submitting || pristine}>Login</Form.Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({form: 'loginForm', validate})(Login);
