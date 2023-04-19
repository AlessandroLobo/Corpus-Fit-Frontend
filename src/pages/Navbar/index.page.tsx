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

import HamburguerButton from '@/common/HamburguerButton'
import { useState } from 'react'
import Link from 'next/link'
import logo from '../../../public/images/LOGO CORPUSFIT-2.png'

export const HeaderComponent = () => {
  const [navToggle, setNavToggle] = useState(true)

  const navStyle = {
    overflow: 'hidden',
    maxHeight: navToggle ? '5.25rem' : '19.8rem',
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
        <LinkContainer>
          <Link href="/">Home</Link>
          <Link href="/">Area do Aluno</Link>
          <Link href="/">Treinos</Link>
          <Link href="/">Administração</Link>
        </LinkContainer>
        <HeaderInfo>
          <NameAndEmail>
            alessandrolobo@hotmail.com
            <SignOutButton onClick={toggleNav}>
              <Link href={'/Login'}>SignIn</Link>
            </SignOutButton>
          </NameAndEmail>
          <ProfilePhoto></ProfilePhoto>
        </HeaderInfo>
      </Container>
    </Nav>
  )
}
