import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class ProductDialog extends Component {
  constructor (props) {
    super(props);
    this.state = {
      product: props.product,
      isDialogOpen: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isDialogOpen !== this.state.isDialogOpen) {
      this.setState({ isDialogOpen: nextProps.isDialogOpen });
    }
    if (nextProps.product !== this.state.product) {
      this.setState({ product: nextProps.product });
    }
  }

  render () {
    return (
      <Modal open={this.state.isDialogOpen} onClose={this.props.handleClose}>
        <Modal.Header>
          { this.state.product && this.state.product.name }
        </Modal.Header>
        <Modal.Content>
          <p>{ this.state.product && this.state.product.description }</p>
          <p>{ this.state.product && this.state.product.currentPrice }</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.props.handleClose}>No</Button>
          <Button positive onClick={this.props.handleClose}>Yes</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ProductDialog;

ProductDialog.propTypes = {
  product: PropTypes.object,
  isDialogOpen: PropTypes.boolean,
  handleClose: PropTypes.func
};
