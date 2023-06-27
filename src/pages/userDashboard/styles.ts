import { styled, Box } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 872,
  margin: '1.5rem auto $4',
  padding: '0 $4',
  // border: '1px solid red',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    maxWidth: '100%',
    margin: '2rem auto',
    padding: '0 $2',
  },
})

export const Form = styled(Box, {
  display: 'flex',
  marginTop: '$6',
  paddingLeft: '0.8rem',
  flexDirection: 'column',
  gap: '$4',
  // border: 'solid 1px red',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
  },
})

export const ButtonCadContainer = styled(Box, {
  // height: '1rem',
  marginTop: '0rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'space-between',
  // marginBottom: '4rem',
  flexDirection: 'column',
  // gap: '$4',
  // border: 'solid 1px red',

  label: {
    display: 'flex',
    flexDirection: 'row',
    gap: '$2',
  },

  '@media (max-width: 767px)': {
    // marginBottom: '2rem',
    flexDirection: 'column',
    marginTop: 0,
    // border: 'solid 1px red',
  },
})

export const TextHeader = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
})

export const Text = styled('text', {
  display: 'flex',
  textAlign: 'left',
  fontSize: '0.95rem',
  paddingBottom: '0.5rem',
})
