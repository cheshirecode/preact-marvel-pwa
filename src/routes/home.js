import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import Drawer from 'preact-material-components/Drawer';
import Card from 'preact-material-components/Card';
import List from 'preact-material-components/List';
import Icon from 'preact-material-components/Icon';
import CardLayout from '../layouts/card';
import Gallery from '../components/gallery';
import { TextFieldWrapper } from '../components/form';

import { routeTo } from '../utils/routeHandler';
import searchMarvelCharacters from '../utils/searchMarvelCharacters';

import { throttle } from 'lodash';
import { compose, withStateHandlers, mapProps, withPropsOnChange } from 'recompose';
import styled from 'styled-components';

const DEFAULT_LIMIT = 18;

const Home = styled.section`
  /* hack to width of overlay to 1/2 screen */
  aside {
    width: 50%;
  }

  aside .mdc-drawer__drawer {
    width: 100%;
    max-width: 100%; /* override existing style */
  }
`;

const IconWrapper = styled(Icon)`
  position: absolute;
  right: 1em;
  cursor: pointer;
`;

const CharacterOverlayContent = styled(Drawer.DrawerContent)``;

const CharacterCard = styled.section`
  padding: 2em;
`;

const CardMedia = styled(Card.Media)`
  margin: 0 auto;

  > img {
    max-width: 480px;
    width: 100%;
  }
`;

const Pagination = styled(Card.Actions)`
  justify-content: center;
`;

const createThrottledFunction = fn =>
  throttle(fn, 300, {
    leading: false,
    trailing: true
  });

const enhance = compose(
  //default props through query string and/or triggers
  mapProps(({ nameStartsWith = '', offset, limit, response, ...props }) => ({
    nameStartsWith,
    offset: ~~offset || 0,
    limit: ~~limit || DEFAULT_LIMIT,
    response: response || {},
    ...props
  })),
  withStateHandlers(
    ({ response, isOverlayOpened = false, characterInfo = {}, offset = 0 }) => ({
      response,
      isOverlayOpened,
      characterInfo,
      offset
    }),
    {
      setResponse: () => response => ({ response }),
      setIsOverlayOpened: () => isOverlayOpened => ({ isOverlayOpened }),
      setCharacterInfo: () => characterInfo => ({ characterInfo }),
      increaseOffset: ({ offset }) => v => ({
        offset: offset + v
      }),
      decreaseOffset: ({ offset }) => v => ({
        offset: offset - v
      })
    }
  ),
  //clean up API response
  withPropsOnChange(['response'], ({ response: { data: { total = 0, results = [] } = {} } }) => ({
    images: results.map(({ name, thumbnail: { path, extension }, ...props }) => ({
      name,
      imageUrl: `${path}.${extension}`,
      ...props
    })),
    count: total
  })),
  //work out whether previous or next group are available
  mapProps(({ offset, limit, count, ...props }) => ({
    offset,
    limit,
    count,
    isPrev: offset > 0,
    isNext: offset + limit < count,
    ...props
  }))
);

class HomePage extends Component {
  //1st render if there is already a search string, chargeeeee
  componentWillMount() {
    this.props.nameStartsWith.length > 0 ? this.search() : this.props.setResponse(false);
  }

  //afterwards, if new props is not empty, chargeee or else reset to empty state
  componentWillReceiveProps({ response, nameStartsWith, offset }) {
    if (this.props.nameStartsWith !== nameStartsWith) {
      nameStartsWith.length > 0 ? this.search() : this.props.setResponse(false);
    } else {
      this.props.offset !== offset && this.search();
    }
  }

  openOverlay = obj => () => {
    this.props.setCharacterInfo(obj);
    this.props.setIsOverlayOpened(true);
  };

  closeOverlay = () => {
    this.props.setIsOverlayOpened(false);
  };

  nextPage = () => {
    const { nameStartsWith, offset, limit, increaseOffset } = this.props;
    increaseOffset(limit);
    this.route({ nameStartsWith, offset: offset + limit, limit });
  };

  prevPage = () => {
    const { nameStartsWith, offset, limit, decreaseOffset } = this.props;
    decreaseOffset(limit);
    this.route({ nameStartsWith, offset: offset - limit, limit });
  };

  route = ({ nameStartsWith, offset, limit }) => {
    routeTo(`/home/${nameStartsWith}/${offset}/${limit}`)();
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
      isPrev,
      isNext,
      limit,
      images,
      count,
      isOverlayOpened,
      characterInfo: { imageUrl, description, urls = [] } = {}
    } = this.props;
    const { nextPage, prevPage } = this;
    return (
      <Home>
        <CardLayout>
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
              <IconWrapper onClick={this.closeOverlay}>close</IconWrapper>
              <CharacterCard>
                <CardMedia className="card-media">
                  <img src={imageUrl} />
                </CardMedia>
                <p>{description}</p>
                {urls.length > 0 && (
                  <List>
                    {// semantically weird to wrap <a> around <li>, TODO enhancement later
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
          <Gallery count={count} images={images} openOverlay={this.openOverlay} />{' '}
          {count > limit && (
            <Pagination>
              <Card.ActionButton disabled={!isPrev} onClick={prevPage}>
                Prev
              </Card.ActionButton>
              <Card.ActionButton disabled={!isNext} onClick={nextPage}>
                Next
              </Card.ActionButton>
            </Pagination>
          )}
        </CardLayout>
      </Home>
    );
  }
}

export default enhance(HomePage);
