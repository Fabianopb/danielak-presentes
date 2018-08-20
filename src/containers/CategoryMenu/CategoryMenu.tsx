import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import * as _ from 'lodash';
import { categoryActions } from '../../actions/categories';
import { userActions } from '../../actions/users';
import { isSessionValid } from '../../modules/session';
import styles from './CategoryMenu.module.scss';

type StateProps = {
  categories: CategoriesState;
};

type DispatchProps = {
  categoryActions: typeof categoryActions;
  userActions: typeof userActions;
};

type CategoryMenuProps = StateProps & DispatchProps;

class CategoryMenu extends React.Component<CategoryMenuProps> {
  public componentDidMount () {
    this.props.categoryActions.fetchCategories();
  }

  public render () {
    const { data, activeCategory } = this.props.categories;
    const { logout } = this.props.userActions;
    return (
      <Row center="xs" className={styles.menu}>
        <Col xs={12} lg={8} >
          <div className={styles.itemsWrapper}>
            {!isSessionValid() &&
              <div className={styles.categories}>
                {activeCategory && _.map(data, (category, index) =>
                  <div
                    key={index}
                    className={classNames(styles.menuItem, { [styles.activeItem]: (activeCategory as Category)._id === category._id })}
                    onClick={() => this.handleCategoryChange(category._id as string)}
                  >{category.name}
                  </div>
                )}
              </div>
            }
            {isSessionValid() &&
              <div className={styles.menuItem} onClick={logout}>Logout</div>
            }
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
  categoryActions: bindActionCreators({ ...categoryActions }, dispatch),
  userActions: bindActionCreators({ ...userActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
