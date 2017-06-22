import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Form } from 'semantic-ui-react';

import Request from '../../modules/requests';
import './manageProduct.css';

class ManageProductView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      product: {
        name: '',
        image: '',
        storeLink: '',
        description: '',
        currentPrice: 0,
        discountPrice: 0,
        tags: '',
        productionTime: 0,
        minAmount: 0,
        dimensions: {
          width: 0,
          height: 0,
          depth: 0,
          weight: 0
        },
        isVisible: false,
        isFeatured: false
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

  setProduct = (product) => {
    // TODO: The state should reflect the backend object so the loop below can be removed
    const stateProduct = this.state.product;
    const stateDimensions = this.state.product.dimensions;
    for (const prop in stateProduct) {
      if (stateProduct.hasOwnProperty(prop) && !product[prop]) {
        product[prop] = prop === 'isVisible' || prop === 'isFeatured' ? false : '';
      }
    }
    for (const prop in stateDimensions) {
      if (stateDimensions.hasOwnProperty(prop) && !product.dimensions[prop]) {
        product.dimensions[prop] = '';
      }
    }
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

  handleForm = (e) => {
    e.preventDefault();
    console.log(this.state.product);
  }

  render () {
    const product = this.state.product;
    return (
      <div>
        <div className='admin-bar'>
          DaniK - Admin View
        </div>
        <h3>Adicionar produto</h3>
        <div className='product-form'>
          <Form onSubmit={this.handleForm} >
            <Form.Group widths='equal'>
              <Form.Input label='Nome do produto' placeholder='Nome do produto' name='name' value={product.name} onChange={this.handleInput} />
              <Form.Input label='URL da imagem' placeholder='URL da imagem' name='image' value={product.image} onChange={this.handleInput} />
              <Form.Input label='Link da loja' placeholder='Link da loja' name='storeLink' value={product.storeLink} onChange={this.handleInput} />
            </Form.Group>
            <Form.TextArea label='Descrição' placeholder='Descrição do produto' name='description' value={product.description} onChange={this.handleInput} />
            <Form.Group widths='equal'>
              <Form.Input label='Preço' placeholder='Preço' name='currentPrice' value={product.currentPrice} onChange={this.handleInput} />
              <Form.Input label='Preço com desconto' placeholder='Preço com desconto' name='discountPrice' value={product.discountPrice} onChange={this.handleInput} />
            </Form.Group>
            <Form.Input label='Tags' placeholder='Tags' name='tags' value={product.tags} onChange={this.handleInput} />
            <Form.Group widths='equal'>
              <Form.Input label='Tempo de produção' placeholder='Tempo de produção' name='productionTime' value={product.productionTime} onChange={this.handleInput} />
              <Form.Input label='Quantidade mínima' placeholder='Quantidade mínima' name='minAmount' value={product.minAmount} onChange={this.handleInput} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Altura' placeholder='Altura' name='height' value={product.dimensions.height} onChange={this.handleInput} />
              <Form.Input label='Largura' placeholder='Largura' name='width' value={product.dimensions.width} onChange={this.handleInput} />
              <Form.Input label='Profundidade' placeholder='Profundidade' name='depth' value={product.dimensions.depth} onChange={this.handleInput} />
              <Form.Input label='Peso' placeholder='Peso' name='weight' value={product.dimensions.weight} onChange={this.handleInput} />
            </Form.Group>
            <Form.Checkbox label='Visível' name='isVisible' />
            <Form.Checkbox label='Em destaque' name='isFeatured' />
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
