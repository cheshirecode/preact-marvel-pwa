//metadata for routes by name with associated icon for link and whether user needs to be authenticated beforehand
export default [
  {
    name: 'Home',
    path: '/home',
    icon: 'home',
    isAuthenticated: true
  },
  {
    name: 'Login',
    path: '/login',
    icon: 'account_circle',
    isAuthenticated: false
  },
  {
    name: 'Registration',
    path: '/registration',
    icon: 'group_add',
    isAuthenticated: false
  },
  {
    name: 'Log out',
    path: '/logout',
    icon: 'do_not_disturb',
    isAuthenticated: true
  }
];
