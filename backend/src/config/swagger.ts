import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Planner API',
      version,
      description: 'API documentation for the Travel Planner application',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'API Support',
        email: 'support@travelplanner.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Update timestamp',
            },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT token',
            },
            user: {
              $ref: '#/components/schemas/UserResponse',
            },
          },
        },
        Trip: {
          type: 'object',
          required: ['title', 'startDate', 'endDate'],
          properties: {
            id: {
              type: 'integer',
              description: 'Trip ID',
            },
            title: {
              type: 'string',
              description: 'Trip title',
            },
            description: {
              type: 'string',
              description: 'Trip description',
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Trip start date',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Trip end date',
            },
            userId: {
              type: 'integer',
              description: 'User ID who owns the trip',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Update timestamp',
            },
            activities: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Activity'
              }
            }
          },
        },
        Activity: {
          type: 'object',
          required: ['title', 'date', 'tripId'],
          properties: {
            id: {
              type: 'integer',
              description: 'Activity ID',
            },
            title: {
              type: 'string',
              description: 'Activity title',
            },
            description: {
              type: 'string',
              description: 'Activity description',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Activity date',
            },
            location: {
              type: 'string',
              description: 'Activity location',
            },
            tripId: {
              type: 'integer',
              description: 'Trip ID this activity belongs to',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Update timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const specs = swaggerJsdoc(options); 