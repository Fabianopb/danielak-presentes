import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { Prompt } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import _ from 'lodash';

import { handleFileDrop } from '../modules/actions/products';
import { FormInput, FormTextArea, FormCheckbox } from '../components/FormComponents';

const validate = (values) => {
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
    const { handleSubmit, images, pristine, submitting } = this.props;
    const dropzones = images && images.length + 1;
    return (
      <div className='product-form'>
        <Form onSubmit={handleSubmit} >
          <Form.Group widths='equal'>
            <Field component={FormInput} formLabel='Nome do produto' placeholder='Nome do produto' name='name' required />
            <Field component={FormInput} formLabel='Link da loja' placeholder='Link da loja' name='storeLink' required />
          </Form.Group>
          <div className='dropzone-area'>
            { images && _.times(dropzones, (n) =>
              <Dropzone key={n} className='file-drop' onDrop={this.props.handleFileDrop} >
                { !images[n]
                  ? <div className='file-drop-text'>Faça upload da imagem aqui</div>
                  : <img className='image-preview' src={images[n].preview || images[n]} alt={n} />
                }
              </Dropzone>
            )}
          </div>
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
        <Prompt
          when={submitting || !pristine}
          message={() =>
            'O formulário não foi enviado, se você sair da página o conteúdo não será salvo!'
          }
        />
      </div>
    );
  }
}

EditProductForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFileDrop: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  images: PropTypes.array
};

const mapStateToProps = (state) => ({
  images: formValueSelector('editProductForm')(state, 'image')
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({handleFileDrop}, dispatch);

const controlledProductForm = reduxForm({form: 'editProductForm', validate})(EditProductForm);
export default connect(mapStateToProps, mapDispatchToProps)(controlledProductForm);
