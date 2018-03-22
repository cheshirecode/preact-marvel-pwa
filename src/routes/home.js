import { h } from 'preact';
import TextField from 'preact-material-components/TextField';
import CardLayout from '../layouts/card';
import Gallery from '../components/gallery';

import { throttle } from 'lodash';
import { compose, withState, withHandlers } from 'recompose';

const createThrottledFunction = fn =>
  throttle(fn, 300, {
    leading: false,
    trailing: true
  });

const searchMarvelCharacters = ({ nameStartsWith, offset = 0, limit = 18, ...params }) => {
  const searchUrl = new URL(
    `https://gateway.marvel.com/v1/public/characters?apikey=de9b191ab671588f1d02a548221ad342`
  );
  const queryParams = {
    ...(nameStartsWith
      ? {
          nameStartsWith
        }
      : {}),
    offset,
    limit,
    ...params
  };
  Object.keys(queryParams).map(key => searchUrl.searchParams.append(key, queryParams[key]));

  return fetch(searchUrl);
};

const enhance = compose(
  withState('response', 'setResponse', {}),
  withHandlers({
    onSearchTrigger: ({ response, setResponse }) => event => {
      event.preventDefault();
      const nameStartsWith = event.target.value;
      searchMarvelCharacters({ nameStartsWith })
        .then(response => response.json())
        .then(json => setResponse(json));
    }
  })
);

const HomePage = ({ onSearchTrigger, response }) => (
  <CardLayout footer={<Gallery response={response} />}>
    <TextField
      type="text"
      label="Please type something to start searching"
      fullwidth
      onKeyUp={createThrottledFunction(onSearchTrigger)}
    />
  </CardLayout>
);

export default enhance(HomePage);
