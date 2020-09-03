import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Dimmer, Loader, Button, Divider, Image, Modal, Header } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import cn from 'classnames';
import { productActions as cProductActions } from '../../actions/products';
import { categoryActions as cCategoryActions } from '../../actions/categories';
import { messageActions as cMessageActions } from '../../actions/messages';
import styles from './AdminMain.module.scss';

interface StateProps {
  products: ProductsState;
  categories: CategoriesState;
  messages: MessagesState;
}

interface DispatchProps {
  productActions: typeof cProductActions;
  categoryActions: typeof cCategoryActions;
  messageActions: typeof cMessageActions;
}

type AdminMainProps = StateProps & DispatchProps;

interface AdminMainState {
  idToDelete: string;
}

const AdminMain = ({ 
  products, 
  categories, 
  messages, 
  productActions, 
  categoryActions, 
  messageActions
}: AdminMainProps) => {
  const [idToDelete, setIdToDelete] = useState('');

  useEffect(() => {
    productActions.fetchProducts();
    categoryActions.fetchCategories();
    messageActions.fetchMessages();
  }, [productActions, categoryActions, messageActions]);

  const handleDelete = (id: string) => {
    setIdToDelete(id);
    messageActions.toggleDialog(true)
  }

  const destroyMessage = () => {
    messageActions.deleteMessage(idToDelete);
  }

  const toggleAnswer = (id: string) => {
    messageActions.toggleAnswer(id);
  }

  const closeDialog = () => {
    messageActions.toggleDialog(false);
  }

  const definedCategories = _.filter(categories.data, cat => !_.isUndefined(cat._id));

  return (
    <div className={styles.adminMain}>
      <div className={styles.mgmtHeader}>
        <h2>Lista de produtos</h2>
        <Link to="/admin/product/new">
          <Button basic={true} icon={true} labelPosition="right" color="blue">
            Adicionar Produto
            <Icon name="plus" />
          </Button>
        </Link>
      </div>
      <div className={styles.productList}>
        {products.isFetching || categories.isFetching ? (
          <Dimmer active={true} inverted={true}>
            <Loader />
          </Dimmer>
        ) : (
          <Table singleLine={true} selectable={true}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Produto</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Categoria</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Preço</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Com desconto</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {products.data.map((product, index) => {
                const category = _.find(categories.data, cat => cat._id === product.category);
                return (
                  <Table.Row className={styles.clickableRow} key={index} onClick={() => productActions.showAdminProduct(product._id)}>
                    <Table.Cell className={styles.nameRow}>
                      <div className={styles.thumbnailContainer}>
                        {product.image.length > 0 &&
                          <Image className={styles.thumbnail} src={product.image[product.featuredImageIndex].small} alt="N/A" />
                        }
                      </div>
                      <div className={styles.productName}>{product.name}</div>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {category ? category.name : '---'}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {product.currentPrice}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {product.discountPrice || '---'}
                    </Table.Cell>
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
          <Button basic={true} icon={true} labelPosition="right" color="blue">
            Adicionar Categoria
            <Icon name="plus" />
          </Button>
        </Link>
      </div>
      <div className={styles.productList}>
        {categories.isFetching ? (
          <Dimmer active={true} inverted={true}>
            <Loader />
          </Dimmer>
        ) : (
          <Table singleLine={true} selectable={true}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Categoria</Table.HeaderCell>
                <Table.HeaderCell>Descrição</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {definedCategories.map((category, index) => (
                <Table.Row className={styles.clickableRow} key={index} onClick={() => categoryActions.showAdminCategory(category._id as string)}>
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
        {messages.isFetching ? (
          <Dimmer active={true} inverted={true}>
            <Loader />
          </Dimmer>
        ) : (
          <Table singleLine={true}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Enviado em</Table.HeaderCell>
                <Table.HeaderCell>Mensagem</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {messages.data.map((message, index) => {
                const answeredIcon = message.answered ? 'paper plane' : 'envelope';
                return (
                  <Table.Row key={index} className={cn({ [styles.answered]: message.answered })}>
                    <Table.Cell collapsing={true}>{moment(message.createdAt).format('L LT')}</Table.Cell>
                    <Table.Cell>{message.text.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}</Table.Cell>
                    <Table.Cell collapsing={true}>
                      <Icon name={answeredIcon} link={true} onClick={() => toggleAnswer(message._id)} />
                      <Icon name="trash" link={true} onClick={() => handleDelete(message._id)} />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </div>
      <Modal open={messages.isDialogOpen} onClose={closeDialog} size="small">
        <Header icon="trash" content="Remover mensagem" />
        <Modal.Content>
          <p>Tem certeza que deseja remover a mensagem?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic={true} icon={true} labelPosition="right" color="blue" onClick={closeDialog} >
            Cancelar<Icon name="ban" />
          </Button>
          <Button icon={true} labelPosition="right" color="red" onClick={destroyMessage} >
            Remover<Icon name="remove" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  categories: state.categories,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...cProductActions }, dispatch),
  categoryActions: bindActionCreators({ ...cCategoryActions }, dispatch),
  messageActions: bindActionCreators({ ...cMessageActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
