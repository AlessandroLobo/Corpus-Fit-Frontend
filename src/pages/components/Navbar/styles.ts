import { styled } from '@ignite-ui/react'

export const Nav = styled('nav', {
  borderRadius: 10,
  maxWidth: '95%',
  margin: '$4 auto 0 auto',
  padding: '0 $4',
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'left',
  backgroundColor: '$gray800',
  height: '100px',
  // border: '1px solid red',
})

export const HeaderTitle = styled('div', {
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  paddingLeft: '20px',
  fontSize: '30px',
})

export const LinkContainer = styled('div', {
  display: 'flex',
  width: '50%',
  justifyContent: 'space-between',
  textAlign: 'center',
  alignItems: 'center',

  // border: '1px solid red',

  '& > a': {
    marginRight: '30px',
    color: '$gray100',
    textDecoration: 'none',
    '&:hover': {
      color: '#00e7f9',
      textDecoration: 'none',
    },
  },
})

export const TextHeader = styled('h1', {
  color: '#00e7f9',
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  paddingLeft: '20px',
  fontSize: '1.2rem',
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

export const ReaderFindSeach = styled('div', {
  fontSize: '20px',
  marginRight: '50px',
  color: '$ignite300',
  gap: '80px',

  '& > span': {
    marginRight: '30px',
  },

  '& > a': {
    color: '$gray100',
    textDecoration: 'none',
  },
  '& > a:hover': {
    color: '$ignite300',
    textDecoration: 'none',
  },
})

export const HeaderInfo = styled('div', {
  display: 'flex',
  gap: '10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '20px',
})

export const NameAndEmail = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center  ',
})

export const ProfilePhoto = styled('div', {
  maxWidth: '50px',
  maxHeight: '50px',
})

export const SignOutButton = styled('div', {
  borderRadius: '8px',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  width: '100px',
  height: '30px',
  marginRight: '20px',

  '&:hover': {
    color: '#00e7f9',
    cursor: 'pointer',
  },
})

export const HamburguerContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // border: '1px solid red',
})

export const Hamburguer = styled('div', {
  width: '50px',
  height: '50px',
  borderRadius: '10px',
  position: 'relative',
  transition: 'transform 0.5s ease',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: '20%',
    left: '15%',
    width: '70%',
    height: '10%',
    borderRadius: '20px',
    backgroundColor: '#00e7f9',
    transition: 'transform 0.5s ease',
  },

  '&:after': {
    content: '""',
    position: 'absolute',
    top: '70%',
    left: '15%',
    width: '70%',
    height: '10%',
    borderRadius: '20px',
    backgroundColor: '#00e7f9',
    transition: 'transform 0.5s ease',
  },

  '&:nth-child(3)': {
    content: '""',
    position: 'relative',
    top: '50%',
    left: '15%',
    width: '70%',
    height: '10%',
    borderRadius: '20px',
    backgroundColor: '#00e7f9',
    transition: 'transform 0.5s ease',
  },

  '&.hamburguer-active': {
    width: '50px',
    height: '50px',
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: '44%',
      left: '10%',
      width: '80%',
      height: '10%',
      transform: 'rotate(-225deg)',
      backgroundColor: '#00e7f9',
      transition: 'transform 0.5s ease',
    },

    '&:before': {
      content: '""',
      position: 'absolute',
      top: '44%',
      left: '10%',
      width: '80%',
      height: '10%',
      transform: 'rotate(225deg)',
      backgroundColor: '#00e7f9',
      transition: 'transform 0.5s ease',
    },

    '&:nth-child(3)': {
      content: '""',
      position: 'absolute',
      top: '40%',
      left: '15%',
      width: '70%',
      height: '10%',
      borderRadius: '20px',
      backgroundColor: '$gray800',
      transition: 'transform 0.5s ease',
    },
  },

  '&:hover': {
    backgroundColor: '$gray600',
  },
})
