import { compose, lifecycle, getContext } from 'recompose';
import { goToHome, goToLogin } from '../utils/routeHandler';

export default compose(
  getContext(),
  lifecycle({
    componentDidMount() {
      if (this.props.isAuthenticated) {
        goToHome();
      } else {
        goToLogin();
      }
    }
  })
);
