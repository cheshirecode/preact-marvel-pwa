import FormField from 'preact-material-components/FormField';
import Button from 'preact-material-components/Button';
import TextField from 'preact-material-components/TextField';
import FormLayout from '../layouts/form';
import styled from 'styled-components';

export const StyledFormLayout = styled(FormLayout)`
  padding: 1.25em;
`;

export const StyledFormField = styled(FormField)`
  padding-top: 1em;
  width: 100%;
`;

export const TextFieldWrapper = styled(TextField)`
  padding-top: 1em;
  /* avoid the warning then using fullwidth props + label */
  .mdc-text-field {
    width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  align-self: right;
  margin-left: 1em;
`;
