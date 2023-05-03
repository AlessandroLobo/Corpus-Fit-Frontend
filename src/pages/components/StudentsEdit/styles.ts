import { styled, Box } from '@ignite-ui/react'

export const Header = styled('div', {
  borderRadius: 10,
  maxWidth: '95%',
  margin: '$4 auto $1',
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
  // border: '1px solid red',
})

export const TextInfo = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  paddingLeft: '20px',
  height: '14rem',
  fontSize: '16px',
  width: '100%',
  // height: '100%',
  // border: '1px solid red',
})

export const Text = styled('text', {
  textAlign: 'left',
  fontSize: '0.95rem',
})

export const Select = styled('select', {
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

export const Option = styled('option', {
  backgroundColor: '$gray900',
  color: '$gray100',
})

export const HeaderInfo = styled('div', {
  display: 'flex',
  gap: '10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '20px',
  border: '1px solid red',
})

export const NameAndEmail = styled('div', {
  textAlign: 'left',
})

export const SignOutButton = styled('div', {
  borderRadius: '8px',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  width: '100px',
  height: '30px',
  marginRight: '20px',
  color: '$gray400',

  '&:hover': {
    color: '$ignite300',
    cursor: 'pointer',
  },
})

export const TextInput = styled('input', {
  backgroundColor: 'transparent !important',
  border: 'none',
  borderBottom: '1px solid #333',
  color: '#333',
  textTransform: 'uppercase',

  '&:-webkit-autofill, &:-internal-autofill-selected': {
    backgroundColor: 'transparent !important',
  },

  '&::placeholder': {
    color: '#333',
  },

  '& input:-webkit-autofill': {
    '-webkit-box-shadow': '0 0 0 30px white inset !important',
    '-webkit-text-fill-color': '#333 !important',
  },
})

export const ProfilePhoto = styled('div', {
  maxWidth: '50px',
  maxHeight: '50px',
})

export const Line = styled('div', {
  color: '$gray100',
  flexGrow: '1',
  height: '1px',
  backgroundColor: '$gray500',
})

export const Container = styled('main', {
  maxWidth: 872,
  margin: '$8 auto $4',
  padding: '0 $4',
  zIndex: 1000,
})

export const Form = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormDataTelSexo = styled('div', {
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

export const ButtonContainer = styled('div', {
  display: 'flex',
  gap: '100px',
  justifyContent: 'center',
  borderRadius: '8px',
  fontSize: '20px',
  alignItems: 'center',
  width: '100%',
  // height: '30px',
  marginRight: '20px',
  color: '$gray400',

  '&:hover': {
    color: '$ignite300',
    cursor: 'pointer',
  },
})

export const ButtonDelete = styled('button', {
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
    backgroundColor: '#B71C1C',
  },

  '&:active': {
    transform: 'scale(0.98)',
  },
})
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

export const FormError = styled('div', {
  textAlign: 'left',
  [`${Text}`]: {
    color: '#ff3111',
  },
  span: {
    color: '#FF4136',
  },
})
