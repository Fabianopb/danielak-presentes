import * as React from 'react';
import { Icon, Image, Input, InputOnChangeData } from 'semantic-ui-react';
import cn from 'classnames';
import { findLast, delay } from 'lodash';
import robotAvatar from '../../assets/dani-robot.png';
import styles from './ChatWindow.module.scss';

interface ChatHistory {
  speaker: 'dani' | 'user';
  message: string;
  step?: number;
}

type ChatWindowState = {
  isOpen: boolean;
  input: string;
  chatHistory: ChatHistory[];
};

const initialState: ChatWindowState = {
  isOpen: true,
  input: '',
  chatHistory: [
    {
      speaker: 'dani',
      message: 'Olá, posso ajudar? Deixe sua mensagem e seu contato que retornarei em breve!',
      step: 0
    }
  ]
};

class ChatWindow extends React.Component<{}, ChatWindowState> {
  public state = initialState;

  private scrollDiv: HTMLDivElement;

  public render() {
    const { isOpen, input } = this.state;
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
              {this.state.chatHistory.map((history, index) => {
                if (history.speaker === 'dani') {
                  return (
                    <div key={index} className={styles.danikMsg}>
                      <div className={styles.iconWrapper}>
                        <Image src={robotAvatar} bordered={true} circular={true} />
                      </div>
                      <div className={styles.bullet}>{history.message}</div>
                    </div>
                  );
                } else if (history.speaker === 'user') {
                  return (
                    <div key={index} className={styles.userMsg}>
                      <div className={styles.bullet}>{history.message}</div>
                      <div className={styles.iconWrapper}>
                        <Icon name='user' circular={true} inverted={true} color='grey' />
                      </div>
                    </div>
                  );
                } else {
                  return null
                };
              })}
              <div ref={(el: HTMLDivElement) => this.scrollDiv = el} />
            </div>
            <div className={styles.messageInput}>
              <Input
                value={input}
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

  private handleChange = ({}, data: InputOnChangeData) => {
    this.setState({ input: data.value });
  }

  private handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  private sendMessage = () => {
    const { input, chatHistory } = this.state;
    if (input) {
      const newHistory = chatHistory.concat({ speaker: 'user', message: input });
      this.setState({ input: '', chatHistory: newHistory });
      this.scrollToBottom();
      delay(() => this.answerUser(), 2000);
    }
  }

  private answerUser = () => {
    const { chatHistory } = this.state;
    const lastDaniMsg = findLast(chatHistory, history => history.speaker === 'dani') as ChatHistory;
    if (lastDaniMsg.step === 0) {
      const newHistory = chatHistory.concat({
        speaker: 'dani',
        message: 'Beep! Beep! Estou processando sua mensagem... Algo mais?',
        step: 1
      });
      this.setState({ chatHistory: newHistory });
    }
    if (lastDaniMsg.step === 1) {
      const newHistory = chatHistory.concat({
        speaker: 'dani',
        message: 'Não esqueça de deixar seu telefone/whatsapp ou então e-mail se preferir',
        step: 2
      });
      this.setState({ chatHistory: newHistory });
    }
    if (lastDaniMsg.step === 2) {
      const newHistory = chatHistory.concat({
        speaker: 'dani',
        message: 'A propósito, você lembrou de escrever seu nome? :)',
        step: 3
      });
      this.setState({ chatHistory: newHistory });
    }
    if (lastDaniMsg.step === 3) {
      const newHistory = chatHistory.concat([
        {
          speaker: 'dani',
          message: 'Obrigada! Pode continuar enviando mensagens se desejar, tudo será registrado!',
          step: 4
        },
        {
          speaker: 'dani',
          message: 'Quando terminar, é só fechar esta janelinha.',
          step: 4
        }
      ]);
      this.setState({ chatHistory: newHistory });
    }
    this.scrollToBottom();
  }

  private scrollToBottom = () => {
    this.scrollDiv.scrollIntoView({ behavior: "smooth" });
  }
}

export default ChatWindow;
