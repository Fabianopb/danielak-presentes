import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Dimmer, Loader, Button, Divider, Image, Modal, Header } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import cn from 'classnames';
import { productActions } from '../../actions/products';
import { categoryActions } from '../../actions/categories';
import { messageActions } from '../../actions/messages';
import styles from './AdminMain.module.scss';

interface StateProps {
  products: ProductsState;
  categories: CategoriesState;
  messages: MessagesState;
}

interface DispatchProps {
  productActions: typeof productActions;
  categoryActions: typeof categoryActions;
  messageActions: typeof messageActions;
}

type AdminMainProps = StateProps & DispatchProps;

interface AdminMainState {
  idToDelete: string;
}

class AdminMain extends React.Component<AdminMainProps, AdminMainState> {
  public state: AdminMainState = {
    idToDelete: '',
  };

  public componentDidMount() {
    this.props.productActions.fetchProducts();
    this.props.categoryActions.fetchCategories();
    this.props.messageActions.fetchMessages();
  }

  public render() {
    const { data: prodData, isFetching: prodIsFetching } = this.props.products;
    const { data: catData, isFetching: catIsFetching } = this.props.categories;
    const { data: msgData, isFetching: msgIsFetching, isDialogOpen } = this.props.messages;
    const categories = _.filter(catData, cat => !_.isUndefined(cat._id));
    const { showAdminProduct } = this.props.productActions;
    const { showAdminCategory } = this.props.categoryActions;
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
          {prodIsFetching || catIsFetching ? (
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
                {prodData.map((product, index) => {
                  const category = _.find(catData, cat => cat._id === product.category);
                  return (
                    <Table.Row className={styles.clickableRow} key={index} onClick={() => showAdminProduct(product._id)}>
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
          {catIsFetching ? (
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
                {categories.map((category, index) => (
                  <Table.Row className={styles.clickableRow} key={index} onClick={() => showAdminCategory(category._id as string)}>
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
          {msgIsFetching ? (
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
                {msgData.map((message, index) => {
                  const answeredIcon = message.answered ? 'paper plane' : 'envelope';
                  return (
                    <Table.Row key={index} className={cn({ [styles.answered]: message.answered })}>
                      <Table.Cell collapsing={true}>{moment(message.createdAt).format('L LT')}</Table.Cell>
                      <Table.Cell>{message.text.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}</Table.Cell>
                      <Table.Cell collapsing={true}>
                        <Icon name={answeredIcon} link={true} onClick={() => this.toggleAnswer(message._id)} />
                        <Icon name="trash" link={true} onClick={() => this.handleDelete(message._id)} />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
        </div>
        <Modal open={isDialogOpen} onClose={this.closeDialog} size="small">
          <Header icon="trash" content="Remover mensagem" />
          <Modal.Content>
            <p>Tem certeza que deseja remover a mensagem?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic={true} icon={true} labelPosition="right" color="blue" onClick={this.closeDialog} >
              Cancelar<Icon name="ban" />
            </Button>
            <Button icon={true} labelPosition="right" color="red" onClick={this.destroyMessage} >
              Remover<Icon name="remove" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  private handleDelete = (id: string) => {
    this.setState({ idToDelete: id }, () => this.props.messageActions.toggleDialog(true));
  }

  private destroyMessage = () => {
    this.props.messageActions.deleteMessage(this.state.idToDelete);
  }

  private toggleAnswer = (id: string) => {
    this.props.messageActions.toggleAnswer(id);
  }

  private closeDialog = () => {
    this.props.messageActions.toggleDialog(false);
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  categories: state.categories,
  messages: state.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...productActions }, dispatch),
  categoryActions: bindActionCreators({ ...categoryActions }, dispatch),
  messageActions: bindActionCreators({ ...messageActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
