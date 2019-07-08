import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Form, Icon } from 'semantic-ui-react';
import { Prompt } from 'react-router-dom';
import { FormInput } from '../../components/FormComponents/FormComponents';
import styles from './CategoryForm.module.scss';

export const CATEGORY_FORM = 'CategoryForm';

type CategoryFormData = Category;

const required = (value: string): string | undefined => {
  return value ? undefined : 'Campo obrigatório';
};

const CategoryForm: React.SFC<InjectedFormProps<CategoryFormData, {}>> = ({ handleSubmit, pristine, submitting }) => (
  <div className={styles.categoryForm}>
    <Form onSubmit={handleSubmit} >
      <Form.Group widths="equal">
        <Field
          component={FormInput}
          formLabel="Categoria"
          placeholder="Nome da categoria"
          name="name"
          required={true}
          validate={[required]}
        />
        <Field
          component={FormInput}
          formLabel="Descrição"
          placeholder="Descrição da categoria"
          name="description"
          required={true}
          validate={[required]}
        />
      </Form.Group>
      <Form.Button
        className={styles.submitWrapper}
        icon={true}
        labelPosition="right"
        color="blue"
        disabled={submitting || pristine}
      >
        Salvar
        <Icon name="check" />
      </Form.Button>
    </Form>
    <Prompt
      when={submitting || !pristine}
      message={() => 'O formulário não foi enviado, se você sair da página o conteúdo não será salvo!'}
    />
  </div>
);

export default reduxForm<CategoryFormData, {}>({form: CATEGORY_FORM, destroyOnUnmount: false})(CategoryForm);
