import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Dimmer, Loader, Icon, Button, Modal, Header } from 'semantic-ui-react';
import useSWR from 'swr';
import CategoryForm from '../../forms/Category/CategoryForm';
import styles from './AdminCategory.module.scss';
import { fetchCategoryById, createCategory, editCategory, deleteCategory } from '../../api';
import { MongoCategory } from '../../types';

const AdminCategory = () => {
  const params = useParams();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const { data: category, isValidating: loadingCategory } = useSWR(`/category/${params.id}`, () =>
    fetchCategoryById(params.id),
  );

  const submitCategory = async (values: MongoCategory) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, ...rest } = values;
    try {
      if (params.id === 'new') {
        await createCategory(rest);
      } else {
        await editCategory(values);
      }
      history.push('/admin');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const confirmCategoryDelete = async (cat: MongoCategory) => {
    try {
      await deleteCategory(cat._id as string);
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
            disabled={params.id === 'new'}
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
      {category && <CategoryForm onSubmit={submitCategory} initialValues={category} />}
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
            onClick={() => (category ? confirmCategoryDelete(category) : undefined)}
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
