import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Heading, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import { coloredSection } from '@utils/mixins';

const Wrapper = styled(Flex)`
  ${coloredSection('595px', 'to right')};
`;

const Form = styled.form`
  width: 100%;
  height: 68px;
  background-color: ${colors.white};
  padding: 20px;
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
    <Box maxWidth="330px" px="0.5rem" mb="70px" textAlign="center">
      <Heading fontSize={[32, 48]} as="h2" mb="1rem">
        Restez informés
      </Heading>
      <Text fontSize={14} lineHeight={1.8}>
        Inscrivez-vous à notre newsletter et soyez au courant des nouvelles
        collections, nouveaux modèles et des offres promotionnelles.
      </Text>
    </Box>
    <Box width={['90%', 1]} maxWidth="420px">
      <Form
        action="https://demiselbijoux.us4.list-manage.com/subscribe/post?u=82d123f955831cfd6e69c3fa3&amp;id=8036f1697c"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        rel="noopener noreferrer"
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
        <div
          style={{ position: 'absolute', left: '-5000px' }}
          aria-hidden="true"
        >
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
    </Box>
  </Wrapper>
);
