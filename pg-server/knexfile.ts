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
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '',
      database: 'danik_test',
    },
    migrations: {
      directory: './migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: '',
      user: '',
      password: '',
      database: '',
    },
    migrations: {
      directory: './migrations',
    },
  },
};

export default knexConfig;
