import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { userActions as cUserActions } from '../../actions/users';
import LoginForm from '../../forms/Login/Login';
import styles from './LoginPage.module.scss';

interface StateProps {
  users: UsersState;
}

interface DispatchProps {
  userActions: typeof cUserActions;
}

type LoginPageProps = StateProps & DispatchProps;

const LoginPage = ({ users, userActions }: LoginPageProps) => (
  <div className={styles.loginPage}>
    <h3 className={styles.loginTitle}>Login</h3>
    {users.isLogging ? (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    ) : (
      <div className={styles.loginContainer}>
        <LoginForm
          onSubmit={creds => {
            userActions.login(creds);
          }}
        />
      </div>
    )}
  </div>
);

const mapStateToProps = (state: RootState) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userActions: bindActionCreators({ ...cUserActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
