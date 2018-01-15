import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import '../styles/products.css';

class ProductsView extends Component {
  render () {
    const {isFetching, activeProduct} = this.props.products;
    return (
      <div>
        { isFetching ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <div>{ activeProduct.name }</div>
        ) }
      </div>
    );
  }
}

ProductsView.propTypes = {
  products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
