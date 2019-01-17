import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import cn from 'classnames';
import styles from './ChatWindow.module.scss';

type ChatWindowState = {
  isOpen: boolean;
}

const initialState: ChatWindowState = { isOpen: false };

class ChatWindow extends React.Component<{}, ChatWindowState> {
  public state = initialState;

  public render() {
    const { isOpen } = this.state;
    const iconName = isOpen ? 'close' : 'talk';
    return (
      <div className={styles.chatWindow}>
        <Icon name={iconName} circular={true} inverted={true} color='teal' size='large' onClick={this.toggleWindow} />
        <div className={cn(styles.box, { [styles.visible]: isOpen })}>Chat box</div>
      </div>
    );
  }

  private toggleWindow = (): void => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }
}

export default ChatWindow;
