import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import cn from 'classnames';
import styles from './ChatWindow.module.scss';

type ChatWindowState = {
  isOpen: boolean;
}

const initialState: ChatWindowState = { isOpen: true };

class ChatWindow extends React.Component<{}, ChatWindowState> {
  public state = initialState;

  public render() {
    const { isOpen } = this.state;
    const iconName = isOpen ? 'close' : 'talk';
    return (
      <div className={styles.chatWindow}>
        <Icon name={iconName} circular={true} inverted={true} color='teal' size='large' onClick={this.toggleWindow} />
        <div className={cn(styles.chatBox, { [styles.visible]: isOpen })}>
          <div className={styles.content}>
            <div className={styles.topbar}>
              <Icon name='close' onClick={this.toggleWindow} />
            </div>
            <div className={styles.body}>body</div>
            <div className={styles.messageInput}>caixa mensagem</div>
          </div>
        </div>
      </div>
    );
  }

  private toggleWindow = (): void => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }
}

export default ChatWindow;
