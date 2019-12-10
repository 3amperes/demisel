import React from 'react';
import styled from 'styled-components';
import { color, space } from 'styled-system';
import { up } from 'styled-breakpoints';
import { Text, Box } from 'rebass/styled-components';
import { colors } from '@theme';
import { navLink } from '@utils/mixins';

const CloseIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 16"
    width="16"
    {...props}
  >
    <path
      d="M0 .707L.707 0 15.96 15.252l-.707.707zM.004 14.739L5.94 9.184l.683.73L.687 15.47zM8.96 6.37L15.247.487l.683.73L9.643 7.1z"
      transform="translate(3)"
    ></path>
  </svg>
);

const Wrapper = styled(Box)`
  max-width: 430px;
  padding: 3rem 1.5rem;
  text-align: center;
  background-color: ${colors.white};
  position: fixed;
  right: 0;
  bottom: 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  ${up('desktop')} {
    right: 2rem;
    bottom: 2rem;
  }

  a {
    ${navLink()};
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
`;

const Button = styled.button`
  border: none;
  background: transparent;
  font-weight: bold;
  ${navLink()};
  ${color};
  ${space};
`;

export default ({ toggleCookie, onClose, ...rest }) => (
  <Wrapper {...rest}>
    <Text fontSize="12px" lineHeight="24px">
      Chez nous on a les Kouign Amann, sur internet on a les cookies… L’objectif
      est le même : vous donner envie de revenir ! <br /> En naviguant sur les
      pages de notre site vous acceptez l’utilisation des cookies à des fins
      d’amélioration de votre navigation.
    </Text>
    <Text mt="1rem" color="warmGrey">
      <Button onClick={() => toggleCookie(true)} color="lipstick">
        Accepter
      </Button>
      <Button onClick={() => toggleCookie(false)} color="warmGrey" ml="2rem">
        Refuser
      </Button>
      <div>
        <a href="https://www.cnil.fr/fr/site-web-cookies-et-autres-traceurs">
          En savoir plus
        </a>
      </div>
    </Text>
    <CloseIcon onClick={onClose} className="close" />
  </Wrapper>
);
