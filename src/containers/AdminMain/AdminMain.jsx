import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Icon, Dimmer, Loader, Button, Divider } from 'semantic-ui-react';
import { fetchProducts, showAdminProduct } from '../../actions/products';
import { fetchCategories, showAdminCategory } from '../../actions/categories';

import styles from './AdminMain.module.scss';

class AdminMain extends Component {
  componentDidMount () {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  render () {
    const { data: prodData, isFetching: prodIsFetching } = this.props.products;
    const { data: catData, isFetching: catIsFetching } = this.props.categories;
    const { showAdminProduct, showAdminCategory } = this.props;
    return (
      <div>
        <div className={styles.mgmtHeader}>
          <h2>Lista de produtos</h2>
          <Link to='/admin/product/new'>
            <Button basic icon labelPosition='right' color='blue'>
              Adicionar Produto
              <Icon name='plus' />
            </Button>
          </Link>
        </div>
        <div className={styles.productList}>
          {prodIsFetching ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : (
            <Table singleLine selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Produto</Table.HeaderCell>
                  <Table.HeaderCell>Preço</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {prodData.map((product) => (
                  <Table.Row className={styles.clickableRow} key={product._id} onClick={() => showAdminProduct(product._id)}>
                    <Table.Cell className={styles.nameRow}>
                      <div className={styles.thumbnailContainer}>
                        <img className={styles.thumbnail} src={product.image[product.featuredImageIndex].small} alt='N/A' />
                      </div>
                      <div className={styles.productName}>{ product.name }</div>
                    </Table.Cell>
                    <Table.Cell>
                      { product.currentPrice }
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
        <Divider />
        <div className={styles.mgmtHeader}>
          <h2>Lista de categorias</h2>
          <Link to='/admin/category/new'>
            <Button basic icon labelPosition='right' color='blue'>
              Adicionar Categoria
              <Icon name='plus' />
            </Button>
          </Link>
        </div>
        <div className={styles.productList}>
          {catIsFetching ? (
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
                {catData.map((category) => (
                  <Table.Row className={styles.clickableRow} key={category._id} onClick={() => showAdminCategory(category._id)}>
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

AdminMain.propTypes = {
  products: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  showAdminProduct: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  showAdminCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products,
  categories: state.categories
});

export default connect(
  mapStateToProps,
  {
    fetchProducts,
    showAdminProduct,
    fetchCategories,
    showAdminCategory
  }
)(AdminMain);
