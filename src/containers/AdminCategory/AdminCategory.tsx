import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Dimmer,
  Loader,
  Icon,
  Button,
  Modal,
  Header,
  Form as SemanticForm,
  Input,
} from 'semantic-ui-react';
import { FORM_ERROR } from 'final-form';
import { Field, Form } from 'react-final-form';
import useSWR from 'swr';
import styles from './AdminCategory.module.scss';
import { fetchCategoryById, createCategory, editCategory, deleteCategory } from '../../api';
import FieldRenderer from '../../components/FieldRenderer';
import MessageContainer from '../../components/MessageContainer';

type FormValues = {
  name: string;
  description: string;
};

const StyledField = styled(FieldRenderer)`
  width: 300px;
  margin-top: 12px;
`;

// TODO: validation: all fields required

const AdminCategory = () => {
  const params = useParams();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string>();

  const { data: category, isValidating: loadingCategory } = useSWR(
    params.id === 'new' ? null : `/category/${params.id}`,
    () => fetchCategoryById(params.id),
  );

  const initialValues: FormValues = category
    ? { name: category.name, description: category.description }
    : { name: '', description: '' };

  const handleFormSubmit = async (values: FormValues) => {
    try {
      if (!category) {
        await createCategory(values);
      } else {
        await editCategory(category.id, values);
      }
      history.push('/admin');
    } catch (error) {
      return { [FORM_ERROR]: JSON.stringify(error.message) };
    }
  };

  const confirmCategoryDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      history.push('/admin');
    } catch (error) {
      setDeleteError(JSON.stringify(error.message));
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
      <Form
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, submitError }) => (
          <SemanticForm onSubmit={handleSubmit}>
            <Field name="name">
              {field => (
                <StyledField {...field} label="Categoria">
                  {input => (
                    <Input
                      {...input}
                      placeholder="Nome da categoria"
                      disabled={submitting}
                      required
                      fluid
                    />
                  )}
                </StyledField>
              )}
            </Field>
            <Field name="description">
              {field => (
                <StyledField {...field} label="Descrição">
                  {input => (
                    <Input
                      {...input}
                      placeholder="Descrição"
                      disabled={submitting}
                      required
                      fluid
                    />
                  )}
                </StyledField>
              )}
            </Field>
            {submitError && <MessageContainer message={submitError} />}
            <Button
              primary
              icon
              labelPosition="right"
              disabled={submitting}
              style={{ marginTop: 16 }}
            >
              Salvar
              <Icon name="check" />
            </Button>
          </SemanticForm>
        )}
      />
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="small">
        <Header icon="trash" content="Apagar produto" />
        <Modal.Content>
          <p>
            Tem certeza que deseja apagar a categoria <em>{category && category.name}</em>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          {deleteError && <MessageContainer message={deleteError} />}
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
