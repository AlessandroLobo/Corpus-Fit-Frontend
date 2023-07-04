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

export const TextContainerBack = styled('div', {
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  width: '5rem',
  height: '2rem',
  gap: '0.1rem',
  justifyContent: 'flex-start',
  marginBottom: '1rem',
  // border: '1px solid red',

  '&:hover': {
    cursor: 'pointer',
    color: '#00e7f9',
  },
})

export const TextBack = styled('span', {
  display: 'block',
  textAlign: 'center',
  justifyContent: 'flex-start',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '20px',
  margin: 0,
})

export const TextHeader = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
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

export const TextContainer = styled('div', {
  color: '#00e7f9',
})

export const ContainerList = styled('div', {
  width: '100%',
  maxWidth: '1120px',
  padding: '0 1.5rem',
  overflowX: 'auto',
  // border: 'solid 1px red',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    maxWidth: '100%',
    margin: '$20 auto',
    padding: '0 $2',
    overflowX: 'auto',
  },
})

export const TrashContainer = styled('div', {
  display: 'flex',
  padding: '1rem',
  margin: '1rem',
  borderRadius: '6px',
  justifyContent: 'flex-end',
  // border: '1px solid red',

  '&:hover': {
    backgroundColor: '$gray500',
    cursor: 'pointer',
  },
})

export const TextInputContainer = styled('div', {
  flex: '1',
  display: 'block',
  flexDirection: 'row',
  alignItems: 'center',
})

export const TextInput = styled('input', {
  flex: '1',
  display: 'block',
  height: '3rem',
  color: '$gray100',
  fontSize: '1.3rem',
  maxWidth: '400px',
  width: '100%',
  padding: '0 1rem',
  border: 'none',
  borderRadius: '6px',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '$gray700',
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
  paddingBottom: '$4',
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
    // padding: '0.05rem 1rem',
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

export const Table = styled('table', {
  display: 'flex',
  flexDirection: 'column',
  margin: '0',
  width: '100%',
  height: '100%',
  // border: 'solid 1px red',
})

export const TbodyResult = styled('tbody', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'left',
  justifyContent: 'left',
  height: '100%',
  width: '100%',
  // border: 'solid 1px red',

  td: {
    display: 'flex',
    height: '100%',
    width: '25rem%',
    gap: '2rem',
    alignItems: 'left',
    justifyContent: 'left',
    backgroundColor: '$gray600',
    fontSize: '1rem',
    fontWeight: '400',
    // border: 'solid 1px red',

    '&:first-child': {
      // width: '100%',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      // border: 'solid 1px red',
    },

    '&:last-child': {
      // width: '100%',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
      // border: 'solid 1px red',
    },

    '&:hover': {
      color: '#00e7f9',
      cursor: 'pointer',
    },

    input: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
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

export const WorkoutRoutineContainer = styled('div', {
  display: 'flex',
  direction: 'column',
  fontSize: '0.8rem',
  paddingLeft: '0.5rem',
  width: '100%',
  height: '100%',
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
    width: '100%',
  },
})

export const TrainerSheetContainer = styled('div', {
  display: 'flex',
  direction: 'column',
  paddingLeft: '0.5rem',
  paddingTop: '1rem',
  paddingRight: '1rem',
  paddingBottom: '1rem',
  gap: '1rem',
  alignItems: 'center',
  borderRadius: '6px',
  width: '100%',
  // border: '1px solid red',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    // Width: '23rem',
    // border: '1px solid red',
  },

  '&:hover': {
    // backgroundColor: '$gray500',
    cursor: 'pointer',
  },
})
export const NameContainer = styled('div', {
  display: 'flex',
  gap: '0.2rem',
  flexDirection: 'column',
  width: '100%',
  // border: '1px solid red',
})

export const TextRoutineName = styled('div', {
  fontSize: '1.2rem',
  color: '#00e7f9',
  // border: '1px solid red',
})
export const TextRoutineObjective = styled('div', {
  fontSize: '1rem',
  color: '$gray300',
  // border: '1px solid red',
})
export const TextRoutineobservation = styled('div', {
  fontSize: '1rem',
  color: '$gray400',
  // border: '1px solid red',
})

export const FormError = styled('div', {
  [`${Text}`]: {
    color: '#ff3111',
  },
  span: {
    color: '#FF4136',
  },
})
