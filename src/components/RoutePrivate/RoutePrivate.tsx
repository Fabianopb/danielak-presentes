import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { isSessionValidThunk, logoutThunk } from '../../actions/users';
import styles from './RoutePrivate.module.scss';

type RoutePrivateProps = RouteProps & {
  component: any;
  isSessionValidThunk: () => any;
  logoutThunk: () => any;
};

class RoutePrivate extends React.Component<RoutePrivateProps> {
  public render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props =>
        this.props.isSessionValidThunk() ? (
          <div>
            <div className={styles.header}>
              <div>Danik - Admin View</div>
              <div className={styles.actions}>
                <div className={styles.logout} onClick={this.props.logoutThunk}>Logout</div>
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({isSessionValidThunk, logoutThunk}, dispatch);

export default connect(null, mapDispatchToProps)(RoutePrivate);
