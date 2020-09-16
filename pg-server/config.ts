import Knex from 'knex';
import kenxfile from './knexfile';

type AppEnv = 'development' | 'test' | 'production';

export const getAppEnv = () => {
  const appEnv = process.env.APP_ENV as AppEnv | undefined;
  if (!appEnv || !['development', 'test', 'production'].includes(appEnv)) {
    throw new Error(`APP_ENV is set to ${appEnv}`);
  }
  return appEnv;
};

const appEnv = getAppEnv();
const db = Knex(kenxfile[appEnv]);

export { db };
