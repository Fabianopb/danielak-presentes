import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { fetchProducts, showAdminProduct } from '../../actions/products';
import { fetchCategories } from '../../actions/categories';

import styles from './AdminMain.module.scss';

class AdminMain extends Component {
  componentDidMount () {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  render () {
    const { data: prodData, isFetching: prodIsFetching } = this.props.products;
    const { data: catData, isFetching: catIsFetching } = this.props.categories;
    const { showAdminProduct } = this.props;
    return (
      <div>
        <h3>Lista de produtos</h3>
        <div className={styles.addProduct}>
          <Link to='/admin/product/new'>
            <div>Adicionar Produto</div>
            <Icon name='plus' />
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
                  <Table.Row key={product._id} onClick={() => showAdminProduct(product._id)}>
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
        <h3>Lista de categorias</h3>
        <div className={styles.productList}>
          {catIsFetching ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : (
            <div>
              {catData.map(cat => <div key={cat._id}>{cat.name}</div>)}
            </div>
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
  fetchCategories: PropTypes.func.isRequired
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
    fetchCategories
  }
)(AdminMain);
