import { compose, lifecycle, getContext } from 'recompose';
import { goToHome, goToLogin } from '../utils/routeHandler';

export default compose(
  getContext(),
  lifecycle({
    componentDidMount() {
      if (this.props.isAuthenticated) {
        this.props.setIsAuthenticated(true);
        goToHome();
      } else {
        this.props.setIsAuthenticated(false);
        goToLogin();
      }
    }
  })
);
