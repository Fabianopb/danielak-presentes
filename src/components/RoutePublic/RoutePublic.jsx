import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import danikLogo from '../../assets/danik-logo.png';
import danikLua from '../../assets/danik-lua.png';
import { isSessionValid } from '../../actions/users';
import CategoryMenu from '../../containers/CategoryMenu/CategoryMenu';

import styles from './RoutePublic.module.scss';

class RoutePublic extends Component {
  render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        <div>
          <div className={styles.header}>
            <img className={styles.logo} src={danikLogo} alt='logo' />
            <img className={styles.lua} src={danikLua} alt='lua' />
          </div>
          <CategoryMenu />
          <div className={styles.routeLayout}>
            <Component {...props} />
          </div>
          <div className={styles.footer}>
            <p>danielakpresentes@yahoo.com.br</p>
            <p>Whatsapp +55 11 99777 5245</p>
          </div>
        </div>
      )} />
    );
  }
}

RoutePublic.propTypes = {
  component: PropTypes.func.isRequired,
  isSessionValid: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({isSessionValid}, dispatch);

export default connect(null, mapDispatchToProps)(RoutePublic);
