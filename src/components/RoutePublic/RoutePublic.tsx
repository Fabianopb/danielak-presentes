import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import danikLogo from '../../assets/danik-logo.png';
import danikLua from '../../assets/danik-lua.png';
import CategoryMenu from '../../containers/CategoryMenu/CategoryMenu';
import styles from './RoutePublic.module.scss';

type RoutePublicProps = RouteProps & {
  component: any;
};

class RoutePublic extends React.Component<RoutePublicProps> {
  public render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        <div>
          <Grid className={styles.header} fluid={true}>
            <Row>
              <Col xs={12}>
                <Row center="xs">
                  <Col xs={12} lg={8} className={styles.logoContainer}>
                    <img className={styles.logo} src={danikLogo} alt='logo' />
                    <img className={styles.lua} src={danikLua} alt='lua' />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <CategoryMenu />
              </Col>
            </Row>
          </Grid>
          <div className={styles.routeLayout}>
            <Component {...props} />
          </div>
          <div className={styles.footer}>
            <div>danielakpresentes@yahoo.com.br</div>
            <div>Whatsapp +55 11 99777 5245</div>
          </div>
        </div>
      )} />
    );
  }
}

export default RoutePublic;
