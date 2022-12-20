import {API_BASE_URL, API_TOKEN} from '@env';

const options = {
  method: 'GET',
};

// Ephémeride pour un jour
export const getTodayEphemeris = async (day, insee) => {
  return await fetch(
    `${API_BASE_URL}/ephemeride/${day}?insee=${insee}&token=${API_TOKEN}`,
  ).then(res => res.json());
};

// Prévision météo hebdomadaire sur 14 jours
export const getDailyForecast = async insee => {
  return await fetch(
    `${API_BASE_URL}/forecast/daily?insee=${insee}&token=${API_TOKEN}`,
    options,
  ).then(res => res.json());
};

// Prévision météo sur les 12 prochaines heures par tranche de 3 heures
export const getNextHoursForecast = async insee => {
  return await fetch(
    `${API_BASE_URL}/forecast/nextHours?insee=${insee}&token=${API_TOKEN}`,
    options,
  ).then(res => res.json());
};
