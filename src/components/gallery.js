import { h } from 'preact';
import GridLayout from '../layouts/grid';
import Card from 'preact-material-components/Card';
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

export default Gallery;
