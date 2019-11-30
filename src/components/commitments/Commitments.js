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
  background-image: linear-gradient(111deg, rgba(215, 239, 244, 0), #cbebf2);
`;

const Item = ({ children }) => (
  <Text
    m={['20px 0', '0 40px']}
    color="lipstick"
    fontSize={14}
    lineHeight={1.8}
    textAlign="center"
    style={{ textTransform: 'uppercase' }}
  >
    {children}
  </Text>
);

export default props => (
  <Wrapper {...props}>
    <Box maxWidth="350px" mb={['40px', '70px']} textAlign="center">
      <Heading fontSize={[32, 48]} as="h2" mb="1rem">
        Nos engagements
      </Heading>
      <Text fontSize={14} lineHeight={1.8}>
        Nous pensons à l’avenir, à notre terre et nos enfants et nous tenons
        donc à nous engager pour tenter de créer des lendemains meilleurs.
      </Text>
    </Box>
    <Flex as="ul" flexDirection={['column', 'row']}>
      <li>
        <Item>#zérodéchet</Item>
      </li>
      <li>
        <Item>#recyclage</Item>
      </li>
      <li>
        <Item>#upcycling</Item>
      </li>
      <li>
        <Item>#handmade</Item>
      </li>
    </Flex>
  </Wrapper>
);
