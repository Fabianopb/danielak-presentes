import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { isSessionValid, logout } from '../../actions/users';

import styles from './RoutePrivate.module.scss';

class RoutePrivate extends Component {
  render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props =>
        this.props.isSessionValid() ? (
          <div>
            <div className={styles.header}>
              <div>Danik - Admin View</div>
              <div className={styles.actions}>
                <div className={styles.logout} onClick={this.props.logout}>Logout</div>
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

RoutePrivate.propTypes = {
  component: PropTypes.func.isRequired,
  isSessionValid: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(null, {isSessionValid, logout})(RoutePrivate);
