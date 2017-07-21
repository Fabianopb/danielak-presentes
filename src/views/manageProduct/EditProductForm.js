import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

import { FormInput, FormTextArea } from '../../components/FormComponents';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['eventTime', 'shift', 'crew', 'category', 'subcategory', 'item', 'description', 'correctiveActions'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Field required';
    }
  });
  return errors;
};

class EditProductForm extends Component {
  render () {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className='product-form'>
        <Form onSubmit={handleSubmit} >
          <Form.Group widths='equal'>
            <Field component={FormInput} label='Nome do produto' placeholder='Nome do produto' name='name' />
            <Field component={FormInput} label='URL da imagem' placeholder='URL da imagem' name='image' />
            <Field component={FormInput} label='Link da loja' placeholder='Link da loja' name='storeLink' />
          </Form.Group>
          <Field component={FormTextArea} label='Descrição' placeholder='Descrição do produto' name='description' />
          <Form.Group widths='equal'>
            <Field component={FormInput} label='Preço' placeholder='Preço' name='currentPrice' />
            <Field component={FormInput} label='Preço com desconto' placeholder='Preço com desconto' name='discountPrice' />
          </Form.Group>
          <Field component={FormInput} label='Tags' placeholder='Tags' name='tags' />
          <Form.Group widths='equal'>
            <Field component={FormInput} label='Tempo de produção' placeholder='Tempo de produção' name='productionTime' />
            <Field component={FormInput} label='Quantidade mínima' placeholder='Quantidade mínima' name='minAmount' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field component={FormInput} label='Altura' placeholder='Altura' name='height' />
            <Field component={FormInput} label='Largura' placeholder='Largura' name='width' />
            <Field component={FormInput} label='Profundidade' placeholder='Profundidade' name='depth' />
            <Field component={FormInput} label='Peso' placeholder='Peso' name='weight' />
          </Form.Group>
          {/* <Form.Checkbox label='Visível' name='isVisible' checked={product.isVisible} onChange={this.handleCheckbox} />
        <Form.Checkbox label='Em destaque' name='isFeatured' checked={product.isFeatured} onChange={this.handleCheckbox} /> */}
          <Form.Button disabled={submitting || pristine}>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

EditProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({form: 'editProductForm', validate})(EditProductForm);
