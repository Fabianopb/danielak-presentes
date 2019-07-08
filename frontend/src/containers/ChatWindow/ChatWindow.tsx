import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { messageActions } from '../../actions/messages';
import { Icon, Image, Input, InputOnChangeData } from 'semantic-ui-react';
import cn from 'classnames';
import moment from 'moment';
import { findLast, delay } from 'lodash';
import robotAvatar from '../../assets/dani-robot.png';
import styles from './ChatWindow.module.scss';

interface StateProps {
  messages: MessagesState;
}

interface DispatchProps {
  messageActions: typeof messageActions;
}

type ChatWindowProps = StateProps & DispatchProps;

interface ChatWindowState {
  isOpen: boolean;
  input: string;
  chatHistory: ChatHistory[];
}

const initialState: ChatWindowState = {
  isOpen: false,
  input: '',
  chatHistory: [
    {
      speaker: 'dani',
      message: 'Olá, posso ajudar? Deixe sua mensagem e seu contato que retornarei em breve!',
      step: 0,
    },
  ],
};

class ChatWindow extends React.Component<ChatWindowProps, ChatWindowState> {
  public state = initialState;

  private scrollEl = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const timestamp = localStorage.getItem('chatWindowTimestamp');
    const now = moment();
    if (!timestamp || (timestamp && moment(timestamp).isBefore(now))) {
      now.add(1, 'week');
      localStorage.setItem('chatWindowTimestamp', now.toISOString());
      this.setState({ isOpen: true });
    }
  }

  public render() {
    const { isOpen, input } = this.state;
    const iconName = isOpen ? 'close' : 'talk';
    return (
      <div className={styles.chatWindow}>
        <Icon name={iconName} circular={true} inverted={true} color="teal" size="large" onClick={this.toggleWindow} />
        <div className={cn(styles.chatBox, { [styles.visible]: isOpen })}>
          <div className={styles.content}>
            <div className={styles.topbar}>
              <Icon name="close" link={true} onClick={this.toggleWindow} />
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
                        <Icon name="user" circular={true} inverted={true} color="grey" />
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
              <div ref={this.scrollEl} />
            </div>
            <div className={styles.messageInput}>
              <Input
                value={input}
                transparent={true}
                placeholder="Digite aqui..."
                onChange={(_, data: InputOnChangeData) => this.setState({ input: data.value })}
                onKeyPress={this.handleKeyPress}
              />
              <Icon name="send" color="grey" link={true} onClick={this.sendMessage} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private toggleWindow = (): void => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
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
      this.setState({ input: '', chatHistory: newHistory }, () => this.scrollToBottom());
      this.props.messageActions.saveMessage(newHistory, this.props.messages.activeMessageId);
      delay(() => this.answerUser(), 2000);
    }
  }

  private answerUser = () => {
    const { chatHistory } = this.state;
    const lastDaniMsg = findLast(chatHistory, history => history.speaker === 'dani') as ChatHistory;
    if (lastDaniMsg.step === 0) {
      const newHistory = chatHistory.concat({
        speaker: 'dani',
        message: 'Não esqueça de deixar seu nome, telefone/whatsapp ou e-mail! :)',
        step: 1,
      });
      this.setState({ chatHistory: newHistory }, () => this.scrollToBottom());
    }
    if (lastDaniMsg.step === 1) {
      const newHistory = chatHistory.concat([
        {
          speaker: 'dani',
          message: 'Obrigada! Pode continuar enviando mensagens se desejar.',
          step: 2,
        },
        {
          speaker: 'dani',
          message: 'Quando terminar, é só fechar esta janelinha e aguardar o retorno.',
          step: 2,
        },
      ]);
      this.setState({ chatHistory: newHistory }, () => this.scrollToBottom());
    }
  }

  private scrollToBottom = () => {
    if (this.scrollEl && this.scrollEl.current) {
      this.scrollEl.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  messages: state.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  messageActions: bindActionCreators({ ...messageActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
