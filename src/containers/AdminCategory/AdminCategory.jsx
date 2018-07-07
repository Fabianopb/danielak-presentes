import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader, Icon, Button, Modal, Header } from 'semantic-ui-react';
import history from '../../modules/history';

import CategoryForm from '../../forms/Category/CategoryForm';
import { fetchCategories, upsertCategory, openDialog, closeDialog, deleteCategory } from '../../actions/categories';

import styles from './AdminCategory.module.scss';

class AdminCategory extends Component {
  componentWillMount () {
    this.props.fetchCategories(this.props.match.params.id);
  }

  submitCategory = (category) => {
    if (this.props.match.params.id === 'new') {
      delete category._id;
    }
    this.props.upsertCategory(category);
  };

  render () {
    const { isFetching: isFetchingCategories, isDialogOpen, activeCategory } = this.props.categories;
    const { params } = this.props.match;
    const { openDialog, closeDialog, deleteCategory } = this.props;
    return (
      <div>
        <div className={styles.addCategoryHeader}>
          <h3>Adicionar categoria</h3>
          <div className={styles.actionButtons}>
            <Button basic icon labelPosition='right' color='blue' onClick={() => history.goBack()}>
              Voltar<Icon name='chevron left' />
            </Button>
            <Button
              icon
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
          <Dimmer active inverted>
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
            <Button basic icon labelPosition='right' color='blue' onClick={closeDialog} >
              Cancelar<Icon name='ban' />
            </Button>
            <Button icon labelPosition='right' color='red' onClick={() => deleteCategory(activeCategory._id)} >
              Remover<Icon name='remove' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

AdminCategory.propTypes = {
  match: PropTypes.object.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  upsertCategory: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps, {
  fetchCategories, upsertCategory, openDialog, closeDialog, deleteCategory
})(AdminCategory);
