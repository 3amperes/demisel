import { css } from 'styled-components';

export const container = ({ my = 0, py = 0 }) => css`
  max-width: 1076px;
  margin: ${my} auto;
  padding: ${py} 1rem;
`;
export const link = (color = 'currentColor') => css`
  display: inline-block;
  color: ${color};
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    margin-top: 2px;
    background-color: ${color};
  }
`;
