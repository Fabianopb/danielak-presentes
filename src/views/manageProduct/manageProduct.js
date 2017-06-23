import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Form } from 'semantic-ui-react';

import Request from '../../modules/requests';
import './manageProduct.css';

const initialProductState = {
  name: '',
  image: '',
  storeLink: '',
  description: '',
  currentPrice: '',
  discountPrice: '',
  tags: '',
  productionTime: '',
  minAmount: '',
  width: '',
  height: '',
  depth: '',
  weight: '',
  isVisible: false,
  isFeatured: false
};

class ManageProductView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      product: initialProductState,
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
    // TODO: The backend should save the entire object even if some fields are not required
    const stateProduct = this.state.product;
    for (const prop in stateProduct) {
      if (stateProduct.hasOwnProperty(prop) && !product[prop]) {
        product[prop] = prop === 'isVisible' || prop === 'isFeatured' ? false : '';
      }
    }
    this.setState({product});
  }

  addProduct = () => {
    Request.postProduct(this.state.product).then((response) => {
      this.setState({ redirect: <Redirect to='/admin' /> });
      console.log(response);
    }).catch((error) => {
      console.log(error.response);
    });
  }

  // clearForm = () => this.setState({product: initialProductState});

  handleInput = (e) => {
    const product = Object.assign({}, this.state.product, {[e.target.name]: e.target.value});
    this.setState({product});
  }

  handleForm = (e) => {
    e.preventDefault();
    // TODO: validate form before sending
    this.addProduct();
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
              <Form.Input label='Altura' placeholder='Altura' name='height' value={product.height} onChange={this.handleInput} />
              <Form.Input label='Largura' placeholder='Largura' name='width' value={product.width} onChange={this.handleInput} />
              <Form.Input label='Profundidade' placeholder='Profundidade' name='depth' value={product.depth} onChange={this.handleInput} />
              <Form.Input label='Peso' placeholder='Peso' name='weight' value={product.weight} onChange={this.handleInput} />
            </Form.Group>
            <Form.Checkbox label='Visível' name='isVisible' />
            <Form.Checkbox label='Em destaque' name='isFeatured' />
            <Form.Button>Submit</Form.Button>
          </Form>
        </div>
        { this.state.redirect }
      </div>
    );
  }
}

ManageProductView.propTypes = {
  match: PropTypes.object.isRequired
};

export default ManageProductView;
