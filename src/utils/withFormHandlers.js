import { compose, withStateHandlers } from 'recompose';

export default ({ onSubmit }) =>
  compose(
    withStateHandlers(
      ({ email = '', password = '', rememberMe = false, errorMsg }) => ({
        email,
        password,
        rememberMe
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
        onSubmit
      }
    )
  );
