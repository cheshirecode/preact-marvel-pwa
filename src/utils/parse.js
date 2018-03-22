import { User, Error } from 'parse';
import { goToLandingPage } from '../utils/routeHandler';

//global error handling for Parse server API requests
export const onError = err => {
  switch (err.code) {
    case Error.INVALID_SESSION_TOKEN:
      User.logOut();
      goToLandingPage();
      break;

    // Other Parse API errors to handle
  }
};

export const isAuthenticated = () => {
  const currentUser = User.current();
  return currentUser && currentUser.authenticated();
};

export const logout = () => {
  User.logOut();
  return User.current();
};
