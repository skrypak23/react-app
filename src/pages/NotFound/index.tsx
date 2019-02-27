import React from 'react';
import {Container, InnerContainer, NotFound, SubTitle, Title, Text} from './style';

export default () => (
  <Container>
    <NotFound>
      <InnerContainer>
        <SubTitle>Oops! Page not found</SubTitle>
        <Title>
          <Text>4</Text>
          <Text>0</Text>
          <Text>4</Text>
        </Title>
      </InnerContainer>
    </NotFound>
  </Container>
);
