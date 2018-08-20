import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { match } from 'react-router';
import { formValueSelector } from 'redux-form';
import { Dimmer, Loader, Icon, Modal, Button, Header } from 'semantic-ui-react';
import ProductForm from '../../forms/Product/Product';
import { routerActions } from 'connected-react-router';
import { productActions } from '../../actions/products';
import { categoryActions } from '../../actions/categories';
import styles from './AdminProduct.module.scss';

type StateProps = {
  products: ProductsState;
  categories: CategoriesState;
  formValues: {
    images: ProductImage[];
  }
};

type DispatchProps = {
  productActions: typeof productActions;
  categoryActions: typeof categoryActions;
  routerActions: typeof routerActions;
};

type OwnProps = {
  match: match<{id: string}>;
};

type AdminProductProps = StateProps & DispatchProps & OwnProps;

class AdminProduct extends React.Component<AdminProductProps> {
  public componentWillMount () {
    this.props.categoryActions.fetchCategories();
    this.props.productActions.fetchProducts(this.props.match.params.id);
  }

  public render () {
    const { isFetching: isFetchingProducts, activeProduct, isDialogOpen } = this.props.products;
    const { isFetching: isFetchingCategories, data: categories } = this.props.categories;
    const { images } = this.props.formValues;
    const { openDialog, closeDialog, deleteProduct, handleFileDrop, deleteImage } = this.props.productActions;
    const { goBack } = this.props.routerActions;
    const { params } = this.props.match;
    return (
      <div className={styles.adminProduct}>
        <div className={styles.addProductHeader}>
          <h3>Adicionar produto</h3>
          <div className={styles.actionButtons}>
            <Button basic={true} icon={true} labelPosition='right' color='blue' onClick={goBack}>
              Voltar<Icon name='chevron left' />
            </Button>
            <Button
              icon={true}
              labelPosition='right'
              color='red'
              disabled={params.id === 'new'}
              onClick={() => openDialog(activeProduct as Product)}
            >
              Remover
              <Icon name='trash' />
            </Button>
          </div>
        </div>
        {isFetchingProducts || isFetchingCategories ? (
          <Dimmer active={true} inverted={true}>
            <Loader />
          </Dimmer>
        ) : (
          <ProductForm
            images={images}
            handleFileDrop={handleFileDrop}
            deleteImage={deleteImage}
            categories={categories}
            onSubmit={this.submitProduct}
          />
        )}
        <Modal open={isDialogOpen} onClose={closeDialog} size='small'>
          <Header icon='trash' content='Apagar produto' />
          <Modal.Content>
            <p>Tem certeza que deseja apagar o produto <em>{activeProduct && activeProduct.name}</em>?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic={true} icon={true} labelPosition='right' color='blue' onClick={closeDialog} >
              Cancelar<Icon name='ban' />
            </Button>
            <Button icon={true} labelPosition='right' color='red' onClick={() => deleteProduct((activeProduct as Product)._id)} >
              Remover<Icon name='remove' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  private submitProduct = (product: Product): void => {
    if (this.props.match.params.id === 'new') {
      delete product._id;
    }
    this.props.productActions.upsertProduct(product as Product);
  };
}

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  categories: state.categories,
  formValues: {
    images: formValueSelector('editProductForm')(state, 'image')
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...productActions }, dispatch),
  categoryActions: bindActionCreators({ ...categoryActions }, dispatch),
  routerActions: bindActionCreators({ ...routerActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);
