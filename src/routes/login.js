import { h, Component } from 'preact';
const Fragment = 'x-fragment'; //https://github.com/developit/preact/issues/946#issuecomment-353151850
import FormField from 'preact-material-components/FormField';
import TextField from 'preact-material-components/TextField';
import Checkbox from 'preact-material-components/Checkbox';
import Button from 'preact-material-components/Button';
import FormLayout from '../layouts/form';
import CardLayout from '../layouts/card';
import styled from 'styled-components';
import Parse from 'Parse';

const StyledFormLayout = styled(FormLayout)`
  padding: 1.25em;
`;

const StyledFormField = styled(FormField)`
  padding-top: 1em;
  width: 100%;
`;

const TextFieldWrapper = styled.div`
  padding-top: 1em;
`;

const SubmitButton = styled(Button)`
  align-self: right;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '', rememberMe: false };
  }

  handleRememberMeClick = () =>
    this.setState({
      rememberMe: !this.state.rememberMe
    });

  handleUsernameChange = event => this.setState({ email: event.target.value });

  handlePasswordChange = event => this.setState({ password: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    const user = new Parse.User();
    user.set('username', this.state.email);
    user.set('email', this.state.email);
    user.set('password', this.state.password);
    user.set('rememberMe', this.state.rememberMe);

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
  };

  render = () => (
    <StyledFormLayout>
      <CardLayout
        header={
          <Fragment>
            <h2 class=" mdc-typography--title">Login</h2>
          </Fragment>
        }
      >
        <form onSubmit={this.handleSubmit}>
          <TextFieldWrapper>
            <TextField
              type="text"
              label="Email address"
              fullwidth
              onChange={this.handleUsernameChange}
              helperText={this.state.errorMsg}
              helperTextPersistent={!!this.state.errorMsg}
            />
          </TextFieldWrapper>
          <TextFieldWrapper>
            <TextField
              type="password"
              label="Password"
              fullwidth
              onChange={this.handlePasswordChange}
            />
          </TextFieldWrapper>
          <StyledFormField>
            <Checkbox type="checkbox" value="remember-me" onChange={this.handleRememberMeClick} />
            <label>&nbsp; Remember me</label>
            <SubmitButton raised>Sign up</SubmitButton>
          </StyledFormField>
        </form>
      </CardLayout>
    </StyledFormLayout>
  );
}
