import { h } from 'preact';
import GridLayout from '../layouts/grid';
import Card from 'preact-material-components/Card';
import { compose, withPropsOnChange } from 'recompose';
import styled from 'styled-components';

const CharacterCard = styled(Card)`
  > header {
    padding: 0.5em 1em;
    font-size: 1.5em;
    font-weight: 600;
  }
`;

const CardMedia = styled(Card.Media)`
  > img {
    max-width: 480px;
    width: 100%;
    /* height: 100%; */
  }
`;

const withResponseCreateResults = compose(
  withPropsOnChange(['response'], ({ response: { data: { total = 0, results = [] } = {} } }) => ({
    images: results.map(({ name, thumbnail: { path, extension }, ...props }) => ({
      name,
      imageUrl: `${path}.${extension}`,
      ...props
    })),
    count: total
  }))
);

const Gallery = ({ count, images, openOverlay }) =>
  !!count && (
    <GridLayout>
      {images.map(({ name, imageUrl, ...characterInfo }) => (
        <CharacterCard onClick={openOverlay({ name, imageUrl, ...characterInfo })}>
          <CardMedia className="card-media">
            <img src={imageUrl} />
          </CardMedia>
          <header className="mdc-typography--title">{name}</header>
        </CharacterCard>
      ))}
    </GridLayout>
  );

export default withResponseCreateResults(Gallery);
