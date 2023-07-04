import { styled, Box } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 872,
  margin: '1.5rem auto $4',
  padding: '0 $4',
  // border: '1px solid red',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    maxWidth: '100%',
    padding: '0 $2',
  },
})

export const FormHeader = styled(Box, {
  display: 'flex',
  marginTop: '$6',
  flexDirection: 'column',
  gap: '$4',
  // border: 'solid 1px red',

  '@media (max-width: 767px)': {
    display: 'flex',
    flexDirection: 'column',
    // border: 'solid 1px red',
  },
})

export const Form = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$6',
  gap: '$4',
  // border: 'solid 1px red',

  '@media (max-width: 767px)': {
    display: 'flex',
    flexDirection: 'column',
    // border: 'solid 1px red',
  },
})
