import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RouterState, routerActions as cRouterActions } from 'connected-react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import _ from 'lodash';
import queryString from 'query-string';
import { productActions as cProductActions } from '../../actions/products';
import { categoryActions as cCategoryActions } from '../../actions/categories';
import { userActions as cUserActions } from '../../actions/users';
import { isAdminPage } from '../../modules/helpers';
import styles from './CategoryMenu.module.scss';

interface StateProps {
  categories: CategoriesState;
  router: RouterState;
}

interface DispatchProps {
  categoryActions: typeof cCategoryActions;
  productActions: typeof cProductActions;
  routerActions: typeof cRouterActions;
  userActions: typeof cUserActions;
}

type CategoryMenuProps = StateProps & DispatchProps;

const CategoryMenu = ({
  categories,
  router,
  categoryActions,
  productActions,
  routerActions,
  userActions,
}: CategoryMenuProps) => {
  useEffect(() => {
    categoryActions.fetchCategories();
  }, [categoryActions]);

  useEffect(() => {
    if (router.location.search) {
      productActions.fetchProducts();
    }
  }, [router.location.search, productActions]);

  const query = queryString.parse(router.location.search);
  const isRoot = router.location.pathname === '/';
  return (
    <Row center="xs" className={styles.menu}>
      <Col xs={12} lg={8}>
        <div className={styles.itemsWrapper}>
          {!isAdminPage(router.location.pathname) && (
            <>
              <div className={styles.categories}>
                <div
                  className={classNames(styles.menuItem, {
                    [styles.activeItem]: isRoot && !query.category,
                  })}
                  onClick={() => routerActions.push(`/`)}
                >
                  Home
                </div>
                {_.map(categories.data, (category, index) => (
                  <div
                    key={index}
                    className={classNames(styles.menuItem, {
                      [styles.activeItem]: isRoot && query.category === category._id,
                    })}
                    onClick={() => routerActions.push(`/?category=${category._id}`)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
              <div className={styles.menuItem} onClick={() => routerActions.push('/about')}>
                Contato
              </div>
            </>
          )}
          {isAdminPage(router.location.pathname) && (
            <div className={styles.menuItem} onClick={userActions.logout}>
              Logout
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: RootState) => ({
  categories: state.categories,
  router: state.router,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  categoryActions: bindActionCreators({ ...cCategoryActions }, dispatch),
  productActions: bindActionCreators({ ...cProductActions }, dispatch),
  routerActions: bindActionCreators({ ...cRouterActions }, dispatch),
  userActions: bindActionCreators({ ...cUserActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
