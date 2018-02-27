import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Segment, Button, Icon } from 'semantic-ui-react';
import { Prompt } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import _ from 'lodash';

import { handleFileDrop, deleteImage } from '../modules/actions/products';
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

const DropzoneContent = ({image, deleteImage}) => {
  if (!image) {
    return <div className='file-drop-text'>Faça upload da imagem aqui</div>;
  } else if (image && image === 'uploading') {
    return (
      <Segment loading />
    );
  } else if (image && image !== 'uploading') {
    return (
      <div>
        <Button className='delete-button' icon color='red' onClick={() => deleteImage(image)}>
          <Icon name='delete' />
        </Button>
        <img className='image-preview' src={image} alt={image} />
      </div>
    );
  }
};

DropzoneContent.propTypes = {
  deleteImage: PropTypes.func.isRequired,
  image: PropTypes.string
};

class EditProductForm extends Component {
  render () {
    const { handleSubmit, images, pristine, submitting } = this.props;
    const dropzones = images && images.length + 1;
    console.log(dropzones);
    return (
      <div className='product-form'>
        <Form onSubmit={handleSubmit} >
          <Form.Group widths='equal'>
            <Field component={FormInput} formLabel='Nome do produto' placeholder='Nome do produto' name='name' required />
            <Field component={FormInput} formLabel='Link da loja' placeholder='Link da loja' name='storeLink' required />
          </Form.Group>
          <div className='dropzone-area'>
            { images && _.times(dropzones, (n) =>
              <Dropzone key={n} className='file-drop' onDrop={this.props.handleFileDrop} disabled={!!images[n]} >
                <DropzoneContent image={images[n]} deleteImage={this.props.deleteImage} />
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
  deleteImage: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  images: PropTypes.array
};

const mapStateToProps = (state) => ({
  images: formValueSelector('editProductForm')(state, 'image')
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({handleFileDrop, deleteImage}, dispatch);

const controlledProductForm = reduxForm({form: 'editProductForm', validate})(EditProductForm);
export default connect(mapStateToProps, mapDispatchToProps)(controlledProductForm);
