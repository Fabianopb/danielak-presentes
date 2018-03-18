import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { fetchProducts, showProductEditor } from '../modules/actions/products';

import '../styles/admin.css';

class AdminView extends Component {
  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    const { data, isFetching } = this.props.products;
    const { showProductEditor } = this.props;
    return (
      <div className='admin-view'>
        <h3>Lista de produtos</h3>
        <div className='add-product'>
          <Link to='/admin/product/new'>
            <div>Adicionar Produto</div>
            <Icon name='plus' />
          </Link>
        </div>
        <div className='product-list'>
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
                  <Table.Row key={product._id} onClick={() => showProductEditor(product._id)}>
                    <Table.Cell className='name-row'>
                      <div className='thumbnail-container'>
                        <img className='thumbnail' src={product.image[product.featuredImageIndex].small} alt='N/A' />
                      </div>
                      <div className='product-name'>{ product.name }</div>
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

AdminView.propTypes = {
  products: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  showProductEditor: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps, {fetchProducts, showProductEditor})(AdminView);
