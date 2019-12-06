import { css } from 'styled-components';
import { colors, fonts, fontWeigths } from '@theme';
import { up } from 'styled-breakpoints';

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

export const navLink = () => css`
  text-decoration: none;
  display: inline-block;
  padding: 0.5rem 0;
  color: currentColor;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    margin-top: 2px;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 250ms ease;
  }

  &:hover,
  &:focus,
  &.active {
    &:after {
      opacity: 1;
    }
  }
`;

export const richText = () => css`
  a {
    ${link(colors.lipstick)};
  }

  h3 {
    font-size: 28px;
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-family: ${fonts['heading']};
    font-weight: ${fontWeigths['heading']};
  }
  h4 {
    font-size: 24px;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  ul {
    padding: 0.5rem 1rem;
    list-style: disc;
    li {
      margin-bottom: 0.25rem;
    }
  }
`;

export const coloredSection = (height = '600px', orientation = '111deg') => css`
  width: 100%;
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.ligthPeach};
  background-image: linear-gradient(
    ${orientation},
    rgba(215, 239, 244, 0),
    #cbebf2
  );
  ${up('tablet')} {
    height: ${height};
  }
`;

export const filigrane = () => css`
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(84, 84, 84, 0) 50%
    );
  }
`;
