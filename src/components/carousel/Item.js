import React from 'react';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { colors } from '@theme';
import { container } from '@utils/mixins';

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${props => (props.isCurrent ? 1 : 0)};
  position: ${props => (props.isCurrent ? 'relative' : 'absolute')};
  transition: all 250ms ease-in-out;
`;
const Inner = styled(Flex)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0
  bottom: 0;
  align-items: center;
  color: ${colors.white};
`;

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 2fr 3fr;
  ${container};
`;

const Button = styled.button`
  color: currentColor;
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
    background-color: currentColor;
  }
`;

export default ({ fluid, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <Image height={400} fluid={fluid} />
      <Inner>
        <Grid>
          <div>
            <Heading fontSize={[32, 48]} lineHeight={1.2} as="h2" mb="1rem">
              Nouvelle collection en cuir végétal
            </Heading>
            <Text fontSize={14} lineHeight={1.8} mb="60px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              libero sequi voluptates corporis vitae eligendi rerum reiciendis,
              provident error totam.
            </Text>
            <Button>Découvrir</Button>
          </div>
        </Grid>
      </Inner>
    </Wrapper>
  );
};
