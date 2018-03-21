import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import CardLayout from '../layouts/card';

import styled from 'styled-components';
import { throttle } from 'lodash';
import { compose, withState, withStateHandlers } from 'recompose';

const createThrottledFunction = fn => throttle(fn, 300, { leading: false, trailing: true });

const searchMarvelCharacters = ({ name = '', offset = 0, limit = 18, ...params }) => {
  const searchUrl = new URL(
    `https://gateway.marvel.com/v1/public/characters?apikey=de9b191ab671588f1d02a548221ad342`
  );
  const queryParams = {
    ...(name ? { name } : {}),
    offset,
    limit,
    ...params
  };
  Object.keys(queryParams).map(key => searchUrl.searchParams.append(key, queryParams[key]));

  return fetch(searchUrl);
};

const enhance = compose(
  withState('results', 'setResults', {}),
  withStateHandlers(
    ({ searchQuery = '', errorMsg, results, setResults }) => ({
      searchQuery,
      results,
      setResults
    }),
    {
      setSearchQuery: ({ setResults }) => event => {
        const searchQuery = event.target.value;
        searchMarvelCharacters({ name: searchQuery })
          .then(response => response.json())
          .then(json => setResults(json));
      }
    }
  )
);

const HomePage = ({ setSearchQuery, results }) => (
  <CardLayout footer={null}>
    <TextField
      type="text"
      label="Please type something to start searching"
      fullwidth
      onKeyUp={createThrottledFunction(setSearchQuery)}
    />
  </CardLayout>
);

export default enhance(HomePage);
