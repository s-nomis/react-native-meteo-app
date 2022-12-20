import {API_BASE_URL, API_TOKEN} from '@env';

export const getCities = async value => {
  const options = {
    method: 'GET',
  };

  const response = await fetch(
    `${API_BASE_URL}/location/cities?search=${value}&token=${API_TOKEN}`,
    options,
  );

  return response.json();
};
