import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { userActions } from '../../actions/users';
import LoginForm from '../../forms/Login/Login';
import styles from './LoginPage.module.scss';

type StateProps = {
  users: UsersState;
};

type DispatchProps = {
  userActions: typeof userActions;
};

type LoginPageProps = StateProps & DispatchProps;

class LoginPage extends React.Component<LoginPageProps> {
  public render () {
    const { isLogging } = this.props.users;
    return (
      <div className={styles.loginPage}>
        <h3 className={styles.loginTitle}>Login</h3>
        {isLogging ? (
          <Dimmer active={true} inverted={true}>
            <Loader />
          </Dimmer>
        ) : (
          <div className={styles.loginContainer}>
            <LoginForm onSubmit={this.handleSubmit} />
          </div>
        )}
      </div>
    );
  }

  private handleSubmit = (credentials: LoginRequestParams): void => {
    this.props.userActions.login(credentials);
  }
}

const mapStateToProps = (state: RootState) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userActions: bindActionCreators({ ...userActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
