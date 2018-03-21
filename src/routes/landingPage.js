import { h } from 'preact';
import { compose } from 'recompose';
import withAuthCheck from '../utils/withAuthCheck';

// only care to route users to their 'real' landing page based on authentication status.
// in the real world, this should be handled differently with more checks like ACL based on user roles or referrer URL etc
const enhance = compose(withAuthCheck);
const LandingPage = () => <div />;

export default enhance(LandingPage);
