import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import * as _ from 'lodash';
import { fetchCategoriesThunk, changeCategoryThunk } from '../../actions/categories';
import styles from './CategoryMenu.module.scss';

type StateProps = {
  categories: CategoriesState;
};

type DispatchProps = {
  fetchCategoriesThunk: any;
  changeCategoryThunk: any;
};

type OwnProps = {};

type CategoryMenuProps = StateProps & DispatchProps & OwnProps;

class CategoryMenu extends React.Component<CategoryMenuProps> {
  public componentDidMount () {
    this.props.fetchCategoriesThunk();
  }

  public render () {
    const { data, activeCategory } = this.props.categories;
    return (
      <Row center="xs" className={styles.menu}>
        <Col xs={12} lg={8} >
          <div className={styles.itemsWrapper}>
            <div className={styles.categories}>
              <div
                className={classNames(styles.menuItem, { [styles.activeItem]: !activeCategory })}
                onClick={() => this.handleCategoryChange(null)}
              >Home
              </div>
              {_.map(data, category =>
                <div
                  key={category._id}
                  className={classNames(styles.menuItem, { [styles.activeItem]: activeCategory === category._id })}
                  onClick={() => this.handleCategoryChange(category._id)}
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
    if (categoryId !== this.props.categories.activeCategory) {
      this.props.changeCategoryThunk(categoryId);
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCategoriesThunk: bindActionCreators(fetchCategoriesThunk, dispatch),
  changeCategoryThunk: bindActionCreators(changeCategoryThunk, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
