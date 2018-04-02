import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { fetchProducts, showAdminProduct } from '../../modules/actions/products';

import styles from './AdminMain.module.scss';

class AdminMain extends Component {
  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    const { data, isFetching } = this.props.products;
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
          {isFetching ? (
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
                {data.map((product) => (
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
      </div>
    );
  }
}

AdminMain.propTypes = {
  products: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  showAdminProduct: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps, {fetchProducts, showAdminProduct})(AdminMain);
