import { Box, styled } from '@ignite-ui/react'

export const Container = styled('main', {
  display: 'block',
  justifyContent: 'center',
  width: '100%',
  marginTop: '1rem',
  padding: '0 $4',
  zIndex: 999,
  // border: '1px solid red',

  '@media (max-width: 768px)': {
    maxWidth: '20rem',
  },
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

export const Form = styled(Box, {
  display: 'flex',
  // justifyContent: 'space-between',
  marginTop: '2rem',
  marginBottom: '2rem',
  flexDirection: 'column',
  width: '100%',
  gap: '$4',
  // border: '1px solid red',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const ContainerList = styled(Box, {
  width: '100%',
  maxWidth: '1120px',
  paddingBottom: '2rem',
  marginBottom: '1rem',
  overflowX: 'auto',
  // border: '1px solid red',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    maxWidth: '100%',
    margin: '$20 auto',
    padding: '0 $2',
    overflowX: 'auto',
  },
})

export const TextInputContainer = styled('div', {
  flex: '1',
  display: 'block',
  width: '100%',
  alignItems: 'left',
  textAlign: 'left',
  // border: '1px solid red'
})

export const InputContainer = styled('div', {
  gap: '2rem',
  display: 'flex',
  flexDirection: 'row',
  // border: 'solid 1px red',
})

export const TextInputFindContainer = styled('div', {
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'space-between',
  // border: 'solid 1px red',
})

export const Text = styled('text', {
  display: 'flex',
  textAlign: 'left',
  fontSize: '0.95rem',
  paddingBottom: '0.5rem',
  // border: 'solid 1px red',
})

export const TextInput = styled('input', {
  display: 'block',
  height: '45px',
  width: '100%',
  color: '$gray100',
  borderRadius: '8px',
  padding: '$2 $4',
  fontSize: '15px',
  backgroundColor: '$gray900',
  border: 'none',
  appearance: 'none',

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 1px $colors$ignite300',
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

export const Line = styled('div', {
  color: '$gray100',
  flexGrow: '1',
  marginTop: '1.5rem',
  height: '1px',
  backgroundColor: '$gray500',
})

export const Table = styled('table', {
  paddingTop: '1rem',
  margin: '0',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  // border: '1px solid red',
})

export const Thead = styled('thead', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 .5rem',
  borderTopLeftRadius: '6px',
  borderBottomRightRadius: '6px',

  td: {
    height: '40px',
    padding: '0.05rem 1rem',
    background: '$gray600',
    verticalAlign: 'middle',
    // border: '1px solid red',

    '&:first-child': {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },

    '&:last-child': {
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
  },
})

export const TbodyResult = styled('tbody', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 .7rem',
  borderTopLeftRadius: '6px',
  borderBottomRightRadius: '6px',

  td: {
    height: '40px',
    background: '$gray700',
    fontSize: '1rem',
    fontWeight: '400',
    position: 'relative',

    '&:first-child': {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },

    '&:last-child': {
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },

    '&:hover': {
      color: '#00e7f9',
      cursor: 'pointer',
    },

    input: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      padding: '10px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '$gray700',
      color: '$gray100',
      fontSize: '14px',

      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 2px $colors$ignite500',
      },

      '&:hover': {
        color: '#00e7f9',
        cursor: 'pointer',
      },
    },
  },

  'tr:nth-child(even) td': {
    color: '$gray300',
    backgroundColor: '$gray600',

    '&:hover': {
      color: '#00e7f9',
      cursor: 'pointer',
    },

    input: {
      backgroundColor: '$gray600',
      color: '#00e7f9',

      '&:focus': {
        boxShadow: '0 0 0 2px $colors$ignite500',
      },

      '&:hover': {
        color: '#00e7f9',
        cursor: 'pointer',
      },
    },
  },
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

  '@media (max-width: 768px)': {
    gap: '2rem',
  },
})

export const ButtonSave = styled('button', {
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

  '&:disabled': {
    backgroundColor: '$gray500',
    cursor: 'not-allowed',
    color: '$gray400',
  },
})

export const ButtonUpdate = styled('button', {
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

  '&:disabled': {
    backgroundColor: '$gray500',
    cursor: 'not-allowed',
    color: '$gray400',
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

  '&:disabled': {
    backgroundColor: '$gray500',
    cursor: 'not-allowed',
    color: '$gray400',
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
