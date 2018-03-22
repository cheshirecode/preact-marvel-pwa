const MARVEL_CHAR_API = 'https://gateway.marvel.com/v1/public/characters';
const API_KEY = 'de9b191ab671588f1d02a548221ad342';

const INITIAL_API = new URL(MARVEL_CHAR_API);
INITIAL_API.searchParams.append('apikey', API_KEY);

export default ({ nameStartsWith = '', offset = 0, limit = 18, ...params }) => {
  const searchUrl = new URL(INITIAL_API);
  const queryParams = {
    nameStartsWith,
    offset,
    limit,
    ...params
  };

  Object.keys(queryParams)
    .filter(param => queryParams[param] || ~~queryParams[param] >= 0)
    .map(key => searchUrl.searchParams.append(key, queryParams[key]));

  return fetch(searchUrl);
};
