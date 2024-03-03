/*
http://localhost:3001

In the terminal, run node seeds/index.js to manually run the seed files and insert the data into the database.
'npm run seed' is defined in package.json to do the same.

Routes for insomnia:
http://localhost:3001/api/categories
http://localhost:3001/api/products
http://localhost:3001/api/tags

as defined by 'router.use' in ./routes/api/index.js


*/
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PW;

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
});

app.use(express.json()); // Middleware to parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// Import API routes from index.js file in routes/api
const apiRoutes = require('./routes/api');

// Mount API routes
app.use('/api', apiRoutes);

// Sync Sequelize models to the database
sequelize
  .sync({ force: false }) // Set `force` to `true` if you want to drop existing tables on every server start
  .then(() => {
    // Start the server after syncing the models
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`); // Server listening callback
    });
  })
  .catch((err) => {
    console.error('Unable to sync Sequelize models:', err);
  });