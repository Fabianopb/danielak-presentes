import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { login } from '../../actions/users';

import LoginForm from '../../forms/Login/Login';
import styles from './LoginPage.module.scss';

class LoginPage extends Component {
  render () {
    const { isLogging } = this.props.users;
    return (
      <div>
        <h3 className={styles.loginTitle}>Login</h3>
        {isLogging ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <div className={styles.loginContainer}>
            <LoginForm onSubmit={this.props.login} />
          </div>
        )}
      </div>
    );
  }
}

LoginPage.propTypes = {
  users: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { login })(LoginPage);
