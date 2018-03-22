import { h, Component } from 'preact';
import { compose, getContext } from 'recompose';
import { logout } from '../utils/parse';
import { goToLandingPage } from '../utils/routeHandler';

const enhance = compose(getContext());

class Logout extends Component {
  componentDidMount() {
    logout();
    this.props.setIsAuthenticated(false);
    goToLandingPage();
  }
}

export default enhance(Logout);
