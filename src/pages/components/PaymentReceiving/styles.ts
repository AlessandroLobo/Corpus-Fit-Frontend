import { styled, Box } from '@ignite-ui/react'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1rem',
  // border: '1px solid red',
})

export const Form = styled(Box, {
  display: 'block',
  flexDirection: 'column',
  width: '38rem',
  // height: '43rem',
  gap: '$4',
  // border: '1px solid red',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const TextInput = styled('input', {
  height: '45px',
  color: '$gray100',
  borderRadius: '8px',
  padding: '$2 $4',
  fontSize: '15px',
  backgroundColor: '$gray900',
  border: 'none',
  appearance: 'none',

  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 1px $colors$ignite300',
  },
})

export const Text = styled('text', {
  display: 'flex',
  textAlign: 'left',
  fontSize: '0.95rem',
  paddingBottom: '0.5rem',
})
