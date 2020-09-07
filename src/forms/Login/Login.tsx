import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { FormInput } from '../../components/FormComponents/FormComponents';
import styles from './Login.module.scss';

const LOGIN_FORM = 'loginForm';

type LoginFormData = LoginRequestParams;

const required = (value: string): string | undefined => {
  return value ? undefined : 'Campo obrigatório';
};

const Login: React.SFC<InjectedFormProps<LoginFormData>> = ({
  handleSubmit,
  pristine,
  submitting,
}) => (
  <div className={styles.loginForm}>
    <Form onSubmit={handleSubmit}>
      <Field
        component={FormInput}
        formLabel="e-mail"
        placeholder="e-mail"
        name="email"
        required
        validate={[required]}
      />
      <Field
        component={FormInput}
        formLabel="password"
        type="password"
        placeholder="password"
        name="password"
        required
        validate={[required]}
      />
      <Form.Button disabled={submitting || pristine}>Login</Form.Button>
    </Form>
  </div>
);

export default reduxForm<LoginFormData>({ form: LOGIN_FORM })(Login);
