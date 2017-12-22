import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { isSessionValid } from '../modules/actions/users';

class PrivateRoute extends Component {
  render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={() => (
        this.props.isSessionValid() ? (
          <Component />
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
  isSessionValid: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({isSessionValid}, dispatch);

export default connect(null, mapDispatchToProps)(PrivateRoute);
