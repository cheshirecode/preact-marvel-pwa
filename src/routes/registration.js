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

const RegistrationPage = ({ setEmail, setPassword, setRememberMe, onSubmit }) => (
  <StyledFormLayout>
    <CardLayout
      header={
        <Fragment>
          <h2 class=" mdc-typography--title">Registration</h2>
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
          <Checkbox type="checkbox" value="remember-me" onChange={this.handleRememberMeClick} />
          <label>&nbsp; Remember me</label>
          <StyledButton raised>Register</StyledButton>
        </StyledFormField>
      </form>
    </CardLayout>
  </StyledFormLayout>
);

export default withFormHandlers({
  onSubmit: ({ email, password, rememberMe }) => event => {
    event.preventDefault();

    const user = new User();
    user.set('username', email);
    user.set('email', email);
    user.set('password', password);
    user.set('rememberMe', rememberMe);

    user.signUp(null).then(
      user => {
        alert('User created successfully with email: ' + user.get('email')); //eslint-disable-line no-alert
      },

      error => {
        this.setState({
          errorMsg: 'Error ' + error.code + ': ' + error.message
        });
      }
    );
  }
})(RegistrationPage);
