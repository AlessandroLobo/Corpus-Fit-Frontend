import Image from 'next/image'
import { styled } from '@ignite-ui/react'

export const Container = styled('main', {
  display: 'flex',
  maxWidth: '872px',
  margin: '15rem auto 4px',
  padding: '0px 4px',
  alignItems: 'center',
  textAlign: 'center',

  '@media (max-width: 767px)': {
    display: 'flex',
    margin: '5rem auto 4px',
    textAlign: 'center',
  },
})

export const BackgroundImage = styled(Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
  filter: 'blur(10px) brightness(0.14) grayscale(100%)',
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
