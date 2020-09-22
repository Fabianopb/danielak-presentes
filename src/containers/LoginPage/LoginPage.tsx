import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form as SemanticForm, Input, Message, Button } from 'semantic-ui-react';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import styles from './LoginPage.module.scss';
import { loginAdminUser } from '../../api';
import { setSession } from '../../modules/session';
import FieldRenderer from '../../components/FieldRenderer';

type FormValues = {
  email: string;
  password: string;
};

const StyledInput = styled(Input)`
  width: 300px;
  margin-top: 8px;
`;

const MessageContainer = styled.div.attrs({ className: 'ui form error' })`
  width: 300px;
  margin-top: 8px;
`;

const ButtonContainer = styled.div`
  width: 300px;
  margin-top: 8px;
  text-align: right;
`;

const LoginPage = () => {
  const history = useHistory();

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const { token, expiry } = await loginAdminUser(values);
      setSession(token, expiry);
      history.push('/admin');
    } catch (error) {
      return { [FORM_ERROR]: error.message };
    }
  };

  return (
    <div className={styles.loginPage}>
      <h3 className={styles.loginTitle}>Login</h3>
      <div className={styles.loginContainer}>
        <Form<FormValues>
          onSubmit={handleFormSubmit}
          render={({ handleSubmit, submitError, submitting }) => (
            <SemanticForm onSubmit={handleSubmit}>
              <Field name="email">
                {field => (
                  <FieldRenderer {...field}>
                    {input => <StyledInput {...input} disabled={submitting} />}
                  </FieldRenderer>
                )}
              </Field>
              <Field name="password">
                {field => (
                  <FieldRenderer {...field}>
                    {input => <StyledInput {...input} type="password" disabled={submitting} />}
                  </FieldRenderer>
                )}
              </Field>
              {submitError && (
                <MessageContainer>
                  <Message error header="Login Failed" content={submitError} />
                </MessageContainer>
              )}
              <ButtonContainer>
                <Button disabled={submitting} loading={submitting}>
                  Login
                </Button>
              </ButtonContainer>
            </SemanticForm>
          )}
        />
      </div>
    </div>
  );
};

export default LoginPage;
