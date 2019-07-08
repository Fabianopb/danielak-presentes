import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimmer, Loader, Icon, Button, Modal, Header } from 'semantic-ui-react';
import { routerActions } from 'connected-react-router';
import CategoryForm from '../../forms/Category/CategoryForm';
import { categoryActions } from '../../actions/categories';
import styles from './AdminCategory.module.scss';

interface StateProps {
  categories: CategoriesState;
  match: string;
}

interface DispatchProps {
  categoryActions: typeof categoryActions;
  routerActions: typeof routerActions;
}

type AdminCategoryProps = StateProps & DispatchProps;

class AdminCategory extends React.Component<AdminCategoryProps> {
  public componentWillMount() {
    this.props.categoryActions.fetchCategory(this.props.match);
  }

  public render() {
    const { isFetching: isFetchingCategories, isDialogOpen, activeCategory } = this.props.categories;
    const { match } = this.props;
    const { deleteCategory } = this.props.categoryActions;
    const { openDialog, closeDialog } = this.props.categoryActions;
    const { goBack } = this.props.routerActions;
    return (
      <div className={styles.adminCategory}>
        <div className={styles.addCategoryHeader}>
          <h3>Adicionar categoria</h3>
          <div className={styles.actionButtons}>
            <Button basic={true} icon={true} labelPosition="right" color="blue" onClick={goBack}>
              Voltar<Icon name="chevron left" />
            </Button>
            <Button
              icon={true}
              labelPosition="right"
              color="red"
              disabled={match === 'new'}
              onClick={() => openDialog()}
            >
              Remover
              <Icon name="trash" />
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
        <Modal open={isDialogOpen} onClose={closeDialog} size="small">
          <Header icon="trash" content="Apagar produto" />
          <Modal.Content>
            <p>Tem certeza que deseja apagar a categoria <em>{activeCategory && activeCategory.name}</em>?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic={true} icon={true} labelPosition="right" color="blue" onClick={closeDialog} >
              Cancelar<Icon name="ban" />
            </Button>
            <Button
              icon={true}
              labelPosition="right"
              color="red"
              onClick={() => deleteCategory((activeCategory as Category)._id as string)}
            >
              Remover<Icon name="remove" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  private submitCategory = (category: Category) => {
    if (this.props.match === 'new') {
      delete category._id;
    }
    this.props.categoryActions.upsertCategory(category);
  }
}

export default connect<StateProps, DispatchProps, {}, RootState>(
  (state) => ({
    categories: state.categories,
    match: state.router.location.pathname.replace('/admin/category/', ''),
  }),
  (dispatch) => ({
    categoryActions: bindActionCreators({ ...categoryActions }, dispatch),
    routerActions: bindActionCreators({ ...routerActions }, dispatch),
  }),
)(AdminCategory);
