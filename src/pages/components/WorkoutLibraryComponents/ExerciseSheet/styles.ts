import { styled, Box } from '@ignite-ui/react'

export const Container = styled('main', {
  width: 872,
  maxWidth: '100%',

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

export const Form = styled('div', {
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
  // border: '1px solid red'
})
export const Select = styled('select', {
  height: '45px',
  color: '$gray100',
  borderRadius: '8px',
  // padding: '$2 $4',
  fontSize: '15px',
  backgroundColor: '$gray900',
  border: 'none',
  appearance: 'none',

  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 1px $colors$ignite300',
  },
})

export const ButtonCadContainer = styled(Box, {
  marginTop: '0rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'space-between',
  flexDirection: 'column',

  label: {
    display: 'flex',
    flexDirection: 'row',
    gap: '$2',
  },

  '@media (max-width: 767px)': {
    flexDirection: 'column',
    marginTop: 0,
    height: '10rem',
    // border: 'solid 1px red',
  },
})

export const ButtonContainer = styled('div', {
  height: '5rem',
  marginTop: '0rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: '12rem',
  // border: 'solid 1px red',

  label: {
    display: 'flex',
    flexDirection: 'row',
    gap: '$2',
  },

  '@media (max-width: 767px)': {
    display: 'flex',
    gap: '5rem',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    // border: 'solid 1px red',
  },
})

export const ButtonCad = styled('button', {
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 24px',
  borderRadius: '6px',
  height: '4rem',
  maxWidth: '12rem',
  backgroundColor: '$gray700',
  color: '$gray200',
  fontSize: '16px',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
  transition: '.2s ease-in-out',
  // border: 'solid 1px red',

  '&:hover': {
    backgroundColor: '$gray600',
    color: '#00e7f9',
  },

  '&:active': {
    transform: 'scale(0.98)',
  },

  '@media screen and (max-width: 768px)': {
    fontSize: '0rem',
    maxWidth: '6rem',
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

export const TextContainer = styled('div', {
  color: '#00e7f9',
})

export const WorkoutRoutineContainer = styled('div', {
  display: 'flex',
  fontSize: '0.8rem',
  marginLeft: '0rem',
  paddingLeft: '0.5rem',
  width: '49rem',
  height: '4rem',
  alignItems: 'center',
  borderRadius: '6px',
  backgroundColor: '$gray700',
  gap: '1rem',
  // border: 'solid 1px red',

  '&:hover': {
    backgroundColor: '$gray600',
    color: '#00e7f9',
    cursor: 'pointer',
  },

  '@media screen and (max-width: 768px)': {
    width: '19.5rem',
  },
})

export const ContainerList = styled('div', {
  width: '100%',
  maxWidth: '1120px',
  overflowX: 'auto',
  // border: 'solid 1px red',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    maxWidth: '100%',
    // margin: '$20 auto',
    // padding: '0 $2',
    overflowX: 'auto',
  },
})

export const Table = styled('table', {
  paddingTop: '1rem',
  margin: '0',
  width: '100%',
  height: '100%',
  display: 'block',
  // border: 'solid 1px red',
})

export const TableExercices = styled('table', {
  margin: '0',
  width: '100%',
  height: '100%',
  display: 'block',
  // border: 'solid 1px red',
})

export const TextInputContainer = styled('div', {
  flex: '1',
  width: '100%',
  display: 'block',
  flexDirection: 'row',
  alignItems: 'left',
  // border: 'solid 1px red',
})

export const ClipboardTButtonInfoContainer = styled('div', {
  display: 'block',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  // border: 'solid 1px red',

  h3: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
    paddingBottom: '1rem',
  },
})

export const ButtonInfo = styled('button', {
  gap: '0.3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '12px 24px',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
  margin: '0 auto',
  transition: '.2s ease-in-out',

  '&:hover': {
    backgroundColor: '#0069d9',
  },

  '&:active': {
    transform: 'scale(0.98)',
  },
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
  // border: 'solid 1px red',

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 1px $colors$ignite300',
  },
})

export const TextInputSelectPagination = styled('input', {
  height: '3rem',
  color: '$gray100',
  fontSize: '1.3rem',
  maxWidth: '400px',
  width: '5rem',
  padding: '0 1rem',
  border: 'none',
  borderRadius: '6px',
  flexDirection: 'row',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: '$gray700',
})
export const TextInputFindContainer = styled('div', {
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'space-between',
  // border: 'solid 1px red',
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

export const Text = styled('div', {
  textAlign: 'left',
  paddingBottom: '$4',
  // border: 'solid 1px red',
})

export const TextTableExercices = styled('div', {
  textAlign: 'left',
  // border: 'solid 1px red',
})

export const Line = styled('div', {
  margin: '1rem',
  color: '$gray100',
  flexGrow: '1',
  height: '1px',
  backgroundColor: '$gray500',
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

export const ContainerSheet = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const TbodyResult = styled('tbody', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 .7rem',
  borderTopLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  // border: '1px solid red',

  td: {
    // display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '1rem',
    background: '$gray700',
    fontSize: '1rem',
    position: 'relative',
    // border: '1px solid red',

    '@media screen and (max-width: 768px)': {
      /* Quando a largura da tela for menor ou igual a 768 pixels */
      maxWidth: '20rem',
    },

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

export const TrainerSheetContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '6px',
  alignItems: 'center',
  height: '2rem',
  width: '100%',
  // border: '1px solid red',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    maxWidth: '13rem',
    // border: '1px solid red',
  },

  '&:hover': {
    // backgroundColor: '$gray500',
    cursor: 'pointer',
  },
})

export const TrashContainer = styled('div', {
  display: 'flex',
  width: '2rem',
  marginLeft: '1rem',
  marginRight: '1rem',
  borderRadius: '6px',
  alignItems: 'center',
  justifyContent: 'center',
  // border: '1px solid red',

  '&:hover': {
    backgroundColor: '$gray500',
    cursor: 'pointer',
  },
})
export const FormError = styled('div', {
  [`${Text}`]: {
    color: '#ff3111',
  },
  span: {
    color: '#FF4136',
  },
})
