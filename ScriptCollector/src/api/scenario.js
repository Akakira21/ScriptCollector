import axios from 'axios';

const API_URL = 'http://localhost:8000/api/scenarios';

export const getScenariosByGameId = async (gameId) => {
    try {
        const response = await axios.get(`${API_URL}/getScenariosByGameId/${gameId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching scenario with game ID ${gameId}:`, error);
        throw error;
    }
};

export const getScenarioById = async (scenarioId) => {
    try {
        const response = await axios.get(`${API_URL}/getScenarioById/${scenarioId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching scenario with ID ${scenarioId}:`, error);
        throw error;
    }
};

export const getScenariosByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/getScenariosByUserId/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching scenario with user ID ${userId}:`, error);
        throw error;
    }
};
