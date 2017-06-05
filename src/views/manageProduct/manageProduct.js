import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Request from '../../modules/requests';
import './manageProduct.css';

class ManageProductView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      id: props.match.params.id
    }
    this._addProduct = this._addProduct.bind(this);
  }

  componentWillMount() {
    if (this.state.id) {
      Request.getProductById(this.state.id).then((response) => {
        const product = response.data[0];
        // this._setProduct(product);
      });
    }
  }

  _setProduct(product) {
    this._name.input.defaultValue = product.name;
    this._image.input.value = product.image;
    this._storeLink.input.value = product.storeLink;
    this._description.input.refs.input.value = product.description;
    this._currentPrice.input.value = product.currentPrice;
    this._discountPrice.input.value = product.discountPrice;
    this._tags.input.value = product.tags;
    this._productionTime.input.value = product.productionTime;
    this._minAmount.input.value = product.minAmount;
    this._width.input.value = product.width;
    this._height.input.value = product.height;
    this._depth.input.value = product.depth;
    this._weight.input.value = product.weight;
    this._isVisible.setState({switched: product.isVisible});
    this._isFeatured.setState({switched: product.isFeatured});
  }

  _addProduct() {
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
      this.setState({ redirect: <Redirect to='/admin' /> })
      console.log(response);
      this._clearForm();
    }).catch((error) => {
      console.log(error.response);
    });
  }

  _clearForm() {
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

  render() {
    return (
      <div>
        <div className="admin-bar">
          DaniK - Admin View
        </div>
        <h3>Adicionar produto</h3>
        <div className="product-form">

          {/*<TextField floatingLabelText="Nome do produto" ref={ TextField => this._name = TextField } />
          <TextField floatingLabelText="URL da imagem" ref={ TextField => this._image = TextField } />
          <TextField floatingLabelText="Link da loja" ref={ TextField => this._storeLink = TextField } />
          <TextField floatingLabelText="Descrição" multiLine={ true } ref={ TextField => this._description = TextField } />
          <div className="inline-form">
            <TextField floatingLabelText="Preço" ref={ TextField => this._currentPrice = TextField } />
            <TextField floatingLabelText="Preço com desconto" ref={ TextField => this._discountPrice = TextField } />
          </div>
          <TextField floatingLabelText="Tags" ref={ TextField => this._tags = TextField } />
          <div className="inline-form">
            <TextField floatingLabelText="Tempo de produção" ref={ TextField => this._productionTime = TextField } />
            <TextField floatingLabelText="Quantidade mínima" ref={ TextField => this._minAmount = TextField } />
          </div>
          <div className="inline-form">
            <TextField floatingLabelText="Altura" ref={ TextField => this._height = TextField } />
            <TextField floatingLabelText="Largura" ref={ TextField => this._width = TextField } />
            <TextField floatingLabelText="Profundidade" ref={ TextField => this._depth = TextField } />
            <TextField floatingLabelText="Peso" ref={ TextField => this._weight = TextField } />
          </div>
          <Checkbox label="Visível" ref={ Checkbox => this._isVisible = Checkbox } />
          <Checkbox label="Em destaque" ref={ Checkbox => this._isFeatured = Checkbox } />*/}
        </div>
        {/*<RaisedButton label="Adicionar" onClick={ this._addProduct } />*/}
        { this.state.redirect }
      </div>
    );
  }
}

export default ManageProductView;
