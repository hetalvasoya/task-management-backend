const options = {
  openapi: null,          // Enable/Disable OpenAPI. By default is null
  language: 'en-US',         // Change response language. By default is 'en-US'
  disableLogs: false,     // Enable/Disable logs. By default is false
  autoHeaders: true,     // Enable/Disable automatic headers capture. By default is true
  autoQuery: true,       // Enable/Disable automatic query capture. By default is true
  autoBody: true         // Enable/Disable automatic body capture. By default is true
}
const swaggerAutogen = require('swagger-autogen')(options);
const config = require('./../config/config');

const doc = {
  info: {
    title: 'Task Management App',
    description: 'Task management app manage daily task',
  },
  host: `${config.HOST}:${config.PORT}`, // The hostname and port where your API is running.
  schemes: ['http'],
  basePath: '/api/v1/',
  securityDefinitions: {
    bearerAuth:			{
				type: "apiKey",
				in: "header",
				name: "authorization",
				scheme: "bearer",
				bearerFormat: "JWT"
			}
  },
  security: [		{
			bearerAuth: []
		}],
  definitions: {}
};

// The file where the Swagger JSON output will be saved.
const outputFile = './documentation/swagger-output.json'; 

// An array of files that contain your Express.js routes.
const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);