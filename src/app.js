import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './components/header';
import LandingPage from 'async!./routes/landingPage';
import Home from 'async!./routes/home';
import Profile from 'async!./routes/profile';
import Login from 'async!./routes/login';
import Logout from 'async!./routes/logout';
import Registration from 'async!./routes/registration';
import styled from 'styled-components';

import { isAuthenticated } from './utils/parse';
import { compose, lifecycle, withState, withContext } from 'recompose';

// decorate app with lifecycle hooks so the child components could know whether
// there is a currently authenticated user session before their own rendering
// pass along the flag to children
const enhance = compose(
  withState('isAuthenticated', 'setIsAuthenticated', false),
  lifecycle({
    componentDidMount() {
      this.props.setIsAuthenticated(isAuthenticated());
    }
  }),
  withContext({}, ({ isAuthenticated }) => ({ isAuthenticated }))
);

const AppWrapper = styled.article`
  /* height: 100%; */
  max-width: 1440px;
  margin: 0 auto;
`;

class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render = () => (
    <AppWrapper>
      <Header />
      <Router onChange={this.handleRoute}>
        <LandingPage path="/" />
        <Login path="/login" />
        <Registration path="/registration" />
        <Home path="/home" />
        <Home path="/home/:nameStartsWith?/:offset?/:limit?" />
        <Profile path="/profile/" user="me" />
        <Profile path="/profile/:user" />
        <Logout path="/logout" />
      </Router>
    </AppWrapper>
  );
}

export default enhance(App);
