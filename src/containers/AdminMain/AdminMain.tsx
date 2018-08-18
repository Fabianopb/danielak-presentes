import * as React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Dimmer, Loader, Button, Divider, Image } from 'semantic-ui-react';
import * as _ from 'lodash';
import { productActions } from '../../actions/products';
import { categoryActions } from '../../actions/categories';
import styles from './AdminMain.module.scss';

type StateProps = {
  products: ProductsState
  categories: CategoriesState;
};

type DispatchProps = {
  productActions: typeof productActions;
  categoryActions: typeof categoryActions;
};

type OwnProps = {};

type AdminMainProps = StateProps & DispatchProps & OwnProps;

class AdminMain extends React.Component<AdminMainProps> {
  public componentDidMount () {
    this.props.productActions.fetchProducts();
    this.props.categoryActions.fetchCategories();
  }

  public render () {
    const { data: prodData, isFetching: prodIsFetching } = this.props.products;
    const { data: catData, isFetching: catIsFetching } = this.props.categories;
    const { showAdminProduct } = this.props.productActions;
    const { showAdminCategory } = this.props.categoryActions;
    return (
      <div>
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
                  <Table.HeaderCell>Categoria</Table.HeaderCell>
                  <Table.HeaderCell>Preço</Table.HeaderCell>
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
                      <Table.Cell>
                        { category ? category.name : '---' }
                      </Table.Cell>
                      <Table.Cell>
                        { product.currentPrice }
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
                {catData.map((category, index) => (
                  <Table.Row className={styles.clickableRow} key={index} onClick={() => showAdminCategory(category._id as string)}>
                    <Table.Cell>{category.name}</Table.Cell>
                    <Table.Cell>{category.description}</Table.Cell>
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
  categories: state.categories
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...productActions }, dispatch),
  categoryActions: bindActionCreators({ ...categoryActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMain);
