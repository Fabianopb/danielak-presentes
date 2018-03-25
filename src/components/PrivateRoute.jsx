import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { isSessionValid, logout } from '../modules/actions/users';

import './PrivateRoute.scss';

class PrivateRoute extends Component {
  render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props =>
        this.props.isSessionValid() ? (
          <div className='private-route'>
            <div className='header'>
              <div>Danik - Admin View</div>
              <div className='actions'>
                <div className='logout' onClick={this.props.logout}>Logout</div>
                <div>&nbsp;&nbsp;/&nbsp;&nbsp;</div>
                <a className='home-link' href='/' target='_blank'>Ver site</a>
              </div>
            </div>
            <div className='route-layout'>
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

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isSessionValid: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(null, {isSessionValid, logout})(PrivateRoute);
