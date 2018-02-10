/*
Breakpoints:
- xs: width < 768px
- sm: 768px <= width < 992px
- md: 992px <= width < 1200px
- lg: 1200px <= width < 1920px
- xl: width > 1920px
*/

export const smOrLess = '(max-width: 991px)';
export const mdOrLess = '(max-width: 1199px)';
export const lgOrLess = '(max-width: 1919px)';

export const smOrGreater = '(min-width: 768px)';
export const mdOrGreater = '(min-width: 992px)';
export const lgOrGreater = '(min-width: 1200px)';

export const xs = '(max-width: 767px)';
export const sm = `${smOrGreater} and ${smOrLess}`;
export const md = `${mdOrGreater} and ${mdOrLess}`;
export const lg = `${lgOrGreater} and ${lgOrLess}`;
export const xl = '(min-width: 1920px)';
