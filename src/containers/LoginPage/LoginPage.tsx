import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form as SemanticForm, Input, Button } from 'semantic-ui-react';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { loginAdminUser } from '../../api';
import { setSession } from '../../modules/session';
import FieldRenderer from '../../components/FieldRenderer';
import MessageContainer from '../../components/MessageContainer';

type FormValues = {
  email: string;
  password: string;
};

const StyledInput = styled(Input)`
  width: 300px;
  margin-top: 8px;
`;

const Page = styled.div`
  margin: 32px;
`;

const Title = styled.h3`
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// TODO: validation: all fields required

const LoginPage = () => {
  const history = useHistory();

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const { token, expiry } = await loginAdminUser(values);
      setSession(token, expiry);
      history.push('/admin');
    } catch (error: any) {
      return { [FORM_ERROR]: error.message };
    }
  };

  return (
    <Page>
      <Title>Login</Title>
      <FormContainer>
        <Form<FormValues>
          onSubmit={handleFormSubmit}
          render={({ handleSubmit, submitError, submitting }) => (
            <SemanticForm onSubmit={handleSubmit}>
              <Field name="email">
                {(field) => (
                  <FieldRenderer {...field}>
                    <StyledInput {...field.input} placeholder="Usuário" disabled={submitting} />
                  </FieldRenderer>
                )}
              </Field>
              <Field name="password">
                {(field) => (
                  <FieldRenderer {...field}>
                    <StyledInput {...field.input} type="password" placeholder="Senha" disabled={submitting} />
                  </FieldRenderer>
                )}
              </Field>
              {submitError && <MessageContainer header="Login Failed" message={submitError} />}
              <Button primary disabled={submitting} loading={submitting} style={{ marginTop: 16 }}>
                Login
              </Button>
            </SemanticForm>
          )}
        />
      </FormContainer>
    </Page>
  );
};

export default LoginPage;
