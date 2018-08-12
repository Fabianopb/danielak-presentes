import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Form, Segment, Button, Icon, Popup } from 'semantic-ui-react';
import { Prompt } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import * as _ from 'lodash';
import { FormInput, FormCheckbox, FormDropdown } from '../../components/FormComponents/FormComponents';
import RichTextArea from '../../components/RichTextArea/RichTextArea';
import styles from './Product.module.scss';

const PRODUCT_FORM = 'editProductForm';

type ProductFormData = any;

type ProductFormProps = {
  handleFileDropThunk: any;
  deleteImageThunk: any;
  images: any;
  categories: any[];
};

const required = (value: string): string | undefined => {
  return value ? undefined : 'Campo obrigatório';
};

const requiredDescription = (value: string): string | undefined => {
  return value.replace(/<(.|\n)*?>/g, '') !== '' ? undefined : 'Campo obrigatório';
};

const Product: React.SFC<ProductFormProps & InjectedFormProps<ProductFormData, ProductFormProps>> = ({
  handleSubmit, handleFileDropThunk, deleteImageThunk, pristine, submitting, images, touch, categories
}) => {
  const isSomeImageUploading = _.some(images, image => image === 'uploading');
  const hasDropzone = images && images.length < 5 && !isSomeImageUploading;
  const catOptions = _.map(categories, cat => ({ text: cat.name, value: cat._id }));
  return (
    <div className={styles.productForm}>
      <Form onSubmit={handleSubmit} >
        <Form.Group widths='equal'>
          <Field
            component={FormInput}
            formLabel='Nome do produto'
            placeholder='Nome do produto'
            name='name'
            required={true}
            validate={[required]}
          />
          <Field
            component={FormInput}
            formLabel='Link da loja'
            placeholder='Link da loja'
            name='storeLink'
            required={true}
            validate={[required]}
          />
        </Form.Group>
        <Field
          component={FormDropdown}
          formLabel='Categoria'
          placeholder='Escolha uma categoria'
          name='category'
          options={catOptions}
          required={true} validate={[required]}
        />
        <div className='ui form field inline'>
          <label>Upload de imagens</label>
          <Popup
            trigger={<Icon name='question' circular={true} />}
            content='Altura e largura devem ser maiores que 580px'
            position='top left'
          />
        </div>
        <div className={styles.dropzoneArea}>
          { images && _.map(images, (image: any, index: number) => (
            <div key={index} className={styles.previewContainer}>
              { image === 'uploading'
                ? <Segment className={styles.loading} loading={true} />
                : <div>
                  <Button className={styles.deleteButton} icon={true} color='red' onClick={() => deleteImageThunk(image)}>
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
              onDrop={handleFileDropThunk} >
              <div className={styles.fileDropText}>Faça upload da imagem aqui</div>
            </Dropzone>
          }
        </div>
        <Field
          component={RichTextArea}
          formLabel='Descrição'
          name='description'
          handleTouch={touch}
          required={true}
          validate={[requiredDescription]}
        />
        <Form.Group widths='equal'>
          <Field
            component={FormInput}
            type='number'
            label='R$' formLabel='Preço'
            name='currentPrice' placeholder='Preço'
            required={true}
            validate={[required]}
          />
          <Field
            component={FormInput}
            type='number'
            label='R$'
            formLabel='Preço com desconto'
            name='discountPrice' placeholder='Preço com desconto' />
        </Form.Group>
        <Field
          component={FormInput}
          formLabel='Tags'
          placeholder='Tags'
          name='tags'
        />
        <Form.Group widths='equal'>
          <Field component={FormInput}
            type='number'
            formLabel='Dias para produção'
            placeholder='Dias para produção'
            name='productionTime'
            required={true}
            validate={[required]}
          />
          <Field
            component={FormInput}
            type='number'
            formLabel='Quantidade mínima'
            placeholder='Quantidade mínima'
            name='minAmount'
            required={true}
            validate={[required]}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormInput}
            type='number'
            label='cm'
            labelPosition='right'
            formLabel='Altura'
            name='height'
            placeholder='Altura'
            required={true}
            validate={[required]}
          />
          <Field
            component={FormInput}
            type='number'
            label='cm'
            labelPosition='right'
            formLabel='Largura'
            name='width'
            placeholder='Largura'
            required={true}
            validate={[required]}
          />
          <Field
            component={FormInput}
            type='number'
            label='cm'
            labelPosition='right'
            formLabel='Profundidade'
            name='depth'
            placeholder='Profundidade'
            required={true}
            validate={[required]}
          />
          <Field
            component={FormInput}
            type='number'
            label='g'
            labelPosition='right'
            formLabel='Peso'
            name='weight'
            placeholder='Peso'
            required={true}
            validate={[required]}
          />
        </Form.Group>
        <Field
          component={FormCheckbox}
          formLabel='Visível'
          name='isVisible'
        />
        <Field
          component={FormCheckbox}
          formLabel='Em destaque'
          name='isFeatured'
        />
        <Form.Button
          className={styles.submitWrapper}
          icon={true}
          labelPosition='right'
          color='blue'
          disabled={submitting || pristine || isSomeImageUploading}
        >
          Salvar
          <Icon name='check' />
        </Form.Button>
      </Form>
      <Prompt
        when={submitting || !pristine || isSomeImageUploading}
        message={() => 'O formulário não foi enviado, se você sair da página o conteúdo não será salvo!'}
      />
    </div>
  );
};

export default reduxForm<ProductFormData, ProductFormProps>({form: PRODUCT_FORM, destroyOnUnmount: false})(Product);
