import { h } from 'preact';
import TextField from 'preact-material-components/TextField';
import CardLayout from '../layouts/card';
import Gallery from '../components/gallery';
import { TextFieldWrapper } from '../components/form';
import { routeTo } from '../utils/routeHandler';
import searchMarvelCharacters from '../utils/searchMarvelCharacters';
import { throttle } from 'lodash';
import { compose, withState, withHandlers, lifecycle, withPropsOnChange } from 'recompose';

const createThrottledFunction = fn =>
  throttle(fn, 300, {
    leading: false,
    trailing: true
  });

const enhance = compose(
  withState('response', 'setResponse', ({ response }) => response),
  withHandlers({
    setQueryString: ({ setResponse, nameStartsWith, offset, limit }) => event => {
      setResponse(false);
      routeTo(`/home/${event.target.value}/${offset}/${limit}`)();
    }
  }),
  withPropsOnChange(
    ['response', 'nameStartsWith', 'offset', 'limit'],
    ({ nameStartsWith, offset, limit, setResponse, response, ...params }) => {
      if (!response) {
        searchMarvelCharacters({ nameStartsWith, offset, limit })
          .then(response => response.json())
          .then(json => setResponse(json));
      }
      return { nameStartsWith, offset, limit, setResponse, response, ...params };
    }
  )
);

const HomePage = ({ nameStartsWith, setQueryString, response = {} }) => (
  <CardLayout footer={<Gallery response={response} />}>
    <TextFieldWrapper>
      <TextField
        type="text"
        label="Please type something to start searching"
        value={nameStartsWith}
        onKeyUp={createThrottledFunction(setQueryString)}
      />
    </TextFieldWrapper>
  </CardLayout>
);

export default enhance(HomePage);
