import Image from 'next/image'
import {
  Container,
  HeaderInfo,
  HeaderTitle,
  LinkContainer,
  NameAndEmail,
  Nav,
  ProfilePhoto,
  SignOutButton,
} from './styles'

import logo from '../../../../public/images/LOGO CORPUSFIT-2.png'
import HamburguerButton from '@/common/HamburguerButton'
import { useState, CSSProperties } from 'react'

export const HeaderComponent = () => {
  const [navToggle, setNavToggle] = useState(true)

  const LinkContainerStyle: CSSProperties = {
    // transition: 'opacity 1s ease-out, max-height 1s ease-out',
  }

  const navStyle = {
    overflow: 'hidden',
    maxHeight: navToggle ? '5.25rem' : '20rem',
    transition: 'max-height 0.5s ease-out',
  }

  function toggleNav() {
    setNavToggle(!navToggle)
  }

  return (
    <Nav style={navStyle}>
      <HeaderTitle>
        <Image src={logo} alt="logo" width={100} />
        <div onClick={toggleNav}>
          <HamburguerButton />
        </div>
      </HeaderTitle>
      <Container>
        <LinkContainer style={LinkContainerStyle}>
          {' '}
          {/* Adiciona estilo inline para controlar a visibilidade do LinkContainer */}
          <a href="/">Home</a>
          <a href="/">Area do Aluno</a>
          <a href="/">Treinos</a>
          <a href="/">Administração</a>
        </LinkContainer>
        <HeaderInfo>
          <NameAndEmail style={LinkContainerStyle}>
            alessandrolobo@hotmail.com
            <SignOutButton>SignIn</SignOutButton>
          </NameAndEmail>
          <ProfilePhoto></ProfilePhoto>
        </HeaderInfo>
      </Container>
    </Nav>
  )
}
