import { h } from 'preact';
const Fragment = 'x-fragment'; //https://github.com/developit/preact/issues/946#issuecomment-353151850
import TextField from 'preact-material-components/TextField';
import Checkbox from 'preact-material-components/Checkbox';
import CardLayout from '../layouts/card';
import { User } from 'Parse';
import withFormHandlers from '../utils/withFormHandlers';
import { StyledFormLayout, StyledFormField, TextFieldWrapper, StyledButton } from '../style/form';

const LoginPage = ({ setEmail, setPassword, setRememberMe, onSubmit }) => (
  <StyledFormLayout>
    <CardLayout
      header={
        <Fragment>
          <h2 class=" mdc-typography--title">Login</h2>
          <span class=" mdc-typography--caption">
            dummydummy - dummydummy as default username - password
          </span>
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

export default withFormHandlers({
  onSubmit: ({ email, password }) => event => {
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
      },
      error: (user, error) => {
        console.log('The login failed with error: ' + error.code + ' ' + error.message);
      }
    });
  }
})(LoginPage);
