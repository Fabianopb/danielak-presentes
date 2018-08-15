import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import * as _ from 'lodash';
import { categoryActions } from '../../actions/categories';
import styles from './CategoryMenu.module.scss';

type StateProps = {
  categories: CategoriesState;
};

type DispatchProps = {
  categoryActions: typeof categoryActions;
};

type OwnProps = {};

type CategoryMenuProps = StateProps & DispatchProps & OwnProps;

class CategoryMenu extends React.Component<CategoryMenuProps> {
  public componentDidMount () {
    this.props.categoryActions.fetchCategories();
  }

  public render () {
    const { data, activeCategory } = this.props.categories;
    return (
      <Row center="xs" className={styles.menu}>
        <Col xs={12} lg={8} >
          <div className={styles.itemsWrapper}>
            <div className={styles.categories}>
              {activeCategory && _.map(data, category =>
                <div
                  key={category._id}
                  className={classNames(styles.menuItem, { [styles.activeItem]: (activeCategory as Category)._id === category._id })}
                  onClick={() => this.handleCategoryChange(category._id as string)}
                >{category.name}
                </div>
              )}
            </div>
            {/*<div className={styles.menuItem}>Sobre</div>*/}
          </div>
        </Col>
      </Row>
    );
  }

  private handleCategoryChange = (categoryId: string | null) => {
    if (categoryId !== (this.props.categories.activeCategory as Category)._id) {
      this.props.categoryActions.changeCategory(categoryId);
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  categoryActions: bindActionCreators({ ...categoryActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
