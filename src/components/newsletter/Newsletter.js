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

  label {
    visibilty: hidden;
  }

  input {
    margin-right: auto;
    flex: 1;
    height: 100%;
    border: none;
  }

  button[type='submit'] {
    color: ${colors.lipstick};
    font-weight: 700;
    font-size: 14px;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      margin-top: 2px;
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
      <Text fontSize={14} lineHeight={1.8}>
        Inscrivez-vous à notre newsletter et restez informés des nouvelles
        collections, nouveaux modèles et des offres promotionnelles.
      </Text>
    </Box>
    <Form
      action="https://demiselbijoux.us4.list-manage.com/subscribe/post?u=82d123f955831cfd6e69c3fa3&amp;id=8036f1697c"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      target="_blank"
      novalidate
    >
      {/* <label htmlFor="mce-EMAIL">Email Address</label> */}
      <input
        type="email"
        name="EMAIL"
        id="mce-EMAIL"
        required
        placeholder="Saisissez votre email"
      />
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input
          type="text"
          name="b_82d123f955831cfd6e69c3fa3_8036f1697c"
          tabIndex="-1"
          value=""
          onChange={() => {}}
        />
      </div>
      <button type="submit" id="mc-embedded-subscribe">
        S'inscrire
      </button>
    </Form>
  </Wrapper>
);
