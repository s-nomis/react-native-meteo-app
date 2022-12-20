const API_KEY = process.env.API_KEY;
const API_BASE_URL = 'https://api.meteo-concept.com/api';

export const getCity = async city => {
  const options = {
    method: 'GET',
  };

  return await fetch(API_BASE_URL);
};
