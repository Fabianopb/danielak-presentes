import * as React from 'react';
import { Icon, Image, Input, InputOnChangeData } from 'semantic-ui-react';
import cn from 'classnames';
import danikLua from '../../assets/danik-lua.png';
import styles from './ChatWindow.module.scss';

type ChatWindowState = {
  isOpen: boolean;
  message: string;
  chatHistory: string[];
}

const initialState: ChatWindowState = {
  isOpen: true,
  message: '',
  chatHistory: []
};

class ChatWindow extends React.Component<{}, ChatWindowState> {
  public state = initialState;

  public render() {
    const { isOpen, message } = this.state;
    const iconName = isOpen ? 'close' : 'talk';
    return (
      <div className={styles.chatWindow}>
        <Icon name={iconName} circular={true} inverted={true} color='teal' size='large' onClick={this.toggleWindow} />
        <div className={cn(styles.chatBox, { [styles.visible]: isOpen })}>
          <div className={styles.content}>
            <div className={styles.topbar}>
              <Icon name='close' link={true} onClick={this.toggleWindow} />
            </div>
            <div className={styles.body}>
              <div className={styles.danikMsg}>
                <Image src={danikLua} bordered={true} circular={true} width={32} height={32} />
                <div className={styles.bullet}>Olá em que posso ajudar?</div>
              </div>
              { this.state.chatHistory.map((msg, index) => (
                <div key={index} className={styles.userMsg}>
                  <div className={styles.bullet}>{msg}</div>
                  <div className={styles.iconWrapper}>
                    <Icon name='user' circular={true} inverted={true} color='grey' />
                  </div>
                </div>
              )) }
            </div>
            <div className={styles.messageInput}>
              <Input
                value={message}
                transparent={true}
                placeholder='Digite aqui...'
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
              <Icon name='send' color='grey' link={true} onClick={this.sendMessage} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private toggleWindow = (): void => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  private handleChange = (event: {}, data: InputOnChangeData) => {
    this.setState({ message: data.value });
  }

  private handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  private sendMessage = () => {
    const { message, chatHistory } = this.state;
    if (message) {
      const history = chatHistory.concat(message);
      this.setState({ message: '', chatHistory: history });
    }
  }
}

export default ChatWindow;
