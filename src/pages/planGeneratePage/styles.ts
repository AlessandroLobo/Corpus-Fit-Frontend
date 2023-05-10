import { styled, Box } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 872,
  margin: '$12 auto $4',
  padding: '0 $4',
  zIndex: 1000,
  // border: '1px solid red',

  '@media (max-width: 768px)': {
    maxWidth: '20rem',
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
    border: 'solid 1px red',
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

  '&:hover': {
    backgroundColor: '$gray600',
    color: '#00e7f9',
  },

  '&:active': {
    transform: 'scale(0.98)',
    color: '#00e7f9',
  },

  '@media screen and (max-width: 768px)': {
    fontSize: '0rem',
    maxWidth: '6rem',
  },
})

export const SetTabsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

export const SetTabsEdit = styled('div', {
  display: 'flex',
  marginRight: 'auto',
  paddingLeft: '5rem',
  justifyContent: 'left',
  alignItems: 'center',
  borderRadius: '8px',
  width: '16rem',
  height: '3rem',
  color: '$gray200',
  backgroundColor: '$gray800',
  boxSizing: 'border-box',
})

export const SetTabsPlans = styled('div', {
  display: 'flex',
  marginLeft: 'auto',
  paddingRight: '5rem',
  justifyContent: 'right',
  alignItems: 'center',
  borderRadius: '8px',
  width: '16rem',
  height: '3rem',
  color: '$gray200',
  backgroundColor: '$gray800',
  boxSizing: 'border-box',
})
