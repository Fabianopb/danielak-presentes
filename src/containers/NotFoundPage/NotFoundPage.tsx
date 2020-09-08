import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { useLocation, useHistory } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react';
import eyes from '../../assets/eyes-404.png';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const location = useLocation();
  const history = useHistory();

  const blogUrl = `http://danielakpresentes.blogspot.com${location.pathname}`;

  return (
    <Row center="xs">
      <Col xs={12} lg={8}>
        <div className={styles.notFoundPage}>
          <div className={styles.title404}>
            <div className={styles.number404}>Ops!... 404</div>
            <Image src={eyes} />
          </div>
          <p>A página que você procurava não foi encontrada</p>
          <p>
            Talvez você estivesse procurando por algo em meu blog? Se for este o caso tente acessar:
            <br />
            <a href={blogUrl} target="_blank" rel="noopener noreferrer">
              {blogUrl}
            </a>
          </p>
          <p>E de qualquer forma não deixe de conferir nossos lindos produtos!</p>
          <Button primary name="home" onClick={() => history.push('/')}>
            Home
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default NotFoundPage;
