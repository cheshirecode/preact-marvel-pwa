import { h } from 'preact';
import { compose, lifecycle } from 'recompose';
import withAuthCheck from '../utils/withAuthCheck';
import { logout } from '../utils/parse';

const enhance = compose(
  withAuthCheck,
  lifecycle({
    componentWillMount: () => {
      return logout();
    }
  })
);
const Logout = () => <div />;

export default enhance(Logout);
