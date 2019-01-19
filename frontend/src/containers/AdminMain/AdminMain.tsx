import * as React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Dimmer, Loader, Button, Divider, Image } from 'semantic-ui-react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { productActions } from '../../actions/products';
import { categoryActions } from '../../actions/categories';
import { messageActions } from '../../actions/messages';
import styles from './AdminMain.module.scss';

type StateProps = {
  products: ProductsState
  categories: CategoriesState;
  messages: MessagesState;
};

type DispatchProps = {
  productActions: typeof productActions;
  categoryActions: typeof categoryActions;
  messageActions: typeof messageActions;
};

type OwnProps = {};

type AdminMainProps = StateProps & DispatchProps & OwnProps;

class AdminMain extends React.Component<AdminMainProps> {
  public componentDidMount () {
    this.props.productActions.fetchProducts();
    this.props.categoryActions.fetchCategories();
    this.props.messageActions.fetchMessages();
  }

  public render () {
    const { data: prodData, isFetching: prodIsFetching } = this.props.products;
    const { data: catData, isFetching: catIsFetching } = this.props.categories;
    const { data: msgData, isFetching: msgIsFetching } = this.props.messages;
    const categories = _.filter(catData, cat => !_.isUndefined(cat._id));
    const { showAdminProduct } = this.props.productActions;
    const { showAdminCategory } = this.props.categoryActions;
    return (
      <div className={styles.adminMain}>
        <div className={styles.mgmtHeader}>
          <h2>Lista de produtos</h2>
          <Link to='/admin/product/new'>
            <Button basic={true} icon={true} labelPosition='right' color='blue'>
              Adicionar Produto
              <Icon name='plus' />
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
                  <Table.HeaderCell textAlign='center'>Categoria</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Preço</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Com desconto</Table.HeaderCell>
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
                            <Image className={styles.thumbnail} src={product.image[product.featuredImageIndex].small} alt='N/A' />
                          }
                        </div>
                        <div className={styles.productName}>{ product.name }</div>
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        { category ? category.name : '---' }
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        { product.currentPrice }
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        { product.discountPrice || '---' }
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
          <Link to='/admin/category/new'>
            <Button basic={true} icon={true} labelPosition='right' color='blue'>
              Adicionar Categoria
              <Icon name='plus' />
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
            <Table singleLine={true} selectable={true}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Enviado em</Table.HeaderCell>
                  <Table.HeaderCell>Mensagem</Table.HeaderCell>
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {msgData.map((message, index) => (
                  <Table.Row key={index}>
                    <Table.Cell collapsing={true}>{moment(message.createdAt).format('L LT')}</Table.Cell>
                    <Table.Cell>{message.text.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}</Table.Cell>
                    <Table.Cell collapsing={true}>{message.new} {message.answered}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  categories: state.categories,
  messages: state.messages
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...productActions }, dispatch),
  categoryActions: bindActionCreators({ ...categoryActions }, dispatch),
  messageActions: bindActionCreators({ ...messageActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
