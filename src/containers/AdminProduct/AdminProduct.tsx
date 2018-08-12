import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { match } from 'react-router';
import { formValueSelector } from 'redux-form';
import { Dimmer, Loader, Icon, Modal, Button, Header } from 'semantic-ui-react';
import history from '../../modules/history';
import ProductForm from '../../forms/Product/Product';
import { fetchProducts, upsertProduct, productActions, deleteProduct, handleFileDrop, deleteImage } from '../../actions/products';
import { fetchCategories } from '../../actions/categories';
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
  fetchProducts: any;
  upsertProduct: any;
  deleteProduct: any;
  handleFileDrop: any;
  deleteImage: any;
  fetchCategories: any;
};

type OwnProps = {
  match: match<{id: string}>;
};

type ManageProductViewProps = StateProps & DispatchProps & OwnProps;

class ManageProductView extends React.Component<ManageProductViewProps> {
  public componentWillMount () {
    this.props.fetchCategories();
    this.props.fetchProducts(this.props.match.params.id);
  }

  public render () {
    const { isFetching: isFetchingProducts, activeProduct, isDialogOpen } = this.props.products;
    const { isFetching: isFetchingCategories, data: categories } = this.props.categories;
    const { images } = this.props.formValues;
    const { deleteProduct: delProd, handleFileDrop: dropFile, deleteImage: delImage } = this.props;
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
            handleFileDrop={dropFile}
            deleteImage={delImage}
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
    this.props.upsertProduct(product);
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
  fetchProducts: bindActionCreators(fetchProducts, dispatch),
  upsertProduct: bindActionCreators(upsertProduct, dispatch),
  deleteProduct: bindActionCreators(deleteProduct, dispatch),
  handleFileDrop: bindActionCreators(handleFileDrop, dispatch),
  deleteImage: bindActionCreators(deleteImage, dispatch),
  fetchCategories: bindActionCreators(fetchCategories, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductView);
