import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Icon } from 'semantic-ui-react';
import { Prompt } from 'react-router-dom';
import _ from 'lodash';
import { FormInput } from '../../components/FormComponents/FormComponents';
import styles from './CategoryForm.module.scss';

const validate = (values) => {
  if (!_.isEmpty(values)) {
    const errors = {};
    const requiredFields = ['name', 'description'];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Campo obrigatório';
      }
    });
    return errors;
  }
};

const CategoryForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <div className={styles.categoryForm}>
      <Form onSubmit={handleSubmit} >
        <Form.Group widths='equal'>
          <Field component={FormInput} formLabel='Categoria' placeholder='Nome da categoria' name='name' required />
          <Field component={FormInput} formLabel='Descrição' placeholder='Descrição da categoria' name='description' required />
        </Form.Group>
        <Form.Button
          className={styles.submitWrapper}
          icon
          labelPosition='right'
          color='blue'
          disabled={submitting || pristine}
        >
          Salvar
          <Icon name='check' />
        </Form.Button>
      </Form>
      <Prompt
        when={submitting || !pristine}
        message={() => 'O formulário não foi enviado, se você sair da página o conteúdo não será salvo!'}
      />
    </div>
  );
};

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({form: 'CategoryForm', validate, destroyOnUnmount: false})(CategoryForm);
