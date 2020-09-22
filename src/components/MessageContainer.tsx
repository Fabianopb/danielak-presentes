import React from 'react';
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

type Props = {
  header?: string;
  message?: string;
};

const Root = styled.div.attrs({ className: 'ui form error' })`
  margin: 8px 0;
`;

const MessageContainer = ({ header, message }: Props) => (
  <Root>
    <Message error header={header} content={message} />
  </Root>
);

export default MessageContainer;
