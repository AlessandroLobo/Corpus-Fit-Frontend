import { styled } from '@ignite-ui/react'

export const Button = styled('button', {
  gap: '0.3rem',
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  lineHeight: '1.5rem',
  justifyContent: 'center',
  padding: '12px 24px',
  borderRadius: '4px',
  backgroundColor: '$gray600',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
  transition: '.2s ease-in-out',

  '&:hover': {
    backgroundColor: '#0069d9',
  },

  '&:active': {
    transform: 'scale(0.98)',
  },
})

export const PaginationUl = styled('ul', {
  display: 'flex',
  listStyle: 'none',
})

export const PaginationItem = styled('li', {
  background: 'none',
  fontWeight: 'bold',
  border: 'none',

  '&:focus': {
    outline: 'none',
  },
})
