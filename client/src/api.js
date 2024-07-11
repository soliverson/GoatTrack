import axios from 'axios';

const API_URL = 'http://localhost:5000/goatBreeds'; // Update this with the actual API endpoint if different

export const fetchGoatBreeds = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching goat breeds:', error);
    throw error;
  }
};
