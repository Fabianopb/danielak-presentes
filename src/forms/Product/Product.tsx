import React, { useState, useEffect } from 'react';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Segment, Icon, Popup } from 'semantic-ui-react';
import { Prompt } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import {
  FormInput,
  FormCheckbox,
  FormDropdown,
} from '../../components/FormComponents/FormComponents';
import RichTextArea from '../../components/RichTextArea/RichTextArea';
import styles from './Product.module.scss';
import { uploadFile, deleteFiles } from '../../api';
import { getImageNameFromUrl } from '../../modules/helpers';

export const PRODUCT_FORM = 'editProductForm';

type ProductFormData = Product;

interface ProductFormProps {
  categories: Category[];
}

interface ProductFormStateProps {
  images: ProductImage[];
}

type FormProps = ProductFormProps & ProductFormStateProps;

const required = (value: string): string | undefined => {
  return value ? undefined : 'Campo obrigatório';
};

const requiredDescription = (value: string): string | undefined => {
  if (value) {
    return value.replace(/<(.|\n)*?>/g, '') !== '' ? undefined : 'Campo obrigatório';
  }
  return undefined;
};

const Product: React.SFC<FormProps & InjectedFormProps<ProductFormData, FormProps>> = ({
  categories,
  handleSubmit,
  pristine,
  submitting,
  touch,
  change,
  images = [],
}) => {
  const [stateImages, setStateImages] = useState<ProductImage[]>(images);

  useEffect(() => {
    if (images.length !== stateImages.length) {
      setStateImages(images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileDrop = async (files: any[]) => {
    try {
      setStateImages([...images, { small: '', large: '', loading: true }]);
      const formData = new FormData();
      formData.append('file', files[0]);
      const response = await uploadFile(formData);
      const newImages = [
        ...images,
        {
          large: response.data[0].Location,
          small: response.data[1].Location,
        },
      ];
      change('image', newImages);
      setStateImages(newImages);
    } catch (error) {
      const originalImages = images.slice(0, -1);
      change('image', originalImages);
      setStateImages(originalImages);
    }
  };

  const handleDeleteImage = async (imageUrls: ProductImage) => {
    try {
      const imageIndex = images.findIndex(
        image => image.large === imageUrls.large && image.small === imageUrls.small,
      );
      setStateImages(
        images.map((img, index) => (index === imageIndex ? { ...img, loading: true } : { ...img })),
      );
      const largeImageName = getImageNameFromUrl(imageUrls.large);
      const smallImageName = getImageNameFromUrl(imageUrls.small);
      await deleteFiles([largeImageName, smallImageName]);
      const newImages = images.filter((image, index) => index !== imageIndex);
      change('image', newImages);
      setStateImages(newImages);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setStateImages(stateImages.map(img => ({ ...img, loading: false })));
    }
  };

  const isUploadingOrDeleting = stateImages.some(img => img.loading);
  const hasDropzone = stateImages && stateImages.length < 5 && !isUploadingOrDeleting;
  const catOptions = _.filter(
    _.map(categories, cat => ({ text: cat.name, value: cat._id })),
    cat => !_.isUndefined(cat.value),
  );
  return (
    <div className={styles.productForm}>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Field
            component={FormInput}
            formLabel="Nome do produto"
            placeholder="Nome do produto"
            name="name"
            required
            validate={[required]}
          />
          <Field
            component={FormInput}
            formLabel="Link da loja"
            placeholder="Link da loja"
            name="storeLink"
          />
        </Form.Group>
        <Field
          component={FormDropdown}
          formLabel="Categoria"
          placeholder="Escolha uma categoria"
          name="category"
          options={catOptions}
          required
          validate={[required]}
        />
        <div className="ui form field inline">
          <label>Upload de imagens</label>
          <Popup
            trigger={<Icon name="question" circular />}
            content="Altura e largura devem ser maiores que 580px"
            position="top left"
          />
        </div>
        <div className={styles.dropzoneArea}>
          {stateImages.map(image => (
            <div key={image.small} className={styles.previewContainer}>
              {image.loading ? (
                <Segment className={styles.loading} loading />
              ) : (
                <div>
                  <div className={styles.deleteButton} onClick={() => handleDeleteImage(image)}>
                    <Icon name="delete" />
                  </div>
                  <img className={styles.imagePreview} src={image.small} alt={image.small} />
                </div>
              )}
            </div>
          ))}
          {hasDropzone && (
            <Dropzone className={styles.fileDrop} onDrop={handleFileDrop}>
              <div className={styles.fileDropText}>Faça upload da imagem aqui</div>
            </Dropzone>
          )}
        </div>
        <Field
          component={RichTextArea}
          formLabel="Descrição"
          name="description"
          handleTouch={touch}
          required
          validate={[requiredDescription]}
        />
        <Form.Group widths="equal">
          <Field
            component={FormInput}
            type="number"
            label="R$"
            formLabel="Preço"
            name="currentPrice"
            placeholder="Preço"
            required
            validate={[required]}
          />
          <Field
            component={FormInput}
            type="number"
            label="R$"
            formLabel="Preço com desconto"
            name="discountPrice"
            placeholder="Preço com desconto"
          />
        </Form.Group>
        <Field component={FormInput} formLabel="Tags" placeholder="Tags" name="tags" />
        <Form.Group widths="equal">
          <Field
            component={FormInput}
            type="number"
            formLabel="Dias para produção"
            placeholder="Dias para produção"
            name="productionTime"
            required
            validate={[required]}
          />
          <Field
            component={FormInput}
            type="number"
            formLabel="Quantidade mínima"
            placeholder="Quantidade mínima"
            name="minAmount"
            required
            validate={[required]}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Field
            component={FormInput}
            type="number"
            label="cm"
            labelPosition="right"
            formLabel="Comprimento"
            name="depth"
            placeholder="Comprimento"
            required
            validate={[required]}
          />
          <Field
            component={FormInput}
            type="number"
            label="cm"
            labelPosition="right"
            formLabel="Largura"
            name="width"
            placeholder="Largura"
            required
            validate={[required]}
          />
          <Field
            component={FormInput}
            type="number"
            label="cm"
            labelPosition="right"
            formLabel="Altura"
            name="height"
            placeholder="Altura"
            required
            validate={[required]}
          />
          <Field
            component={FormInput}
            type="number"
            label="g"
            labelPosition="right"
            formLabel="Peso"
            name="weight"
            placeholder="Peso"
            required
            validate={[required]}
          />
        </Form.Group>
        <Field component={FormCheckbox} formLabel="Visível" name="isVisible" />
        <Field component={FormCheckbox} formLabel="Em destaque" name="isFeatured" />
        <Form.Button
          className={styles.submitWrapper}
          icon
          labelPosition="right"
          color="blue"
          disabled={submitting || pristine || isUploadingOrDeleting}
        >
          Salvar
          <Icon name="check" />
        </Form.Button>
      </Form>
      <Prompt
        when={submitting || !pristine || isUploadingOrDeleting}
        message={() =>
          'O formulário não foi enviado, se você sair da página o conteúdo não será salvo!'
        }
      />
    </div>
  );
};

const ProductReduxForm = reduxForm<ProductFormData, FormProps>({
  form: PRODUCT_FORM,
})(Product);

const selector = formValueSelector(PRODUCT_FORM);
export default connect((state: RootState) => {
  const images = selector(state, 'image');
  return {
    images,
  };
})(ProductReduxForm);
