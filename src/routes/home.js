import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import styled from 'styled-components';

// import style from './style';
const HomeWrapper = styled.div`
  padding: 20px;
  min-height: 100%;
  width: 100%;
`;

const CardHeader = styled.section`
  padding: 1em;
`;

const CardBody = styled.section`
  padding: 1em;
`;
export default class Home extends Component {
  render = () => (
    <HomeWrapper>
      <h1>Home route</h1>
      <Card>
        <CardHeader>
          <h2 class=" mdc-typography--title">Home card</h2>
          <div class=" mdc-typography--caption">Welcome to home route</div>
        </CardHeader>
        <CardBody>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt.
        </CardBody>
        <Card.Actions>
          <Card.ActionButton>OKAY</Card.ActionButton>
        </Card.Actions>
      </Card>
    </HomeWrapper>
  );
}
