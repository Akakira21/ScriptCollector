const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require('./routes/api');
const { errorHandler } = require('./middleware/errorHandler');

// Database connection setup
const db = require('./database/connection');

app.use(bodyParser.json());
app.use(errorHandler);

// CORS Headers Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Use consolidated API routes
app.use('/api', apiRoutes);

// Server setup
const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
