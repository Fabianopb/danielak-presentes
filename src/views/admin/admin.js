import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import './admin.css';

class AdminView extends Component {

  constructor(props) {
    super(props);
    this._addProduct = this._addProduct.bind(this);
  }

  _addProduct() {
    const product = {
      name: this._name.input.value,
      image: [this._image.input.value],
      description: this._description.input.value,
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
    };
    console.log(product);
  }

  render() {
    return (
      <div>
        <div className="admin-bar">
          DaniK - Admin View
        </div>
        <h3>Lista de produtos</h3>
        <div className="product-list">
          Nenhum produto encontrado
        </div>
        <hr />
        <div className="product-form">
          <h3>Adicionar produto</h3>
          <TextField floatingLabelText="Nome do produto" ref={ TextField => this._name = TextField } />
          <TextField floatingLabelText="URL da imagem" ref={ TextField => this._image = TextField } />
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
          <Checkbox label="Em destaque" ref={ Checkbox => this._isFeatured = Checkbox } />
          <RaisedButton label="Adicionar" onClick={ this._addProduct } />
        </div>
      </div>
    );
  }
}

export default AdminView;
