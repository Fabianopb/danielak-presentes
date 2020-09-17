import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Dimmer, Loader, Icon, Button, Modal, Header } from 'semantic-ui-react';
import useSWR from 'swr';
import CategoryForm, { CategoryFormData } from '../../forms/Category/CategoryForm';
import styles from './AdminCategory.module.scss';
import { fetchCategoryById, createCategory, editCategory, deleteCategory } from '../../api';

const AdminCategory = () => {
  const params = useParams();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const { data: category, isValidating: loadingCategory } = useSWR(
    params.id === 'new' ? null : `/category/${params.id}`,
    () => fetchCategoryById(params.id),
  );

  const initialValues: CategoryFormData = category
    ? { name: category.name, description: category.description }
    : { name: '', description: '' };

  const submitCategory = async (values: CategoryFormData) => {
    try {
      if (!category) {
        await createCategory(values);
      } else {
        await editCategory(category.id, values);
      }
      history.push('/admin');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const confirmCategoryDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      history.push('/admin');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className={styles.adminCategory}>
      <div className={styles.addCategoryHeader}>
        <h3>Adicionar categoria</h3>
        <div className={styles.actionButtons}>
          <Button
            basic
            icon
            labelPosition="right"
            color="blue"
            onClick={() => history.push('/admin')}
          >
            Voltar
            <Icon name="chevron left" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="red"
            disabled={!category}
            onClick={() => setIsOpen(true)}
          >
            Remover
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      {loadingCategory && (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      )}
      <CategoryForm onSubmit={submitCategory} initialValues={initialValues} />
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="small">
        <Header icon="trash" content="Apagar produto" />
        <Modal.Content>
          <p>
            Tem certeza que deseja apagar a categoria <em>{category && category.name}</em>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic icon labelPosition="right" color="blue" onClick={() => setIsOpen(false)}>
            Cancelar
            <Icon name="ban" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="red"
            onClick={() => (category ? confirmCategoryDelete(category.id) : undefined)}
          >
            Remover
            <Icon name="remove" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AdminCategory;
