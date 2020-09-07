import React, { ReactNode } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import danikLogo from '../../assets/danik-logo.png';
import danikLua from '../../assets/danik-lua.png';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Grid fluid className={styles.layout}>
    <Row center="xs" className={styles.header}>
      <Col xs={12} lg={8} className={styles.logoContainer}>
        <img className={styles.logo} src={danikLogo} alt="logo" />
        <img className={styles.lua} src={danikLua} alt="lua" />
      </Col>
    </Row>
    <Row className={styles.content}>
      <Col xs={12}>{children}</Col>
    </Row>
    <Row>
      <Col xs={12} className={styles.footer}>
        <div>danielakpresentes@yahoo.com.br</div>
        <div>Whatsapp +55 11 99777 5245</div>
      </Col>
    </Row>
  </Grid>
);

export default Layout;
