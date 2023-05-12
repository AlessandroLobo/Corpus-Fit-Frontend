import { styled, Box } from '@ignite-ui/react'

export const Form = styled(Box, {
  display: 'block',
  flexDirection: 'column',
  width: '38rem',
  height: '43rem',
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

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1rem',
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
  // border: '1px solid red',

  '@media (max-width: 768px)': {
    textAlign: 'left',
  },
})

export const ContainerPlan = styled('div', {
  gap: '1rem',
  paddingTop: '1rem',
  // paddingBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  // border: '1px solid red',
})

export const ContainerPlanTitle = styled('div', {
  display: 'flex',
  flexDirection: 'column',
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

export const TextInputContainer = styled('div', {
  flex: '1',
  display: 'block',
  flexDirection: 'row',
  alignItems: 'left',
  textAlign: 'left',
})

export const Text = styled('text', {
  display: 'flex',
  textAlign: 'left',
  fontSize: '0.95rem',
  paddingBottom: '0.5rem',
})

export const ButtonContainer = styled('div', {
  height: '5rem',
  marginTop: '0rem',
  paddingBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'row',
    gap: '$2',
  },

  '@media (max-width: 767px)': {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    // border: 'solid 1px red',
  },
})

export const Button = styled('button', {
  flex: '1',
  gap: '0.3rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 24px',
  borderRadius: '4px',
  backgroundColor: '#007bff',
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

export const ButtonCreatePlan = styled('button', {
  gap: '0.3rem',
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  lineHeight: '1.5rem',
  justifyContent: 'center',
  padding: '12px 24px',
  borderRadius: '4px',
  backgroundColor: '#007bff',
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

  '&:disabled': {
    backgroundColor: '$gray500',
    cursor: 'not-allowed',
    color: '$gray400',
  },
})

export const Line = styled('div', {
  color: '$gray100',
  flexGrow: '1',
  height: '1px',
  backgroundColor: '$gray500',
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

// ------------------ Cancelar Alert ------------------//

export const ContainerAlert = styled('main', {
  maxWidth: 872,
  margin: '$20 auto $4',
  padding: '0 $4',
  // border: '1px solid red',
})

export const OverlayAlert = styled('div', {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
  backdropFilter: 'blur(5px)', // define o efeito de desfoque
})

export const ContainerModalAlert = styled('div', {
  display: 'flex  ',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 872,
  width: '25rem',
  height: '10rem',
  margin: '$20 auto $4',

  position: 'fixed',
  top: 'calc(55% - 280px)', // move o modal 100 pixels para cima
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  backgroundColor: '$gray700',
  border: 'none',
  borderRadius: '8px',
  // boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
  // border: '1px solid red',
})

export const TextAlert = styled('div', {
  paddingTop: '1rem',

  h2: {
    color: '#ff3111',
  },
})

export const ButtonAlert = styled('button', {
  gap: '0.3rem',
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  lineHeight: '1.5rem',
  maxWidth: '9rem',
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

export const ButtonContainerAlert = styled('div', {
  display: 'flex',
  gap: '4rem',
  justifyContent: 'center',
  borderRadius: '8px',
  fontSize: '20px',
  alignItems: 'center',
  width: '100%',
  marginTop: '2rem',

  color: '$gray400',
  // border: '1px solid red',

  '&:hover': {
    color: '$ignite300',
    cursor: 'pointer',
  },
})
