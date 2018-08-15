import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSessionValid } from '../../modules/session';
import { userActions } from '../../actions/users';
import styles from './RoutePrivate.module.scss';

type RoutePrivateProps = RouteProps & {
  component: any;
  userActions: typeof userActions;
};

class RoutePrivate extends React.Component<RoutePrivateProps> {
  public render () {
    const { component: Component, ...rest } = this.props;
    const { logout } = this.props.userActions;
    return (
      <Route {...rest} render={props =>
        isSessionValid() ? (
          <div>
            <div className={styles.header}>
              <div>Danik - Admin View</div>
              <div className={styles.actions}>
                <div className={styles.logout} onClick={logout}>Logout</div>
                <div>&nbsp;&nbsp;/&nbsp;&nbsp;</div>
                <a className={styles.homeLink} href='/' target='_blank'>Ver site</a>
              </div>
            </div>
            <div className={styles.routeLayout}>
              <Component {...props} />
            </div>
          </div>
        ) : (
          <Redirect to={{
            pathname: '/login'
          }} />
        )
      } />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userActions: bindActionCreators({ ...userActions }, dispatch)
});

export default connect(null, mapDispatchToProps)(RoutePrivate);
