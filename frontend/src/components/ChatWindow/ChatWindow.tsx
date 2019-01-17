import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './ChatWindow.module.scss';

const ChatWindow = () => (
  <div className={styles.chatWindow}>
    <Icon name='talk' circular={true} inverted={true} color='teal' size='large' />
  </div>
);

export default ChatWindow;
