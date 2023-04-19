import { styled } from '@ignite-ui/react'
import Image from 'next/image'

export const BackgroundImage = styled(Image, {
  width: '100%',
  // height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
  filter: 'blur(5px) brightness(0.20) grayscale(100%)',

  marginBottom: '500px',
})
