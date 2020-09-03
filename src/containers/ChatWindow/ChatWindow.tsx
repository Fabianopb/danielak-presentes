import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { messageActions as cMessageActions } from '../../actions/messages';
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
  messageActions: typeof cMessageActions;
}

type ChatWindowProps = StateProps & DispatchProps;

const initialMessage = {
  speaker: 'dani' as const,
  message: 'Olá, posso ajudar? Deixe sua mensagem e seu contato que retornarei em breve!',
  step: 0,
};

const ChatWindow = ({ messages, messageActions }: ChatWindowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([initialMessage]);

  const scrollEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timestamp = localStorage.getItem('chatWindowTimestamp');
    const now = moment();
    if (!timestamp || (timestamp && moment(timestamp).isBefore(now))) {
      now.add(1, 'week');
      localStorage.setItem('chatWindowTimestamp', now.toISOString());
      setIsOpen(true);
    }
  }, []);

  const toggleWindow = (): void => {
    setIsOpen(!isOpen);
  }

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const sendMessage = () => {
    if (input) {
      const newEntry = chatHistory.concat({ speaker: 'user', message: input })
      setInput('');
      setChatHistory(newEntry);
      scrollToBottom();
      messageActions.saveMessage(newEntry, messages.activeMessageId);
      delay(answerUser, 2000);
    }
  }

  const answerUser = () => {
    const lastDaniMsg = findLast(chatHistory, history => history.speaker === 'dani') as ChatHistory;
    if (lastDaniMsg.step === 0) {
      const newEntry = chatHistory.concat({
        speaker: 'dani',
        message: 'Não esqueça de deixar seu nome, telefone/whatsapp ou e-mail! :)',
        step: 1,
      });
      setChatHistory(newEntry);
      scrollToBottom();
    }
    if (lastDaniMsg.step === 1) {
      const newEntry = chatHistory.concat([
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
      setChatHistory(newEntry);
      scrollToBottom();
    }
  }

  const scrollToBottom = () => {
    if (scrollEl.current) {
      scrollEl.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const iconName = isOpen ? 'close' : 'talk';

  return (
    <div className={styles.chatWindow}>
      <Icon name={iconName} circular={true} inverted={true} color="teal" size="large" onClick={toggleWindow} />
      <div className={cn(styles.chatBox, { [styles.visible]: isOpen })}>
        <div className={styles.content}>
          <div className={styles.topbar}>
            <Icon name="close" link={true} onClick={toggleWindow} />
          </div>
          <div className={styles.body}>
            {chatHistory.map((history, index) => {
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
            <div ref={scrollEl} />
          </div>
          <div className={styles.messageInput}>
            <Input
              value={input}
              transparent={true}
              placeholder="Digite aqui..."
              onChange={(_, data: InputOnChangeData) => setInput(data.value)}
              onKeyPress={handleKeyPress}
            />
            <Icon name="send" color="grey" link={true} onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  messages: state.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  messageActions: bindActionCreators({ ...cMessageActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
