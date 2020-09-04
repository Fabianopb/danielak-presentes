import React from "react";
import { Row, Col } from "react-flexbox-grid";
import { Icon } from "semantic-ui-react";
import styles from "./AboutPage.module.scss";

const AboutPage = () => (
  <Row center="xs">
    <Col xs={12} lg={8}>
      <div className={styles.aboutPage}>
        <div className={styles.info}>
          <p>Olá! Que bom ter você por aqui.</p>
          <p>
            Me chamo Daniela e descobri a cartonagem em uma busca para tornar
            meus dias menos estressantes e mais alegres. Logo de cara me
            apaixonei... e foi assim, que há seis anos atrás, nasceu a Dani K.
          </p>
          <p>
            Durante essa jornada, aprendi muitas coisas legais, inclusive a
            criar peças personalizadas sob encomenda. Aqui, desafio dado é
            desafio cumprido! :)
          </p>
          <p>
            Hoje, além da cartonagem, trabalho com semi jóias e bijuterias. Aqui
            você encontra o presente ideal!
          </p>
          <p>
            Cada peça que eu produzo, cada detalhe, é feito com amor, dedicação
            e carinho, pois minha maior recompensa é o sorriso no rosto das
            pessoas.
          </p>
        </div>
        <div className={styles.contacts}>
          <div className={styles.channel}>
            <Icon name="whatsapp" size="large" className={styles.whatsapp} />
            +55 11 99777 5245
          </div>
          <div className={styles.channel}>
            <Icon name="mail" size="large" className={styles.email} />
            <a href="mailto:danielakpresentes@yahoo.com.br">
              danielakpresentes@yahoo.com.br
            </a>
          </div>
          <div className={styles.channel}>
            <Icon name="facebook" size="large" className={styles.facebook} />
            <a
              href="https://www.facebook.com/danikpresentes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.facebook.com/danikpresentes
            </a>
          </div>
          <div className={styles.channel}>
            <Icon name="instagram" size="large" className={styles.instagram} />
            <a
              href="https://www.instagram.com/danikpresentes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.instagram.com/danikpresentes
            </a>
          </div>
        </div>
      </div>
    </Col>
  </Row>
);

export default AboutPage;
