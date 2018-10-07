import * as React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Location } from 'history';
import { Image, Button } from 'semantic-ui-react';
import eyes from '../../assets/eyes-404.png';
import styles from './NotFoundPage.module.scss';

type NotFoundPageProps = {
  location: Location
};

class NotFoundPage extends React.Component<NotFoundPageProps> {
  public render() {
    const blogUrl = 'http://danielakpresentes.blogspot.com' + this.props.location.pathname;
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
            <Button primary={true} name='home'>Home</Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default NotFoundPage;
