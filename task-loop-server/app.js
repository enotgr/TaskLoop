const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// create config with your MONGO_URI for working with your mongoDB
const appConfig = require('./app.config');

const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect(appConfig.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);

module.exports = app;