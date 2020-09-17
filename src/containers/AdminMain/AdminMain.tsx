import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Table,
  Icon,
  Dimmer,
  Loader,
  Button,
  Divider,
  Image,
  Modal,
  Header,
} from 'semantic-ui-react';
import useSWR from 'swr';
import moment from 'moment';
import cn from 'classnames';
import styles from './AdminMain.module.scss';
import {
  fetchMessages,
  toggleMessageVisibility,
  deleteMessage,
  fetchCategories,
  fetchAllProducts,
} from '../../api';

const AdminMain = () => {
  const [idToDelete, setIdToDelete] = useState<string>();

  const history = useHistory();

  const { data: messages, isValidating: loadingMessages, revalidate: revalidateMessages } = useSWR(
    '/messages',
    fetchMessages,
  );

  const { data: categories, isValidating: loadingCategories } = useSWR(
    '/categories',
    fetchCategories,
  );

  const { data: products, isValidating: loadingProducts } = useSWR('/products', fetchAllProducts);

  const destroyMessage = async () => {
    if (idToDelete) {
      await deleteMessage(idToDelete);
      await revalidateMessages();
      setIdToDelete(undefined);
    }
  };

  const toggleMessageState = async (id: string) => {
    await toggleMessageVisibility(id);
    await revalidateMessages();
  };

  const definedCategories = categories && categories.filter(cat => cat.id !== undefined);
  const sortedMessages =
    messages &&
    messages.sort((a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf());

  return (
    <div className={styles.adminMain}>
      <div className={styles.mgmtHeader}>
        <h2>Lista de produtos</h2>
        <Link to="/admin/product/new">
          <Button basic icon labelPosition="right" color="blue">
            Adicionar Produto
            <Icon name="plus" />
          </Button>
        </Link>
      </div>
      <div className={styles.productList}>
        {loadingProducts || loadingCategories ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Table singleLine selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Produto</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Categoria</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Preço</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Com desconto</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {products &&
                products.map(product => {
                  const category =
                    categories && categories.find(cat => cat.id === product.categoryId);
                  return (
                    <Table.Row
                      className={styles.clickableRow}
                      key={product.id}
                      onClick={() => history.push(`/admin/product/${product.id}`)}
                    >
                      <Table.Cell className={styles.nameRow}>
                        <div className={styles.thumbnailContainer}>
                          {product.images.length > 0 && (
                            <Image
                              className={styles.thumbnail}
                              src={product.images[product.featuredImageIndex].small}
                              alt="N/A"
                            />
                          )}
                        </div>
                        <div className={styles.productName}>{product.name}</div>
                      </Table.Cell>
                      <Table.Cell textAlign="center">{category ? category.name : '---'}</Table.Cell>
                      <Table.Cell textAlign="center">{product.currentPrice}</Table.Cell>
                      <Table.Cell textAlign="center">{product.discountPrice || '---'}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        )}
      </div>
      <Divider />
      <div className={styles.mgmtHeader}>
        <h2>Lista de categorias</h2>
        <Link to="/admin/category/new">
          <Button basic icon labelPosition="right" color="blue">
            Adicionar Categoria
            <Icon name="plus" />
          </Button>
        </Link>
      </div>
      <div className={styles.productList}>
        {loadingCategories ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Table singleLine selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Categoria</Table.HeaderCell>
                <Table.HeaderCell>Descrição</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {definedCategories &&
                definedCategories.map(category => (
                  <Table.Row
                    className={styles.clickableRow}
                    key={category.id}
                    onClick={() => history.push(`/admin/category/${category.id}`)}
                  >
                    <Table.Cell>{category.name}</Table.Cell>
                    <Table.Cell>{category.description}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        )}
      </div>
      <Divider />
      <div className={styles.mgmtHeader}>
        <h2>Lista de mensagens</h2>
      </div>
      <div className={styles.productList}>
        {loadingMessages ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Enviado em</Table.HeaderCell>
                <Table.HeaderCell>Mensagem</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedMessages &&
                sortedMessages.map(message => {
                  const answeredIcon = message.isAnswered ? 'paper plane' : 'envelope';
                  return (
                    <Table.Row
                      key={message.id}
                      className={cn({ [styles.answered]: message.isAnswered })}
                    >
                      <Table.Cell collapsing>{moment(message.createdAt).format('L LT')}</Table.Cell>
                      <Table.Cell>
                        {message.text.map((paragraph, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <p key={`message-paragraph-${index}`}>{paragraph}</p>
                        ))}
                      </Table.Cell>
                      <Table.Cell collapsing>
                        <Icon
                          name={answeredIcon}
                          link
                          onClick={() => toggleMessageState(message.id)}
                        />
                        <Icon name="trash" link onClick={() => setIdToDelete(message.id)} />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        )}
      </div>
      {idToDelete && (
        <Modal open={!!idToDelete} onClose={() => setIdToDelete(undefined)} size="small">
          <Header icon="trash" content="Remover mensagem" />
          <Modal.Content>
            <p>Tem certeza que deseja remover a mensagem?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              icon
              labelPosition="right"
              color="blue"
              onClick={() => setIdToDelete(undefined)}
            >
              Cancelar
              <Icon name="ban" />
            </Button>
            <Button icon labelPosition="right" color="red" onClick={destroyMessage}>
              Remover
              <Icon name="remove" />
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
};

export default AdminMain;
