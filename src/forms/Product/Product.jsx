import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button, Icon } from 'semantic-ui-react';
import { Prompt } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import { FormInput, FormCheckbox } from '../../components/FormComponents/FormComponents';
import RichTextArea from '../../components/RichTextArea/RichTextArea';
import styles from './Product.module.scss';

const validate = (values) => {
  if (!_.isEmpty(values)) {
    const errors = {};
    const requiredFields = [
      'name',
      'storeLink',
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
    if (values.description.replace(/<(.|\n)*?>/g, '') === '') {
      errors.description = 'Campo obrigatório';
    }
    return errors;
  }
};

const Product = ({ handleSubmit, handleFileDrop, deleteImage, pristine, submitting, images, touch }) => {
  const isSomeImageUploading = _.some(images, image => image === 'uploading');
  const hasDropzone = images && images.length < 5 && !isSomeImageUploading;
  return (
    <div className={styles.productForm}>
      <Form onSubmit={handleSubmit} >
        <Form.Group widths='equal'>
          <Field component={FormInput} formLabel='Nome do produto' placeholder='Nome do produto' name='name' required />
          <Field component={FormInput} formLabel='Link da loja' placeholder='Link da loja' name='storeLink' required />
        </Form.Group>
        <div className={styles.dropzoneArea}>
          { images && _.map(images, (image, index) => (
            <div key={index} className={styles.previewContainer}>
              { image === 'uploading'
                ? <Segment className={styles.loading} loading />
                : <div>
                  <Button className={styles.deleteButton} icon color='red' onClick={() => deleteImage(image)}>
                    <Icon name='delete' />
                  </Button>
                  <img className={styles.imagePreview} src={image.small} alt={image.small} />
                </div>
              }
            </div>
          ))}
          { hasDropzone &&
            <Dropzone
              className={styles.fileDrop}
              onDrop={handleFileDrop} >
              <div className={styles.fileDropText}>Faça upload da imagem aqui</div>
            </Dropzone>
          }
        </div>
        <Field component={RichTextArea} formLabel='Descrição' name='description' handleTouch={touch} required />
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
        <Form.Button disabled={submitting || pristine || isSomeImageUploading}>Submit</Form.Button>
      </Form>
      <Prompt
        when={submitting || !pristine || isSomeImageUploading}
        message={() =>
          'O formulário não foi enviado, se você sair da página o conteúdo não será salvo!'
        }
      />
    </div>
  );
};

Product.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFileDrop: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  images: PropTypes.array
};

export default reduxForm({form: 'editProductForm', validate})(Product);
