import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Heading, Text } from 'rebass/styled-components';
import { colors } from '@theme';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 600px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(to right, rgba(215, 239, 244, 0), #cbebf2);
`;

const Form = styled.form`
  width: 100%;
  max-width: 420px;
  height: 68px;
  background-color: ${colors.white};
  padding: 1.2rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  input {
    margin-right: auto;
    flex: 1;
    height: 100%;
    border: none;
  }

  button[type='submit'] {
    color: ${colors.lipstick};
    font-weight: 700;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      marfin-top: 2px;
      background-color: ${colors.lipstick};
    }
  }
`;

export default props => (
  <Wrapper {...props}>
    <Box width="330px" mb="70px" textAlign="center">
      <Heading fontSize={[32, 48]} as="h2" mb="1rem">
        Restez informés
      </Heading>
      <Text fontSize={14}>
        Inscrivez-vous à notre newsletter et restez informés des nouvelles
        collections, nouveaux modèles et des offres promotionnelles.
      </Text>
    </Box>
    <Form>
      <input type="text" name="email" placeholder="Saisissez votre email" />
      <button type="submit">S'inscrire</button>
    </Form>
  </Wrapper>
);
