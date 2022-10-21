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

export const messageSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['text', 'isNew', 'isAnswered', 'createdAt'],
    properties: {
      text: {
        bsonType: 'array',
        items: {
          bsonType: 'string',
        },
      },
      isNew: {
        bsonType: 'bool',
      },
      isAnswered: {
        bsonType: 'bool',
      },
      createdAt: {
        bsonType: 'string',
      },
    },
  },
};
