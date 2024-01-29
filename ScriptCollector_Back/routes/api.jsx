const express = require('express');
const router = express.Router();

// Import controllers
const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');
const scenarioController = require('../controllers/scenarioController');

// User routes
router.post('/addUser', userController.addUser);
router.post('/getUserByEmail', userController.getUserByEmail);
router.get('/getAllUsers', userController.getAllUsers);

// Game routes
router.get('/getAllGames', gameController.getAllGames);
router.get('/getGameById/:gameId', gameController.getGameById);
router.get('/getGamesByTag/:tag', gameController.getGamesByTag);
router.get('/getAllGameTags', gameController.getAllGameTags);

// Scenario routes
router.get('/getScenariosByGameId/:gameId', scenarioController.getScenariosByGameId);
router.get('/getScenarioById/:scenarioId', scenarioController.getScenarioById);
router.get('/getScenariosByUserId/:userId', scenarioController.getScenariosByUserId);
router.get('/getAllScenarioTags', scenarioController.getAllScenarioTags);
router.get('/getAllScenarios', scenarioController.getAllScenarios);
router.get('/getScenariosByTag/:tag', scenarioController.getScenariosByTag);
router.get('/getRecentScenarios', scenarioController.getRecentScenarios);
router.get('/getAllScenariosWithDetails', scenarioController.getAllScenariosWithDetails);
router.post('/createScenario', scenarioController.createScenario);
router.put('/updateScenario/:scenarioId', scenarioController.updateScenario);
router.delete('/deleteScenario/:scenarioId', scenarioController.deleteScenario);

module.exports = router;
