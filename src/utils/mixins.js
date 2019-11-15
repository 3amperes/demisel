import { css } from 'styled-components';
import { colors } from '@theme';

export const container = ({ my = 0, py = 0 }) => css`
  max-width: 1076px;
  margin: ${my} auto;
  padding: ${py} 1rem;
`;

export const grid = css`
  display: grid;
  grid-template-columns: 1fr repeat(6, minmax(80px, 140px)) 1fr;
  grid-gap: 40px;
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

export const coloredSection = (height = '600px', orientation = '111deg') => css`
  width: 100%;
  height: ${height};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(
    ${orientation},
    rgba(215, 239, 244, 0),
    #cbebf2
  );
`;
