import styled from 'styled-components';
import { Flex } from 'rebass';
import { colors } from '@theme';

export default styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: ${colors.whiteTwo};
  margin-bottom: 1rem;
`;
