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
    required: [
      'name',
      'featuredImageIndex',
      'description',
      'categoryId',
      'currentPrice',
      'tags',
      'productionTime',
      'minAmount',
      'width',
      'height',
      'depth',
      'weight',
      'isVisible',
      'isFeatured',
      'images',
      'createdAt',
    ],
    properties: {
      name: {
        bsonType: 'string',
      },
      featuredImageIndex: {
        bsonType: 'int',
      },
      storeLink: {
        bsonType: 'string',
      },
      description: {
        bsonType: 'string',
      },
      categoryId: {
        bsonType: 'string',
      },
      currentPrice: {
        bsonType: 'decimal',
      },
      discountPrice: {
        bsonType: 'decimal',
      },
      tags: {
        bsonType: 'string',
      },
      productionTime: {
        bsonType: 'int',
      },
      minAmount: {
        bsonType: 'int',
      },
      width: {
        bsonType: 'decimal',
      },
      height: {
        bsonType: 'decimal',
      },
      depth: {
        bsonType: 'decimal',
      },
      weight: {
        bsonType: 'decimal',
      },
      isVisible: {
        bsonType: 'bool',
      },
      isFeatured: {
        bsonType: 'bool',
      },
      images: {
        bsonType: 'array',
        items: {
          bsonType: 'object',
          required: ['large', 'small'],
          properties: {
            large: {
              bsonType: 'string',
            },
            small: {
              bsonType: 'string',
            },
          },
        },
      },
      createdAt: {
        bsonType: 'string',
      },
    },
  },
};

export const productSchema = {
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
