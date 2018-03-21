import { h } from 'preact';
import TextField from 'preact-material-components/TextField';
import Checkbox from 'preact-material-components/Checkbox';
import CardLayout from '../layouts/card';
import {
  StyledFormLayout,
  StyledFormField,
  TextFieldWrapper,
  StyledButton
} from '../components/form';
import Fragment from '../components/fragment';

import { User } from 'Parse';
import withFormHandlers from '../utils/withFormHandlers';
import { onError } from '../utils/parse';

import { goToLandingPage } from '../utils/routeHandler';
import { compose } from 'recompose';
import withAuthCheck from '../utils/withAuthCheck';

// const __DEFAULT_EMAIL__ = 'dummydummy';
// const __DEFAULT_PASSWORD__ = 'dummydummy';

const enhance = compose(
  withAuthCheck,
  withFormHandlers({
    onSubmit: ({ email, password, rememberMe }) => event => {
      event.preventDefault();
      //backdoor
      // if (email === __DEFAULT_EMAIL__ && password === __DEFAULT_PASSWORD__) {
      //   const user = new User();
      //   user.set('username', __DEFAULT_EMAIL__);
      //   user.set('email', __DEFAULT_EMAIL__);
      //   user.set('password', __DEFAULT_PASSWORD__);
      //   user.set('rememberMe', rememberMe);
      // }
      User.logIn(email, password, {
        success: user => {
          // Do stuff after successful login, like a redirect.
          console.log(
            'User logged in successful with username: ' +
              user.get('username') +
              ' and email: ' +
              user.get('email')
          );
          goToLandingPage();
        },
        error: (user, error) => {
          console.log('The login failed with error: ' + error.code + ' ' + error.message);
          onError(error);
        }
      });
    }
  })
);

const LoginPage = ({ setEmail, setPassword, setRememberMe, onSubmit }) => (
  <StyledFormLayout>
    <CardLayout
      header={
        <Fragment>
          <h2 class=" mdc-typography--title">Login</h2>
          {
            // <span class=" mdc-typography--caption">
            //   ${__DEFAULT_EMAIL__} - ${__DEFAULT_PASSWORD__} as default username - password
            // </span>
          }
        </Fragment>
      }
    >
      <form onSubmit={onSubmit}>
        <TextFieldWrapper>
          <TextField
            type="text"
            label="Email address"
            fullwidth
            onChange={setEmail}
            // helperText={this.state.errorMsg}
            // helperTextPersistent={!!this.state.errorMsg}
          />
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextField type="password" label="Password" fullwidth onChange={setPassword} />
        </TextFieldWrapper>
        <StyledFormField>
          <Checkbox type="checkbox" value="remember-me" onChange={this.setRememberMe} />
          <label>&nbsp; Remember me</label>

          <StyledButton raised>Login</StyledButton>
        </StyledFormField>
      </form>
    </CardLayout>
  </StyledFormLayout>
);

export default enhance(LoginPage);
