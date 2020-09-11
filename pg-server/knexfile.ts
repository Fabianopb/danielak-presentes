const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '',
      database: 'danik_dev',
    },
    migrations: {
      directory: './migrations',
    },
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/<danik_test>',
    migrations: {
      directory: './migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.PG_DATABASE_URL,
    migrations: {
      directory: './migrations',
    },
  },
};

export default knexConfig;
