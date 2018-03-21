import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import CardLayout from '../layouts/card';
const Fragment = 'x-fragment';

import styled from 'styled-components';

const HomeWrapper = styled.div`
  padding: 1.25em;
  min-height: 100%;
  width: 100%;
  // color: ${props => props.theme.color};
`;

// const CardHeader = styled.section`
//   padding: 1em;
// `;

// const CardBody = styled.section`
//   padding: 1em;
// `;

export default class Home extends Component {
  render = () => (
    <HomeWrapper>
      <h1>Home route</h1>
      <CardLayout
        header={
          <Fragment key="1">
            <h2 class=" mdc-typography--title">Home card</h2>
            <span class=" mdc-typography--caption">Welcome to home route</span>
          </Fragment>
        }
        body={`Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt.`}
        footer={
          <Card.Actions>
            <Card.ActionButton>OKAY</Card.ActionButton>
          </Card.Actions>
        }
      />
    </HomeWrapper>
  );
}
