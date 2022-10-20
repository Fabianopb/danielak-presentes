import { useState, useRef, useEffect } from 'react';
import { Icon, Image, Input, InputOnChangeData } from 'semantic-ui-react';
import cn from 'classnames';
import moment from 'moment';
import robotAvatar from '../../assets/dani-robot.png';
import styles from './ChatWindow.module.scss';
import { createMessage, editMessage } from '../../api';

type ChatHistory = {
  speaker: 'dani' | 'user';
  message: string;
  step?: number;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const botMessages = [
  {
    speaker: 'dani' as const,
    message: 'Olá, posso ajudar? Deixe sua mensagem e seu contato que retornarei em breve!',
    step: 0,
  },
  {
    speaker: 'dani' as const,
    message: 'Não esqueça de deixar seu nome, telefone/whatsapp ou e-mail! :)',
    step: 1,
  },
  {
    speaker: 'dani' as const,
    message: 'Obrigada! Pode continuar enviando mensagens se desejar.',
    step: 2,
  },
  {
    speaker: 'dani' as const,
    message: 'Quando terminar, é só fechar esta janelinha e aguardar o retorno.',
    step: 3,
  },
];

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  console.log(input);
  const [step, setStep] = useState(0);
  const [messageId, setMessageId] = useState<string>();
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  const scrollEl = useRef<HTMLDivElement>(null);

  const previousUserMessageCount = usePrevious(chatHistory.filter((msg) => msg.speaker === 'user').length);

  useEffect(() => {
    const timestamp = localStorage.getItem('chatWindowTimestamp');
    const now = moment();
    if (!timestamp || (timestamp && moment(timestamp).isBefore(now))) {
      now.add(1, 'week');
      localStorage.setItem('chatWindowTimestamp', now.toISOString());
      setIsOpen(true);
    }
  }, []);

  const scrollToBottom = () => {
    if (scrollEl.current) {
      scrollEl.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentUserMessageCount = chatHistory.filter((msg) => msg.speaker === 'user').length;
    if (previousUserMessageCount !== currentUserMessageCount && step < botMessages.length) {
      setChatHistory((currentHistory) => [...currentHistory, botMessages[step]]);
      setStep(step + 1);
      scrollToBottom();
    }
  }, [chatHistory, previousUserMessageCount, step]);

  const toggleWindow = (): void => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (message: string) => {
    const newEntry = { speaker: 'user' as const, message };
    const allUserText = [...chatHistory, newEntry]
      .filter((history) => history.speaker === 'user')
      .map((history) => history.message);
    if (messageId) {
      await editMessage(messageId, allUserText);
    } else {
      const createdMessage = await createMessage(allUserText);
      setMessageId(createdMessage.id);
    }
    setInput('');
    setChatHistory((currentHistory) => [...currentHistory, newEntry]);
    scrollToBottom();
    await delay(2000);
  };

  const handleKeyPress = (event: { key: string }) => {
    if (input && event.key === 'Enter') {
      sendMessage(input);
    }
  };

  const iconName = isOpen ? 'close' : 'talk';

  return (
    <div className={styles.chatWindow}>
      <Icon name={iconName} circular inverted color="teal" size="large" onClick={toggleWindow} />
      <div className={cn(styles.chatBox, { [styles.visible]: isOpen })}>
        <div className={styles.content}>
          <div className={styles.topbar}>
            <Icon name="close" link onClick={toggleWindow} />
          </div>
          <div className={styles.body}>
            {chatHistory.map((history, index) => {
              if (history.speaker === 'dani') {
                return (
                  <div key={history.step} className={styles.danikMsg}>
                    <div className={styles.iconWrapper}>
                      <Image src={robotAvatar} bordered circular />
                    </div>
                    <div className={styles.bullet}>{history.message}</div>
                  </div>
                );
              }
              if (history.speaker === 'user') {
                return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${history.speaker}_${index}`}
                    className={styles.userMsg}
                  >
                    <div className={styles.bullet}>
                      {typeof history.message === 'string' ? history.message : '[falha ao mostrar mensagem]'}
                    </div>
                    <div className={styles.iconWrapper}>
                      <Icon name="user" circular inverted color="grey" />
                    </div>
                  </div>
                );
              }
              return null;
            })}
            <div ref={scrollEl} />
          </div>
          <div className={styles.messageInput}>
            <Input
              value={input}
              transparent
              placeholder="Digite aqui..."
              onChange={(_, data: InputOnChangeData) => setInput(data.value)}
              onKeyPress={handleKeyPress}
            />
            <Icon name="send" color="grey" link onClick={() => sendMessage(input)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
