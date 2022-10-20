export const usersSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        bsonType: 'string',
      },
      password: {
        bsonType: 'string',
      },
    },
  },
};

export const categorySchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'description', 'createdAt'],
    properties: {
      name: {
        bsonType: 'string',
      },
      description: {
        bsonType: 'string',
      },
      createdAt: {
        bsonType: 'string',
      },
    },
  },
};
