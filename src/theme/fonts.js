import { rem } from 'polished';

export const fonts = {
  heading: '"orpheuspro", serif',
  text: '"Nunito", Arial, sans-serif',
};

export const fontWeigths = {
  heading: {
    normal: 400,
    emphase: 600,
  },
  text: {
    normal: 400,
    emphase: 600,
  },
};

const fontSizesinPx = [10, 12, 14, 16, 18, 20, 21, 24, 28, 32, 42];
export const fontSizes = fontSizesinPx.map(size => rem(size));

const lineHeightsinPx = [13, 14, 19, 21, 22, 24, 28, 32, 36, 48];
export const lineHeights = lineHeightsinPx.map(size => rem(size));

export const letterSpacings = {
  normal: 'normal',
  tracked: '0.1em',
  tight: '-0.05em',
  mega: '0.25em',
};
