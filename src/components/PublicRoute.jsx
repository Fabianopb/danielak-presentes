import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { isSessionValid } from '../modules/actions/users';

import '../styles/App.css';

class PublicRoute extends Component {
  render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        <div className='public-route'>
          <div className='header'>DanielaK Presentes</div>
          <Component {...props} />
          <div className='footer'>
            <p>danielalpresentes@yahoo.com.br</p>
            <p>Whatsapp +55 11 99777 5245</p>
          </div>
        </div>
      )} />
    );
  }
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isSessionValid: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({isSessionValid}, dispatch);

export default connect(null, mapDispatchToProps)(PublicRoute);
