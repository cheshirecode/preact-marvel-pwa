import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import LandingPage from '../routes/landingPage';
import Home from 'async!../routes/home';
import Profile from 'async!../routes/profile';
import Login from 'async!../routes/login';
import Registration from 'async!../routes/registration';
import styled, { ThemeProvider } from 'styled-components';

import { isAuthenticated } from '../utils/parse';
import { compose, lifecycle, withState, withContext } from 'recompose';

// decorate app with lifecycle hooks so the child components could know whether there is a currently authenticated user session before their own rendering
// pass along the flag to children
const enhance = compose(
  withState('isAuthenticated', 'setIsAuthenticated', false),
  lifecycle({
    componentWillMount() {
      this.props.setIsAuthenticated(isAuthenticated());
    }
  }),
  withContext({}, ({ isAuthenticated }) => ({ isAuthenticated }))
);

const AppWrapper = styled.article``;

class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render = () => (
    <AppWrapper id="app">
      <Header />
      <ThemeProvider theme={{ color: 'mediumseagreen' }}>
        <Router onChange={this.handleRoute}>
          <LandingPage currentUrl={this.currentUrl} path="/" />
          <Login currentUrl={this.currentUrl} path="/login" />
          <Registration path="/registration" />
          <Home path="/home" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />
        </Router>
      </ThemeProvider>
    </AppWrapper>
  );
}

export default enhance(App);
