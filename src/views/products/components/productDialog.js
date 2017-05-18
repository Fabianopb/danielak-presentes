import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ProductDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      isDialogOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isDialogOpen !== this.state.isDialogOpen) {
      this.setState({ isDialogOpen: nextProps.isDialogOpen });
    }
    if (nextProps.product !== this.state.product) {
      this.setState({ product: nextProps.product });
    }
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this.props.handleClose }
      />,
      <FlatButton
        label="Submit"
        primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this.props.handleClose }
      />,
    ];

    return (
      <Dialog
        title={ this.state.product && this.state.product.name }
        actions={ actions }
        modal={ false }
        open={ this.state.isDialogOpen }
        onRequestClose={ this.props.handleClose }
      >
        { this.state.product &&
          <div className="dialog-content">
            <div className="description">{ this.state.product.description }</div>
            <div className="current-price">{ this.state.product.currentPrice }</div>
          </div>
        }
      </Dialog>
    );
  }
}

export default ProductDialog;
