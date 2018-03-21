import { route } from 'preact-router';

export const routeTo = path => () => {
  route(path, true);
};

export const goToLandingPage = routeTo('/');
export const goToHome = routeTo('/home');
export const goToMyProfile = routeTo('/profile');
export const goToRegistration = routeTo('/registration');
export const goToLogin = routeTo('/login');
