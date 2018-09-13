import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RouterState, routerActions } from 'connected-react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import * as _ from 'lodash';
import * as queryString from 'query-string';
import { productActions } from '../../actions/products';
import { categoryActions } from '../../actions/categories';
import { userActions } from '../../actions/users';
import { isAdminPage } from '../../modules/helpers';
import styles from './CategoryMenu.module.scss';

type StateProps = {
  categories: CategoriesState;
  router: RouterState;
};

type DispatchProps = {
  categoryActions: typeof categoryActions;
  productActions: typeof productActions;
  routerActions: typeof routerActions;
  userActions: typeof userActions;
};

type CategoryMenuProps = StateProps & DispatchProps;

class CategoryMenu extends React.Component<CategoryMenuProps> {
  public componentDidMount () {
    this.props.categoryActions.fetchCategories();
  }

  public componentDidUpdate(prevProps: CategoryMenuProps) {
    if (!_.isEqual(prevProps.router.location.search, this.props.router.location.search)) {
      this.props.productActions.fetchProducts();
    }
  }

  public render () {
    const { data } = this.props.categories;
    const { pathname } = this.props.router.location;
    const { logout } = this.props.userActions;
    const { push } = this.props.routerActions;
    const { search } = this.props.router.location;
    const query = queryString.parse(search);
    const isRoot = pathname === '/';
    return (
      <Row center="xs" className={styles.menu}>
        <Col xs={12} lg={8} >
          <div className={styles.itemsWrapper}>
            {!isAdminPage(pathname) &&
              <React.Fragment>
                <div className={styles.categories}>
                  <div
                    className={classNames(styles.menuItem, { [styles.activeItem]: isRoot && !query.category })}
                    onClick={() => push(`/`)}
                  >Home
                  </div>
                  {_.map(data, (category, index) =>
                    <div
                      key={index}
                      className={classNames(styles.menuItem, { [styles.activeItem]: isRoot && query.category === category._id })}
                      onClick={() => push(`/?category=${category._id}`)}
                    >{category.name}
                    </div>
                  )}
                  {!isRoot &&
                    <div
                      className={styles.menuItem}
                      onClick={() => push(`/${query.category ? `?category=${query.category}` : ''}`)}
                    >&lt;&lt;&nbsp;Voltar
                    </div>
                  }
                </div>
                <div className={styles.menuItem} onClick={() => push('/about')}>Contato</div>
              </React.Fragment>
            }
            {isAdminPage(pathname) &&
              <div className={styles.menuItem} onClick={logout}>Logout</div>
            }
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categories,
  router: state.router
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  categoryActions: bindActionCreators({ ...categoryActions }, dispatch),
  productActions: bindActionCreators({ ...productActions }, dispatch),
  routerActions: bindActionCreators({ ...routerActions }, dispatch),
  userActions: bindActionCreators({ ...userActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
