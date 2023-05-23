const axios = require('axios');
const 

const BASE_URL = 'https://trefle.io/api/v1';
const API_KEY = 'YOUR_TREFLE_API_KEY'; // Replace with your actual Trefle API key

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