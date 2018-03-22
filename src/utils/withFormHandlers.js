import { compose, withStateHandlers } from 'recompose';

export default ({ onSubmit }) =>
  compose(
    withStateHandlers(
      ({ email = '', password = '', rememberMe = false, setIsAuthenticated }) => ({
        email,
        password,
        rememberMe,
        setIsAuthenticated
      }),
      {
        setEmail: () => event => ({
          email: event.target.value
        }),
        setPassword: () => event => ({
          password: event.target.value
        }),
        setRememberMe: rememberMe => () => ({
          rememberMe: !rememberMe
        }),
        setErrorMessage: errorMsg => msg => ({
          errorMsg: msg
        }),
        // this handler should be created separately by right but it works for now
        onSubmit
      }
    )
  );
