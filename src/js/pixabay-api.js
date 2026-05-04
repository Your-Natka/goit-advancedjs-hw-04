import axios from 'axios';

const API_KEY = '55701586-2004722afdcef8f633333a26a';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = query => {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: String(query),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(resp => resp.data.hits);
};
