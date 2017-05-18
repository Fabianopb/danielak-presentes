import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import './admin.css';

class AdminView extends Component {

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
          <TextField floatingLabelText="Nome do produto" />
          <TextField floatingLabelText="URL da imagem" />
          <TextField floatingLabelText="Descrição" multiLine={ true } />
          <div className="inline-form">
            <TextField floatingLabelText="Preço" />
            <TextField floatingLabelText="Preço com desconto" />
          </div>
          <TextField floatingLabelText="Tags" />
          <div className="inline-form">
            <TextField floatingLabelText="Tempo de produção" />
            <TextField floatingLabelText="Quantidade mínima" />
          </div>
          <div className="inline-form">
            <TextField floatingLabelText="Altura" />
            <TextField floatingLabelText="Largura" />
            <TextField floatingLabelText="Profundidade" />
            <TextField floatingLabelText="Peso" />
          </div>
          <Checkbox label="Visível" />
          <Checkbox label="Em destaque" />
        </div>
      </div>
    );
  }
}

export default AdminView;
