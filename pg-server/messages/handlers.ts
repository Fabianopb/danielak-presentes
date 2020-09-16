import { getDb } from '../config';
import { Message, MessagePayload } from './types';

const table = 'messages';

export const selectAllMessages = async () => {
  const db = getDb();
  return db<Message>(table).select();
};

export const insertMessage = async (payload: MessagePayload) => {
  const db = getDb();
  const messageIds = await db<Message>(table).insert(payload).returning('id');
  return messageIds[0];
};

export const updateMessage = async (id: string, payload: MessagePayload) => {
  const db = getDb();
  await db<Message>(table).where('id', id).update(payload);
};

export const deleteMessage = async (id: string) => {
  const db = getDb();
  await db<Message>(table).where('id', id).delete();
};

export const toggleMessageAnswered = async (id: string) => {
  const db = getDb();
  const isAnswered = await db<Message>(table).where({ id }).returning('isAnswered').first();
  const messages = await db<Message>(table)
    .where({ id })
    .update('isAnswered', !isAnswered)
    .returning('*');
  return messages[0];
};
