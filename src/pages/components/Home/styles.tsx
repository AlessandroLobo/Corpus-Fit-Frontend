import { styled } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: '920px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingTop: '8rem',
  alignItems: 'left',
  textAlign: 'center',
  overflowY: 'auto',
  minHeight: 'calc(100vh - 200px - 124px)',

  // border: '1px solid red',

  '@media (max-width: 767px)': {
    padding: 0,
    margin: 0,
    paddingBottom: '2rem',
    textAlign: 'center',
    minHeight: 'calc(100vh - 200px - 120px)', // Sempre deixara o footer no final da pagina

    // border: '1px solid red',
  },
})

export const ImageStartYorFitness = styled('img', {
  width: '50%',
  objectFit: 'cover',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '@media (max-width: 767px)': {
    width: '80%',
    marginLeft: '1rem',
    alignItems: 'center',
    margin: 'auto',
  },
})

export const Description = styled('div', {
  display: 'block',
  width: '60%',
  textAlign: 'left',
  paddingBottom: '2.5rem',
  borderRadius: '0.5rem',
  // border: '1px solid red',

  '& p': {
    fontWeight: 'bold',
    lineHeight: '1.5',
    color: '#FFF',
    margin: '0.5rem 0',
  },

  '& span': {
    color: '#00e7f9',
  },

  '& hr': {
    border: 'none',
    borderBottom: '1px solid #00e7f9',
    margin: '1rem 0',
  },

  '@media (max-width: 767px)': {
    width: '80%',
    marginLeft: '1rem',
    alignItems: 'center',
    margin: 'auto',
  },
})

export const TextExplanation = styled('div', {
  display: 'flex',
  width: '100%',
  textAlign: 'left',

  // border: '1px solid red',

  '& p': {
    color: '#FFF',
  },

  '& span': {
    color: '#00e7f9',
    fontWeight: 'bold',
  },

  '@media (max-width: 767px)': {
    display: 'flex',
    marginLeft: '1rem',
    margin: 'auto',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // border: '1px solid red',
  },
})

export const Explanation = styled('div', {
  display: 'flex',
  gap: '0.35rem',
  padding: '0.2rem',
})

export const IconWrapper = styled('div', {
  display: 'flex',
})
