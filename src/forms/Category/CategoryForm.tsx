import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Form, Icon } from 'semantic-ui-react';
import { FormInput } from '../../components/FormComponents/FormComponents';
import styles from './CategoryForm.module.scss';

export const CATEGORY_FORM = 'CategoryForm';

export type CategoryFormData = {
  name: string;
  description: string;
};

const required = (value: string): string | undefined => {
  return value ? undefined : 'Campo obrigatório';
};

const CategoryForm: React.SFC<InjectedFormProps<CategoryFormData>> = ({
  handleSubmit,
  pristine,
  submitting,
}) => (
  <div className={styles.categoryForm}>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Field
          component={FormInput}
          formLabel="Categoria"
          placeholder="Nome da categoria"
          name="name"
          required
          validate={[required]}
        />
        <Field
          component={FormInput}
          formLabel="Descrição"
          placeholder="Descrição da categoria"
          name="description"
          required
          validate={[required]}
        />
      </Form.Group>
      <Form.Button
        className={styles.submitWrapper}
        icon
        labelPosition="right"
        color="blue"
        disabled={submitting || pristine}
      >
        Salvar
        <Icon name="check" />
      </Form.Button>
    </Form>
  </div>
);

export default reduxForm<CategoryFormData>({
  form: CATEGORY_FORM,
  enableReinitialize: true,
})(CategoryForm);
