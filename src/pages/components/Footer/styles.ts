import { styled } from '@ignite-ui/react'

export const Footer = styled('footer', {
  display: 'block',
  gap: '$4',
  borderRadius: 10,
  maxWidth: '95%',
  width: '95%',
  padding: '2rem $4',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: '$gray800',
  height: '200px',
  bottom: 0,
  left: 0,
  right: 0,
  margin: '0 auto',

  // border: '1px solid red',

  '@media (max-width: 767px)': {
    gap: '0',
    flexDirection: 'column',
    height: '200px',
    padding: '1rem $4',
    bottom: 0,
    margin: '0 auto',
  },
})

export const ContainerCorpusFit = styled('div', {
  paddingBottom: '1rem',

  // border: '1px solid red',

  '@media (max-width: 767px)': {
    marginTop: '0.rem',
    padding: '0rem',
  },
})

export const Container = styled('div', {
  display: 'flex',
  gap: '$4',
  justifyContent: 'center',

  // border: '1px solid red',

  '@media (max-width: 767px)': {
    paddingTop: '1.2rem',
    flexDirection: 'column',
    marginBottom: '0rem',
  },
})

export const InstagramLogoContainer = styled('a', {
  color: '$white100',
  display: 'flex',
  gap: '$2',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  // border: '1px solid red',

  div: {
    display: 'flex',
    gap: '$2',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15rem',
    height: '3rem',
    borderRadius: 10,
    border: 'solid $gray600',
    transition: 'all 0.3s ease',

    ':hover': {
      color: '$white100',
      transform: 'scale(1)',
    },

    '@media (max-width: 767px)': {
      width: '10rem',
      height: '1.6rem',
      border: 'none',
    },
  },

  ':hover': {
    transform: 'scale(1.1)',
  },
})

export const FacebookLogoContainer = styled('a', {
  color: '$white100',
  display: 'flex',
  gap: '$2',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  // border: '1px solid red',

  div: {
    display: 'flex',
    gap: '$2',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15rem',
    height: '3rem',
    borderRadius: 10,
    border: 'solid $gray600',
    transition: 'all 0.3s ease',

    ':hover': {
      color: '$white100',
      transform: 'scale(1)',
    },

    '@media (max-width: 767px)': {
      width: '10rem',
      height: '1.6rem',
      border: 'none',
    },
  },

  ':hover': {
    transform: 'scale(1.1)',
  },
})

export const FooterRigReservis = styled('div', {
  display: 'flex',

  marginTop: '1rem',
  fontSize: '0.8rem',
  justifyContent: 'center',

  '@media (max-width: 767px)': {
    height: '0rem',
  },
})
