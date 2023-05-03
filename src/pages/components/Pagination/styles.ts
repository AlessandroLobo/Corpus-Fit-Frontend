import { styled } from '@ignite-ui/react'

export const ButtonContainer = styled('div', {
  paddingTop: '0.5rem',
  display: 'flex',
  margin: '0 auto',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  color: '$gray400',
  // border: '1px solid $gray400',

  ul: {
    // gap: '5rem',
    display: 'flex',
    listStyle: 'none',
    gap: '1rem',
    '&:focus': {
      // outline: 'none',
    },

    '@media (max-width: 768px)': {
      gap: '0.1rem',
    },

    '&:hover': {
      color: '$ignite300',
      cursor: 'pointer',
    },
  },

  li: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    border: 'none',
    width: '3rem',
    height: '2rem',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',

    '@media (max-width: 768px)': {
      gap: '0.1rem',
    },

    '&:focus': {
      outline: 'none',
    },
  },

  '&:hover': {
    color: '$ignite300',
    cursor: 'pointer',
  },
})

export const ButtonItem = styled('button', {
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  lineHeight: '1rem',
  justifyContent: 'center',
  padding: '12px ',
  width: '100%',
  borderRadius: '6px',
  backgroundColor: '$gray600',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '100',
  border: 'none',
  cursor: 'pointer',
  transition: '.2s ease-in-out',

  '@media (max-width: 768px)': {
    gap: '0.1rem',
  },

  '&:hover': {
    backgroundColor: '#0069d9',
  },

  variants: {
    focusCurrentPage: {
      true: {
        color: '#00e7f9',
        backgroundColor: '$ignite100',
      },
    },
  },
})

export const Button = styled('button', {
  display: 'flex',
  marginLeft: '1rem',
  marginRight: '1rem',
  padding: '12px ',
  borderRadius: '6px',
  backgroundColor: '$gray600',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '100',
  border: 'none',
  cursor: 'pointer',
  transition: '.2s ease-in-out',

  '@media (max-width: 768px)': {
    marginLeft: '0.1rem',
    marginRight: '0.1rem',
  },

  '&:hover': {
    backgroundColor: '#0069d9',
  },

  '&:disabled': {
    backgroundColor: '$gray500',
    cursor: 'not-allowed',
    color: '$gray400',
  },
})
