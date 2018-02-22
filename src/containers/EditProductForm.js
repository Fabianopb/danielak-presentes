import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

import { setImageFile } from '../modules/actions/products';
import { FormInput, FormTextArea, FormCheckbox } from '../components/FormComponents';

const validate = (values) => {
  console.log(values);
  const errors = {};
  const requiredFields = [
    'name',
    'image',
    'storeLink',
    'description',
    'currentPrice',
    'productionTime',
    'minAmount',
    'height',
    'width',
    'depth',
    'weight'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Campo obrigatório';
    }
  });

  return errors;
};

class EditProductForm extends Component {
  render () {
    const { handleSubmit,
      pristine, submitting } = this.props;
    return (
      <div className='product-form'>
        <Form onSubmit={handleSubmit} >
          <Form.Group widths='equal'>
            <Field component={FormInput} formLabel='Nome do produto' placeholder='Nome do produto' name='name' required />
            <Field component={FormInput} formLabel='Link da loja' placeholder='Link da loja' name='storeLink' required />
          </Form.Group>
          <Form.Input formLabel='Imagem do produto' type='file' onChange={(event) => this.props.setImageFile(event)} />
          <Field component={FormTextArea} formLabel='Descrição' placeholder='Descrição do produto' name='description' required />
          <Form.Group widths='equal'>
            <Field component={FormInput}
              type='number'
              label='R$' formLabel='Preço'
              name='currentPrice' placeholder='Preço'
              required />
            <Field component={FormInput}
              type='number'
              label='R$' formLabel='Preço com desconto'
              name='discountPrice' placeholder='Preço com desconto' />
          </Form.Group>
          <Field component={FormInput} formLabel='Tags' placeholder='Tags' name='tags' />
          <Form.Group widths='equal'>
            <Field component={FormInput} type='number' formLabel='Dias para produção' placeholder='Dias para produção' name='productionTime' required />
            <Field component={FormInput} type='number' formLabel='Quantidade mínima' placeholder='Quantidade mínima' name='minAmount' required />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field component={FormInput}
              type='number'
              label='cm' labelPosition='right' formLabel='Altura'
              name='height' placeholder='Altura'
              required />
            <Field component={FormInput}
              type='number'
              label='cm' labelPosition='right' formLabel='Largura'
              name='width' placeholder='Largura'
              required />
            <Field component={FormInput}
              type='number'
              label='cm' labelPosition='right' formLabel='Profundidade'
              name='depth' placeholder='Profundidade'
              required />
            <Field component={FormInput}
              type='number'
              label='g' labelPosition='right' formLabel='Peso'
              name='weight' placeholder='Peso'
              required />
          </Form.Group>
          <Field component={FormCheckbox} formLabel='Visível' name='isVisible' />
          <Field component={FormCheckbox} formLabel='Em destaque' name='isFeatured' />
          <Form.Button disabled={submitting || pristine}>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

EditProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setImageFile: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({setImageFile}, dispatch);

const controlledProductForm = reduxForm({form: 'editProductForm', validate})(EditProductForm);
export default connect(null, mapDispatchToProps)(controlledProductForm);
