'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const newsRoute = require('./routes/news');
const userRoute = require('./routes/users');
const followRoute = require('./routes/follows');
const config = require('../config/config');

// Create an Express application
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Logs
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

// Database connection
const sequelize = new Sequelize(config.development);
const models = {
  News: require('./models/news')(sequelize),
  User: require('./models/users')(sequelize),
  Follow: require('./models/follows')(sequelize),
};

// Sync database
sequelize.sync();

// Pass models to the routes
app.use((req, res, next) => {
  req.models = models;
  next();
});

// Use the routes and Start server
app.use(newsRoute);
app.use(userRoute);
app.use(followRoute);
app.use(express.static('public'));
app.listen(PORT, () => console.info(`Server started on http://localhost:${PORT}`));
