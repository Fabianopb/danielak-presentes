import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Location } from 'history';
import { routerActions } from 'connected-react-router';
import { Image, Button } from 'semantic-ui-react';
import eyes from '../../assets/eyes-404.png';
import styles from './NotFoundPage.module.scss';

type OwnProps = {
  location: Location
};

type DispatchProps = {
  routerActions: typeof routerActions;
};

type NotFoundPageProps = OwnProps & DispatchProps;

class NotFoundPage extends React.Component<NotFoundPageProps> {
  public render() {
    const blogUrl = 'http://danielakpresentes.blogspot.com' + this.props.location.pathname;
    const { push } = this.props.routerActions;
    return (
      <Row center="xs">
        <Col xs={12} lg={8} >
          <div className={styles.notFoundPage}>
            <div className={styles.title404}>
              <div className={styles.number404}>Ops!... 404</div>
              <Image src={eyes} />
            </div>
            <p>A página que você procurava não foi encontrada</p>
            <p>
              Talvez você estivesse procurando por algo em meu blog? Se for este o caso tente acessar:<br />
              <a href={blogUrl} target='_blank'>{blogUrl}</a>
            </p>
            <p>E de qualquer forma não deixe de conferir nossos lindos produtos!</p>
            <Button primary={true} name='home' onClick={() => push('/')}>Home</Button>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  routerActions: bindActionCreators({ ...routerActions }, dispatch),
});

export default connect(null, mapDispatchToProps)(NotFoundPage);
