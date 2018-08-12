import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { match } from "react-router";
import { Dimmer, Loader, Icon, Button, Modal, Header } from 'semantic-ui-react';
import history from '../../modules/history';
import CategoryForm from '../../forms/Category/CategoryForm';
import { fetchCategoriesThunk, upsertCategoryThunk, categoryActions, deleteCategoryThunk } from '../../actions/categories';
import styles from './AdminCategory.module.scss';

type StateProps = {
  categories: CategoriesState;
};

type DispatchProps = {
  fetchCategoriesThunk: any;
  upsertCategoryThunk: any;
  categoryActions: typeof categoryActions;
  deleteCategoryThunk: any;
};

type OwnProps = {
  match: match<{id: string}>;
};

type AdminCategoryProps = StateProps & DispatchProps & OwnProps;

class AdminCategory extends React.Component<AdminCategoryProps> {
  public componentWillMount () {
    this.props.fetchCategoriesThunk(this.props.match.params.id);
  }

  public render () {
    const { isFetching: isFetchingCategories, isDialogOpen, activeCategory } = this.props.categories;
    const { params } = this.props.match;
    const { deleteCategoryThunk: delCat } = this.props;
    const { openDialog, closeDialog } = this.props.categoryActions;
    return (
      <div>
        <div className={styles.addCategoryHeader}>
          <h3>Adicionar categoria</h3>
          <div className={styles.actionButtons}>
            <Button basic={true} icon={true} labelPosition='right' color='blue' onClick={() => history.goBack()}>
              Voltar<Icon name='chevron left' />
            </Button>
            <Button
              icon={true}
              labelPosition='right'
              color='red'
              disabled={params.id === 'new'}
              onClick={() => openDialog()}
            >
              Remover
              <Icon name='trash' />
            </Button>
          </div>
        </div>
        {isFetchingCategories ? (
          <Dimmer active={true} inverted={true}>
            <Loader />
          </Dimmer>
        ) : (
          <CategoryForm onSubmit={this.submitCategory} />
        )}
        <Modal open={isDialogOpen} onClose={closeDialog} size='small'>
          <Header icon='trash' content='Apagar produto' />
          <Modal.Content>
            <p>Tem certeza que deseja apagar a categoria <em>{activeCategory && activeCategory.name}</em>?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic={true} icon={true} labelPosition='right' color='blue' onClick={closeDialog} >
              Cancelar<Icon name='ban' />
            </Button>
            <Button icon={true} labelPosition='right' color='red' onClick={() => delCat(activeCategory._id)} >
              Remover<Icon name='remove' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  private submitCategory = (category: any) => {
    if (this.props.match.params.id === 'new') {
      delete category._id;
    }
    this.props.upsertCategoryThunk(category);
  };
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  categoryActions: bindActionCreators({ ...categoryActions }, dispatch),
  fetchCategoriesThunk: bindActionCreators(fetchCategoriesThunk, dispatch),
  upsertCategoryThunk: bindActionCreators(upsertCategoryThunk, dispatch),
  deleteCategoryThunk: bindActionCreators(deleteCategoryThunk, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory);