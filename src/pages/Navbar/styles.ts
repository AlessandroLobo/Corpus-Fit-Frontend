import { styled } from '@ignite-ui/react'

export const Nav = styled('nav', {
  display: 'flex',
  borderRadius: 10,
  maxWidth: '95%',
  margin: '$4 auto 0 auto',
  justifyContent: 'space-between',
  textAlign: 'left',
  backgroundColor: '$gray800',
  height: '5.25rem',
  // border: '1px solid $gray500',
  transition: 'transform 0.5s ease',

  '@media (max-width: 767px)': {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 $5',
    paddingBottom: '1rem',
    height: '100vh',
    width: '100%',
    maxHeight: '5.25rem',
    transition: 'transform 0.5s ease',

    // border: '1px solid red',
  },
})

export const HeaderTitle = styled('div', {
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  paddingLeft: '20px',
  fontSize: '30px',

  '@media (max-width: 767px)': {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left',
    paddingTop: '1rem',
    paddingLeft: '0rem',
    pagdinbottom: '0rem',
    margin: '0',
    width: '100%',
    // border: '1px solid red',
  },
})

export const Container = styled('div', {
  display: 'flex',
  gap: '2rem',
  // border: '1px solid red',

  '@media (max-width: 767px)': {
    paddingTop: '1rem',
    gap: '0rem',
    flexDirection: 'column',

    // border: '1px solid red',
  },
})

export const LinkContainer = styled('div', {
  gap: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'right',
  alignItems: 'center',

  // border: '1px solid red',

  '& > a': {
    fontWeight: 'bold',
    color: '$gray100',
    textDecoration: 'none',

    '&:hover': {
      color: '#00e7f9',
      textDecoration: 'none',
      transition: 'color 0.5s ease-in-out',
      transitionDuration: '0.5s',
    },

    '@media (max-width: 767px)': {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: '0',
    },
  },

  '@media (max-width: 767px)': {
    gap: '0.6rem',
    flexDirection: 'column',
    paddingBottom: '1rem',
    // border: '1px solid red',
  },
})

export const ImageLogo = styled('img', {
  marginRight: '50px',
  width: '60px',
  height: '60px',
  filter: 'brightness(10000%)',
})

export const ReaderFindRegister = styled('div', {
  fontSize: '20px',
  marginRight: '50px',
  color: '$ignite300',

  '& > a': {
    marginRight: '30px',
    color: '$gray100',
    textDecoration: 'none',
    '&:hover': {
      color: '$ignite300',
      textDecoration: 'none',
    },
  },

  '& > span': {
    color: '$gray300',
  },
})

export const HeaderInfo = styled('div', {
  display: 'flex',
  gap: '10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '20px',

  '@media (max-width: 767px)': {
    gap: '0rem',
    textAlign: 'center',
    alignItems: 'center',
    margin: '0',
    paddingRight: '0px',
    // border: '1px solid red',
  },
})

export const NameAndEmail = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  fontSize: '0.9rem',
  // border: '1px solid red',

  '@media (max-width: 767px)': {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    alignItems: 'center',
    paddingRight: '0px',
    // border: '1px solid red',
  },
})

export const ProfilePhoto = styled('div', {
  maxWidth: '50px',
  maxHeight: '50px',
})

export const SignOutButton = styled('div', {
  display: 'flex',
  borderRadius: '8px',
  fontSize: '20px',

  width: '100px',
  height: '30px',
  marginRight: '20px',

  '& > a': {
    color: '$gray100',
    textDecoration: 'none',

    '&:hover': {
      color: '#00e7f9',
      cursor: 'pointer',
    },
  },

  '@media (max-width: 767px)': {
    flexDirection: 'column',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    alignItems: 'center',
    height: '80px',
    padding: '1rem',
    marginRight: 0,
    // border: '1px solid red',
  },
})
