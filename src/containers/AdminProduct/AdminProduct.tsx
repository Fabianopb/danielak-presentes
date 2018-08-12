import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { match } from 'react-router';
import { formValueSelector } from 'redux-form';
import { Dimmer, Loader, Icon, Modal, Button, Header } from 'semantic-ui-react';
import history from '../../modules/history';
import ProductForm from '../../forms/Product/Product';
import { fetchProductsThunk, upsertProductThunk, productActions, deleteProductThunk, handleFileDropThunk, deleteImageThunk } from '../../actions/products';
import { fetchCategoriesThunk } from '../../actions/categories';
import styles from './AdminProduct.module.scss';

type StateProps = {
  products: ProductsState;
  categories: CategoriesState;
  formValues: {
    images: any;
  }
};

type DispatchProps = {
  productActions: typeof productActions;
  fetchProductsThunk: any;
  upsertProductThunk: any;
  deleteProductThunk: any;
  handleFileDropThunk: any;
  deleteImageThunk: any;
  fetchCategoriesThunk: any;
};

type OwnProps = {
  match: match<{id: string}>;
};

type ManageProductViewProps = StateProps & DispatchProps & OwnProps;

class ManageProductView extends React.Component<ManageProductViewProps> {
  public componentWillMount () {
    this.props.fetchCategoriesThunk();
    this.props.fetchProductsThunk(this.props.match.params.id);
  }

  public render () {
    const { isFetching: isFetchingProducts, activeProduct, isDialogOpen } = this.props.products;
    const { isFetching: isFetchingCategories, data: categories } = this.props.categories;
    const { images } = this.props.formValues;
    const { deleteProductThunk: delProd, handleFileDropThunk: dropFile, deleteImageThunk: delImage } = this.props;
    const { openDialog, closeDialog } = this.props.productActions;
    const { params } = this.props.match;
    return (
      <div>
        <div className={styles.addProductHeader}>
          <h3>Adicionar produto</h3>
          <div className={styles.actionButtons}>
            <Button basic={true} icon={true} labelPosition='right' color='blue' onClick={() => history.goBack()}>
              Voltar<Icon name='chevron left' />
            </Button>
            <Button
              icon={true}
              labelPosition='right'
              color='red'
              disabled={params.id === 'new'}
              onClick={() => openDialog(activeProduct)}
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
            handleFileDropThunk={dropFile}
            deleteImageThunk={delImage}
            onSubmit={this.submitProduct}
            categories={categories}
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
            <Button icon={true} labelPosition='right' color='red' onClick={() => delProd(activeProduct._id)} >
              Remover<Icon name='remove' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  private submitProduct = (product: any) => {
    if (this.props.match.params.id === 'new') {
      delete product._id;
    }
    this.props.upsertProductThunk(product);
  };
}

const mapStateToProps = (state: RootState) => ({
  isFetching: state.products.isFetching,
  activeProduct: state.products.activeProduct,
  isDialogOpen: state.products.isDialogOpen,
  categories: state.categories,
  formValues: {
    images: formValueSelector('editProductForm')(state, 'image')
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...productActions }, dispatch),
  fetchProductsThunk: bindActionCreators(fetchProductsThunk, dispatch),
  upsertProductThunk: bindActionCreators(upsertProductThunk, dispatch),
  deleteProductThunk: bindActionCreators(deleteProductThunk, dispatch),
  handleFileDropThunk: bindActionCreators(handleFileDropThunk, dispatch),
  deleteImageThunk: bindActionCreators(deleteImageThunk, dispatch),
  fetchCategoriesThunk: bindActionCreators(fetchCategoriesThunk, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductView);
