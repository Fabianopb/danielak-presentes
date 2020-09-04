import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dimmer, Loader, Icon, Button, Modal, Header } from "semantic-ui-react";
import { routerActions as cRouterActions } from "connected-react-router";
import CategoryForm from "../../forms/Category/CategoryForm";
import { categoryActions as cCategoryActions } from "../../actions/categories";
import styles from "./AdminCategory.module.scss";

interface StateProps {
  categories: CategoriesState;
  match: string;
}

interface DispatchProps {
  categoryActions: typeof cCategoryActions;
  routerActions: typeof cRouterActions;
}

type AdminCategoryProps = StateProps & DispatchProps;

const AdminCategory = ({
  categories,
  match,
  categoryActions,
  routerActions,
}: AdminCategoryProps) => {
  useEffect(() => {
    categoryActions.fetchCategory(match);
    // eslint-disable-next-line
  }, []);

  const submitCategory = (category: Category) => {
    if (match === "new") {
      delete category._id;
    }
    categoryActions.upsertCategory(category);
  };

  return (
    <div className={styles.adminCategory}>
      <div className={styles.addCategoryHeader}>
        <h3>Adicionar categoria</h3>
        <div className={styles.actionButtons}>
          <Button
            basic
            icon
            labelPosition="right"
            color="blue"
            onClick={routerActions.goBack}
          >
            Voltar
            <Icon name="chevron left" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="red"
            disabled={match === "new"}
            onClick={() => categoryActions.openDialog()}
          >
            Remover
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      {categories.isFetching ? (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      ) : (
        <CategoryForm onSubmit={submitCategory} />
      )}
      <Modal
        open={categories.isDialogOpen}
        onClose={categoryActions.closeDialog}
        size="small"
      >
        <Header icon="trash" content="Apagar produto" />
        <Modal.Content>
          <p>
            Tem certeza que deseja apagar a categoria{" "}
            <em>
              {categories.activeCategory && categories.activeCategory.name}
            </em>
            ?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            icon
            labelPosition="right"
            color="blue"
            onClick={categoryActions.closeDialog}
          >
            Cancelar
            <Icon name="ban" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="red"
            onClick={() =>
              categoryActions.deleteCategory(
                (categories.activeCategory as Category)._id as string
              )
            }
          >
            Remover
            <Icon name="remove" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default connect<StateProps, DispatchProps, {}, RootState>(
  (state) => ({
    categories: state.categories,
    match: state.router.location.pathname.replace("/admin/category/", ""),
  }),
  (dispatch) => ({
    categoryActions: bindActionCreators({ ...cCategoryActions }, dispatch),
    routerActions: bindActionCreators({ ...cRouterActions }, dispatch),
  })
)(AdminCategory);
