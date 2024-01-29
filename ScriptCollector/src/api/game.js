import axios from 'axios';

const API_URL = 'http://localhost:8000/api/games';

export const getAllGames = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllGames`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all games:', error);
        throw error;
    }
};

export const getGameById = async (gameId) => {
    try {
        const response = await axios.get(`${API_URL}/getGameById/${gameId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching game with ID ${gameId}:`, error);
        throw error;
    }
};

export const getGamesByTag = async (tag) => {
    try {
        const response = await axios.get(`${API_URL}/getGamesByTag/${tag}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching games by tag ${tag}:`, error);
        throw error;
    }
};

export const getAllGameTags = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllGameTags`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all game tags:', error);
        throw error;
    }
};

