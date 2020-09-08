import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import LoginForm from '../../forms/Login/Login';
import styles from './LoginPage.module.scss';
import { loginAdminUser } from '../../api';
import { setSession } from '../../modules/session';

const LoginPage = () => {
  const history = useHistory();

  const [loginError, setLoginError] = useState<any>();
  const [isLogging, setIsLogging] = useState(false);

  return (
    <div className={styles.loginPage}>
      <h3 className={styles.loginTitle}>Login</h3>
      {isLogging ? (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      ) : (
        <div>
          {!!loginError && <div className={styles.loginError}>Login Failed</div>}
          <div className={styles.loginContainer}>
            <LoginForm
              onSubmit={async creds => {
                try {
                  setIsLogging(true);
                  const { token, expiry } = await loginAdminUser(creds);
                  setSession(token, expiry);
                  history.push('/admin');
                } catch (error) {
                  setLoginError(error);
                } finally {
                  setIsLogging(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
