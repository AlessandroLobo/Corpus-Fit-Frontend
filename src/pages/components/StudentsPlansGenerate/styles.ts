import { styled, Box } from '@ignite-ui/react'

export const Form = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  width: '38rem',
  height: '41rem',
  gap: '$4',
  // border: '1px solid red',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormData = styled('div', {
  // border: '1px solid #ccc',
  gap: '10px',
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'row',

  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
})

export const TextInputContainer = styled('div', {
  flex: '1',
  display: 'block',
  flexDirection: 'row',
  alignItems: 'left',
  textAlign: 'left',
})

export const Text = styled('text', {
  textAlign: 'left',
  fontSize: '0.95rem',
})

export const FormError = styled('div', {
  textAlign: 'left',
  [`${Text}`]: {
    color: '#ff3111',
  },
  span: {
    color: '#FF4136',
  },
})
