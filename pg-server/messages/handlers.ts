import { db } from '../config';
import { Message, MessagePayload } from '../types';

const table = 'messages';

export const selectAllMessages = async () => {
  return db<Message>(table).select();
};

export const insertMessage = async (payload: MessagePayload) => {
  const messageIds = await db<Message>(table).insert(payload).returning('id');
  return messageIds[0];
};

export const updateMessage = async (id: string, payload: MessagePayload) => {
  await db<Message>(table).where('id', id).update(payload);
};

export const deleteMessage = async (id: string) => {
  await db<Message>(table).where('id', id).delete();
};

export const toggleMessageAnswered = async (id: string) => {
  const messages = await db<Message>(table).where({ id });
  const result = await db<Message>(table)
    .where({ id })
    .update('isAnswered', !messages[0].isAnswered)
    .returning('*');
  return result[0];
};
