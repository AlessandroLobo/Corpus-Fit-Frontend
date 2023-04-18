import { styled } from '@ignite-ui/react'

export const HamburguerContainer = styled('div', {
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  // border: '1px solid red',

  '@media (max-width: 767px)': {
    display: 'flex',
  },
})

export const HamburguerTrace = styled('div', {
  width: '50px',
  height: '50px',
  borderRadius: '10px',
  position: 'relative',

  zIndex: 1000,
  transition: 'transform 0.5s ease',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: '45%',
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
  },
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

  '&.hamburguer-active': {
    width: '50px',
    height: '50px',
    position: 'relative',

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
  },

  '&:hover': {
    backgroundColor: '$gray600',
  },
})
