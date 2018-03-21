import { h, Component } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';

export default class LayoutGridPage extends Component {
  render() {
    return (
      <div>
        <LayoutGrid>
          <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="3" />
            <LayoutGrid.Cell cols="6">{this.props.children}</LayoutGrid.Cell>
            <LayoutGrid.Cell cols="3" />
          </LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}
