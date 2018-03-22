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
    images: results.map(({ name, thumbnail: { path, extension } }) => ({
      name,
      imageUrl: `${path}.${extension}`
    })),
    count: total
  }))
);

const Gallery = ({ count, images }) =>
  !!count && (
    <GridLayout>
      {images.map(({ name, imageUrl }) => (
        <CharacterCard>
          <header class=" mdc-typography--title">{name}</header>
          <CardMedia className="card-media">
            <img src={imageUrl} />
          </CardMedia>
          <Card.Actions>
            <Card.ActionButton>OKAY</Card.ActionButton>
          </Card.Actions>
        </CharacterCard>
      ))}
    </GridLayout>
  );

export default withResponseCreateResults(Gallery);
