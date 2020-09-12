import Knex from 'knex';
import kenxfile from './knexfile';

type AppEnv = 'development' | 'test' | 'production';

export const getAppEnv = () => {
  const appEnv = process.env.APP_ENV as AppEnv | undefined;
  if (!appEnv || !['development', 'test', 'production'].includes(appEnv)) {
    throw new Error(`NODE_ENV is set to ${appEnv}`);
  }
  return appEnv;
};

export const getDb = () => {
  const appEnv = getAppEnv();
  return Knex(kenxfile[appEnv]);
};
