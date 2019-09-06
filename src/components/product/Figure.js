import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';
import { colors } from '@theme';

export default styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: ${colors.whiteTwo};
`;
