import { h } from 'preact';
import Card from 'preact-material-components/Card';
import styled, { css } from 'styled-components';

const commonPadding = css`
  padding: 1em;
`;

const CardHeader = styled.section`
  ${commonPadding};
`;

const CardBody = styled.section`
  ${commonPadding};
`;

const CardFooter = styled.section`
  ${commonPadding};
`;

const CardLayout = ({ header, children, body = children, footer }) => (
  <Card>
    <CardHeader>{header}</CardHeader>
    <CardBody>{body}</CardBody>
    <CardFooter>{footer}</CardFooter>
  </Card>
);

export default CardLayout;
