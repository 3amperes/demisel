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

const Item = styled.li`
  text-transform: uppercase;
  color: ${colors.lipstick};
  margin-right: 80px;
  font-size: 14px;
  line-height: 1.8;

  &:last-child {
    margin-right: 0;
  }
`;

export default props => (
  <Wrapper {...props}>
    <Box width="350px" mb="70px" textAlign="center">
      <Heading fontSize={[32, 48]} as="h2" mb="1rem">
        Nos engagements
      </Heading>
      <Text fontSize={14} lineHeight={1.8}>
        Nous pensons à l’avenir, à notre terre et nos enfants et nous tenons
        donc à nous engager pour tenter de créer des lendemains meilleurs.
      </Text>
    </Box>
    <Flex as="ul">
      <Item>#1%pourlaplanète</Item>
      <Item>#zérodéchet</Item>
      <Item>#recyclage</Item>
      <Item>#upcycling</Item>
      <Item>#handmade</Item>
    </Flex>
  </Wrapper>
);
