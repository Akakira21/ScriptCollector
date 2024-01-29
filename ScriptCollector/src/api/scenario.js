import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getScenariosByGameId = async (gameId) => {
    try {
        const response = await axios.get(`${API_URL}/getScenariosByGameId/${gameId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching scenarios for game ID ${gameId}:`, error);
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
        console.error(`Error fetching scenarios for user ID ${userId}:`, error);
        throw error;
    }
};

export const getAllScenarioTags = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllScenarioTags`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all scenario tags:', error);
        throw error;
    }
};

export const getAllScenarios = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllScenarios`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all scenarios:', error);
        throw error;
    }
};

export const getScenariosByTag = async (tag) => {
    try {
        const response = await axios.get(`${API_URL}/getScenariosByTag/${tag}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching scenarios by tag ${tag}:`, error);
        throw error;
    }
};

export const getRecentScenarios = async () => {
    try {
        const response = await axios.get(`${API_URL}/getRecentScenarios`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recent scenarios:', error);
        throw error;
    }
};

export const getAllScenariosWithDetails = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllScenariosWithDetails`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all scenarios with details:', error);
        throw error;
    }
};

export const createScenario = async (scenarioData) => {
    try {
        const response = await axios.post(`${API_URL}/createScenario`, scenarioData);
        return response.data;
    } catch (error) {
        console.error('Error creating scenario:', error);
        throw error;
    }
};

export const updateScenario = async (scenarioId, scenarioData) => {
    try {
        const response = await axios.put(`${API_URL}/updateScenario/${scenarioId}`, scenarioData);
        return response.data;
    } catch (error) {
        console.error(`Error updating scenario with ID ${scenarioId}:`, error);
        throw error;
    }
};

export const deleteScenario = async (scenarioId) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteScenario/${scenarioId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting scenario with ID ${scenarioId}:`, error);
        throw error;
    }
};