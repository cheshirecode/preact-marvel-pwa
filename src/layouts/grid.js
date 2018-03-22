import { h, Component } from 'preact';
import styled from 'styled-components';

//mind-blowingly simple versus brewing your own layout for this
//TODO - deal with IE11 later if ever
const Grid = styled.section`
  display: grid;
  grid-template-columns: ${({ itemsPerRow = 3 }) => `repeat(${itemsPerRow}, 1fr)`};
  grid-gap: 1em;
`;

export default class GridLayout extends Component {
  render = () => <Grid>{this.props.children}</Grid>;
}
