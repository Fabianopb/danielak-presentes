import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { login } from '../modules/actions/users';

import LoginForm from '../components/LoginForm';
import './LoginView.css';

class LoginView extends Component {
  render () {
    const { isLogging } = this.props.users;
    return (
      <div className='login-view'>
        <h3 className='login-title'>Login</h3>
        {isLogging ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <div className='login-container'>
            <LoginForm onSubmit={this.props.login} />
          </div>
        )}
      </div>
    );
  }
}

LoginView.propTypes = {
  users: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, {login})(LoginView);
