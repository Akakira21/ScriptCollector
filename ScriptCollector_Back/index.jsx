const express = require("express");
const { errorHandler } = require('./middleware/errorHandler');
const bodyParser = require("body-parser");
const apiRoutes = require('./routes/api');
const app = express();

// Database connection setup
const db = require('./database/connection');

// Import routes
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const scenarioRoutes = require('./routes/scenarioRoutes');

// Middleware
app.use(bodyParser.json());
app.use(errorHandler);


// CORS Headers Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Use routes
app.use('/api', apiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/scenarios', scenarioRoutes);

// Server setup
const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
