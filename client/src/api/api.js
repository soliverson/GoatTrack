// client/js/api.js
import axios from 'axios';

const USDA_API_URL = 'https://gisportal.ers.usda.gov/server/rest/services/Census_of_Agriculture_Data/Livestock_and_Animals_2017/MapServer/9/query';

export async function getGoatStatistics() {
  try {
    const response = await axios.get(USDA_API_URL, {
      params: {
        f: 'json',
        where: '1=1',
        outFields: '*',
        returnGeometry: false
      }
    });
    return response.data.features.map(feature => feature.attributes);
  } catch (error) {
    console.error('Error fetching USDA data:', error);
    throw error;
  }
}
