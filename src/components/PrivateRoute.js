import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { isSessionValid, logout } from '../modules/actions/users';

import '../styles/App.css';

class PrivateRoute extends Component {
  render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        this.props.isSessionValid() ? (
          <div className='private-route'>
            <div className='header'>
              <div>Danik - Admin View</div>
              <div className='logout' onClick={this.props.logout}>Logout</div>
            </div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={{
            pathname: '/login'
          }} />
        )
      )} />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isSessionValid: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({isSessionValid, logout}, dispatch);

export default connect(null, mapDispatchToProps)(PrivateRoute);
