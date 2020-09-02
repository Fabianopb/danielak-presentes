import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { formValueSelector } from 'redux-form';
import { Dimmer, Loader, Icon, Modal, Button, Header } from 'semantic-ui-react';
import ProductForm from '../../forms/Product/Product';
import { routerActions as cRouterActions } from 'connected-react-router';
import { productActions as cProductActions } from '../../actions/products';
import { categoryActions as cCategoryActions } from '../../actions/categories';
import styles from './AdminProduct.module.scss';

interface StateProps {
  products: ProductsState;
  categories: CategoriesState;
  formValues: {
    images: ProductImage[];
  };
  match: string;
}

interface DispatchProps {
  productActions: typeof cProductActions;
  categoryActions: typeof cCategoryActions;
  routerActions: typeof cRouterActions;
}

type AdminProductProps = StateProps & DispatchProps;

const AdminProduct = ({ 
  products, 
  categories, 
  formValues,
  match,
  productActions,
  categoryActions,
  routerActions
}: AdminProductProps) => {
  useEffect(() => {
    categoryActions.fetchCategories();
    productActions.fetchProducts(match);
  }, []);

  const submitProduct = (product: Product): void => {
    if (match === 'new') {
      delete product._id;
    }
    productActions.upsertProduct(product as Product);
  }

  return (
    <div className={styles.adminProduct}>
      <div className={styles.addProductHeader}>
        <h3>Adicionar produto</h3>
        <div className={styles.actionButtons}>
          <Button basic={true} icon={true} labelPosition="right" color="blue" onClick={routerActions.goBack}>
            Voltar<Icon name="chevron left" />
          </Button>
          <Button
            icon={true}
            labelPosition="right"
            color="red"
            disabled={match === 'new'}
            onClick={() => productActions.openDialog(products.activeProduct as Product)}
          >
            Remover
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      {products.isFetching || categories.isFetching ? (
        <Dimmer active={true} inverted={true}>
          <Loader />
        </Dimmer>
      ) : (
        <ProductForm
          images={formValues.images}
          handleFileDrop={productActions.handleFileDrop}
          deleteImage={productActions.deleteImage}
          categories={categories.data}
          onSubmit={submitProduct}
        />
      )}
      <Modal open={products.isDialogOpen} onClose={productActions.closeDialog} size="small">
        <Header icon="trash" content="Apagar produto" />
        <Modal.Content>
          <p>Tem certeza que deseja apagar o produto <em>{products.activeProduct && products.activeProduct.name}</em>?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic={true} icon={true} labelPosition="right" color="blue" onClick={productActions.closeDialog} >
            Cancelar<Icon name="ban" />
          </Button>
          <Button icon={true} labelPosition="right" color="red" onClick={() => productActions.deleteProduct((products.activeProduct as Product)._id)} >
            Remover<Icon name="remove" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  categories: state.categories,
  formValues: {
    images: formValueSelector('editProductForm')(state, 'image'),
  },
  match: state.router.location.pathname.replace('/admin/product/', ''),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...cProductActions }, dispatch),
  categoryActions: bindActionCreators({ ...cCategoryActions }, dispatch),
  routerActions: bindActionCreators({ ...cRouterActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);
