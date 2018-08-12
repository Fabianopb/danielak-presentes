import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { loginThunk } from '../../actions/users';
import LoginForm from '../../forms/Login/Login';
import styles from './LoginPage.module.scss';

type StateProps = {
  users: UsersState;
};

type DispatchProps = {
  loginThunk: any;
};

type OwnProps = {};

type LoginPageProps = StateProps & DispatchProps & OwnProps;

class LoginPage extends React.Component<LoginPageProps> {
  public render () {
    const { isLogging } = this.props.users;
    return (
      <div>
        <h3 className={styles.loginTitle}>Login</h3>
        {isLogging ? (
          <Dimmer active={true} inverted={true}>
            <Loader />
          </Dimmer>
        ) : (
          <div className={styles.loginContainer}>
            <LoginForm onSubmit={this.props.loginThunk} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginThunk: bindActionCreators(loginThunk, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
