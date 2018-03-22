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

import { User } from 'parse';
import withFormHandlers from '../utils/withFormHandlers';
import { onError } from '../utils/parse';

import { goToHome } from '../utils/routeHandler';
import { compose } from 'recompose';
import withAuthCheck from '../utils/withAuthCheck';

const enhance = compose(
  withAuthCheck,
  withFormHandlers({
    onSubmit: ({ email, password, rememberMe }) => event => {
      event.preventDefault();
      User.logIn(email, password, {
        success: user => {
          // Do stuff after successful login, like a redirect.
          console.log(
            'User logged in successful with username: ' +
              user.get('username') +
              ' and email: ' +
              user.get('email')
          );
          goToHome();
        },
        error: (user, error) => {
          console.log('The login failed with error: ' + error.code + ' ' + error.message);
          onError(error);
        }
      });
    }
  })
);

const LoginPage = ({ email, setEmail, setPassword, setRememberMe, onSubmit }) => (
  <StyledFormLayout>
    <CardLayout
      header={
        <Fragment>
          <h2 class=" mdc-typography--title">Login</h2>
          {
            <span class=" mdc-typography--caption">
              test@test.com - test for default username - password
            </span>
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
            value={email}
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
