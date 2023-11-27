const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const swaggerDocument = require('../documentation/swagger-output.json');
const { errorHandler, requestHandler } = require('../middleware/errorHandler');

const connectDB = require('../config/db');

const app = express();

app.set('trust proxy', 1);
// Create a limiter with a maximum of 5 requests per day
const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    max: 5,
    message: 'Rate limit exceeded. Please try again later.',
  });
  
// Apply the limiter to all routes or specific routes

app.use(cors());
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())

// connect to database
connectDB();

// Serve static files from multiple directories
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/v1', require('../routes/index'));
app.use(requestHandler);
app.use(errorHandler);

module.exports = app;
