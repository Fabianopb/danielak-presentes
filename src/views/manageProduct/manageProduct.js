import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Form } from 'semantic-ui-react';

import Request from '../../modules/requests';
import './manageProduct.css';

// const options = [
//   { key: 'm', text: 'Male', value: 'male' },
//   { key: 'f', text: 'Female', value: 'female' }
// ];

class ManageProductView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      product: {
        name: '',
        image: '',
        storeLink: ''
      },
      value: null,
      redirect: null,
      id: props.match.params.id
    };
  }

  componentWillMount () {
    if (this.state.id !== 'new') {
      Request.getProductById(this.state.id).then((response) => {
        this.setProduct(response.data[0]);
      });
    }
  }

  handleChange = (e, {value}) => this.setState({value});

  setProduct = (product) => {
    // TODO: product properties should always be present
    product.storeLink = '';
    this.setState({product});
    // this._name.input.defaultValue = product.name;
    // this._image.input.value = product.image;
    // this._storeLink.input.value = product.storeLink;
    // this._description.input.refs.input.value = product.description;
    // this._currentPrice.input.value = product.currentPrice;
    // this._discountPrice.input.value = product.discountPrice;
    // this._tags.input.value = product.tags;
    // this._productionTime.input.value = product.productionTime;
    // this._minAmount.input.value = product.minAmount;
    // this._width.input.value = product.width;
    // this._height.input.value = product.height;
    // this._depth.input.value = product.depth;
    // this._weight.input.value = product.weight;
    // this._isVisible.setState({switched: product.isVisible});
    // this._isFeatured.setState({switched: product.isFeatured});
  }

  addProduct = () => {
    Request.postProduct({
      name: this._name.input.value,
      image: [this._image.input.value],
      storeLink: this._storeLink.input.value,
      description: this._description.input.refs.input.value,
      currentPrice: this._currentPrice.input.value,
      discountPrice: this._discountPrice.input.value,
      tags: this._tags.input.value,
      productionTime: this._productionTime.input.value,
      minAmount: this._minAmount.input.value,
      dimensions: {
        width: this._width.input.value,
        height: this._height.input.value,
        depth: this._depth.input.value,
        weight: this._weight.input.value
      },
      isVisible: this._isVisible.state.switched,
      isFeatured: this._isFeatured.state.switched
    }).then((response) => {
      this.setState({ redirect: <Redirect to='/admin' /> });
      console.log(response);
      this.clearForm();
    }).catch((error) => {
      console.log(error.response);
    });
  }

  clearForm = () => {
    this._name.input.value = null;
    this._image.input.value = null;
    this._storeLink.input.value = null;
    this._description.input.refs.input.value = null;
    this._currentPrice.input.value = null;
    this._discountPrice.input.value = null;
    this._tags.input.value = null;
    this._productionTime.input.value = null;
    this._minAmount.input.value = null;
    this._width.input.value = null;
    this._height.input.value = null;
    this._depth.input.value = null;
    this._weight.input.value = null;
    this._isVisible.setState({switched: false});
    this._isFeatured.setState({switched: false});
  }

  handleInput = (e) => this.setState({product: {[e.target.name]: e.target.value}});

  render () {
    return (
      <div>
        <div className='admin-bar'>
          DaniK - Admin View
        </div>
        <h3>Adicionar produto</h3>
        <div className='product-form'>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input label='Nome do produto' placeholder='Nome do produto' name='name' value={this.state.product.name} onChange={this.handleInput} />
              <Form.Input label='URL da imagem' placeholder='URL da imagem' name='image' value={this.state.product.image} onChange={this.handleInput} />
              <Form.Input label='Link da loja' placeholder='Link da loja' name='storeLink' value={this.state.product.storeLink} onChange={this.handleInput} />
              {/* <Form.Select label='Gender' options={options} placeholder='Gender' /> */}
            </Form.Group>
            <Form.Group inline>
              <label>Size</label>
              <Form.Radio label='Small' value='sm' checked={this.state.value === 'sm'} onChange={this.handleChange} />
              <Form.Radio label='Medium' value='md' checked={this.state.value === 'md'} onChange={this.handleChange} />
              <Form.Radio label='Large' value='lg' checked={this.state.value === 'lg'} onChange={this.handleChange} />
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about you...' />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button>Submit</Form.Button>
          </Form>

          {/* <TextField floatingLabelText='Nome do produto' ref={ TextField => this._name = TextField } />
          <TextField floatingLabelText='URL da imagem' ref={ TextField => this._image = TextField } />
          <TextField floatingLabelText='Link da loja' ref={ TextField => this._storeLink = TextField } />
          <TextField floatingLabelText='Descrição' multiLine={ true } ref={ TextField => this._description = TextField } />
          <div className='inline-form'>
            <TextField floatingLabelText='Preço' ref={ TextField => this._currentPrice = TextField } />
            <TextField floatingLabelText='Preço com desconto' ref={ TextField => this._discountPrice = TextField } />
          </div>
          <TextField floatingLabelText='Tags' ref={ TextField => this._tags = TextField } />
          <div className='inline-form'>
            <TextField floatingLabelText='Tempo de produção' ref={ TextField => this._productionTime = TextField } />
            <TextField floatingLabelText='Quantidade mínima' ref={ TextField => this._minAmount = TextField } />
          </div>
          <div className='inline-form'>
            <TextField floatingLabelText='Altura' ref={ TextField => this._height = TextField } />
            <TextField floatingLabelText='Largura' ref={ TextField => this._width = TextField } />
            <TextField floatingLabelText='Profundidade' ref={ TextField => this._depth = TextField } />
            <TextField floatingLabelText='Peso' ref={ TextField => this._weight = TextField } />
          </div>
          <Checkbox label='Visível' ref={ Checkbox => this._isVisible = Checkbox } />
          <Checkbox label='Em destaque' ref={ Checkbox => this._isFeatured = Checkbox } /> */}
        </div>
        {/* <RaisedButton label='Adicionar' onClick={ this.addProduct } /> */}
        { this.state.redirect }
      </div>
    );
  }
}

export default ManageProductView;

ManageProductView.propTypes = {
  match: PropTypes.object.isRequired
};
