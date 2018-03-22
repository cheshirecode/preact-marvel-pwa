import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import Drawer from 'preact-material-components/Drawer';
import Card from 'preact-material-components/Card';
import List from 'preact-material-components/List';
import CardLayout from '../layouts/card';
import Gallery from '../components/gallery';
import { TextFieldWrapper } from '../components/form';

import { routeTo } from '../utils/routeHandler';
import searchMarvelCharacters from '../utils/searchMarvelCharacters';

import { throttle } from 'lodash';
import { compose, withStateHandlers } from 'recompose';
import styled from 'styled-components';

const Home = styled.section`
  border: 2px solid red;
  /* hack to width of overlay to 1/2 screen */
  aside {
    width: 50%;
  }

  aside .mdc-drawer__drawer {
    width: 100%;
    max-width: 100%; /* override existing style */
  }
`;

const CharacterOverlayContent = styled(Drawer.DrawerContent)``;

const CharacterCard = styled.section`
  padding: 2em;
`;

const CardMedia = styled(Card.Media)`
  > img {
    max-width: 480px;
    width: 100%;
    /* height: 100%; */
  }
`;

const createThrottledFunction = fn =>
  throttle(fn, 300, {
    leading: false,
    trailing: true
  });

const enhance = compose(
  withStateHandlers(
    ({ response, isOverlayOpened = false, characterInfo = {} }) => ({
      response,
      isOverlayOpened,
      characterInfo
    }),
    {
      setResponse: () => response => ({
        response
      }),
      setIsOverlayOpened: () => isOverlayOpened => ({
        isOverlayOpened
      }),
      setCharacterInfo: () => characterInfo => ({
        characterInfo
      })
    }
  )
);

class HomePage extends Component {
  //1st render if there is already a search string, chargeeeee
  componentWillMount() {
    this.props.nameStartsWith.length > 0 ? this.search() : this.props.setResponse(false);
  }

  //afterwards, if new props is not empty, chargeee or else reset to empty state
  componentWillReceiveProps({ response, nameStartsWith }) {
    if (this.props.nameStartsWith !== nameStartsWith) {
      nameStartsWith.length > 0 ? this.search() : this.props.setResponse(false);
    }
  }

  openOverlay = obj => () => {
    this.props.setCharacterInfo(obj);
    this.props.setIsOverlayOpened(true);
  };

  closeOverlay = () => {
    this.props.setIsOverlayOpened(false);
  };

  search = createThrottledFunction(() => {
    const { nameStartsWith, offset, limit, setResponse } = this.props;
    searchMarvelCharacters({ nameStartsWith, offset, limit })
      .then(response => response.json())
      .then(json => setResponse(json));
  });

  setQueryString = createThrottledFunction(event => {
    const { offset, limit } = this.props;
    routeTo(`/home/${event.target.value}/${offset}/${limit}`)();
  });

  render() {
    const {
      nameStartsWith,
      response = {},
      isOverlayOpened,
      characterInfo: { imageUrl, description, urls = [] } = {}
    } = this.props;
    return (
      <Home>
        <CardLayout footer={<Gallery response={response} openOverlay={this.openOverlay} />}>
          <TextFieldWrapper>
            <TextField
              type="text"
              label="Please type something to start searching"
              value={nameStartsWith}
              onKeyUp={this.setQueryString}
            />
          </TextFieldWrapper>
          <Drawer.TemporaryDrawer open={isOverlayOpened} onClose={this.closeOverlay}>
            <CharacterOverlayContent>
              <CharacterCard>
                <CardMedia className="card-media">
                  <img src={imageUrl} />
                </CardMedia>
                <p>{description}</p>
                {urls.length > 0 && (
                  <List>
                    {// semantically weird to wrap <a> around <li>, enhancement later
                    urls.map(({ type, url }) => (
                      <a href={url}>
                        <List.Item>{type}</List.Item>
                      </a>
                    ))}
                  </List>
                )}
              </CharacterCard>
            </CharacterOverlayContent>
          </Drawer.TemporaryDrawer>
        </CardLayout>
      </Home>
    );
  }
}

export default enhance(HomePage);
