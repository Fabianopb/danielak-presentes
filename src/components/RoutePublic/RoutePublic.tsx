import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import styles from './RoutePublic.module.scss';

type RoutePublicProps = RouteProps & {
  component: any;
};

class RoutePublic extends React.Component<RoutePublicProps> {
  public render () {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        <div className={styles.routeLayout}>
          <Component {...props} />
        </div>
      )} />
    );
  }
}

export default RoutePublic;
