export type Message = {
  id: string;
  text: string;
  isNew: boolean;
  isAnswered: boolean;
  createdAt: Date;
};

export type MessagePayload = Omit<Message, 'id' | 'createdAt'>;
