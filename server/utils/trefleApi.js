require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://trefle.io/api/v1';
const API_KEY = process.env.TREFLE_API_TOKEN;

async function searchPlants(query) {
  try {
    const response = await axios.get(`${BASE_URL}/plants/search`, {
      params: {
        q: query,
        token: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching plants:', error);
    throw error;
  }
}

module.exports = {
  searchPlants,
};