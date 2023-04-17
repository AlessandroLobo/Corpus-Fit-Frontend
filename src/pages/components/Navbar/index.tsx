import Image from 'next/image'
import {
  Hamburguer,
  HamburguerContainer,
  HeaderInfo,
  HeaderTitle,
  LinkContainer,
  NameAndEmail,
  Nav,
  ProfilePhoto,
  SignOutButton,
} from './styles'

import logo from '../../../../public/images/LOGO CORPUSFIT-2.png'
import { useState } from 'react'

export const HeaderComponent = () => {
  const [isActive, setIsActive] = useState(false)

  function HamburgerClick() {
    setIsActive(!isActive)
  }

  // const handleClick = () => setClick(!click)

  return (
    <Nav>
      <HeaderTitle>
        <Image src={logo} alt="logo" width={100} />
      </HeaderTitle>

      <LinkContainer>
        <a href="/">Home</a>
        <a href="/">Area do Aluno</a>
        <a href="/">Treinos</a>
        <a href="/">Administração</a>
      </LinkContainer>
      <HeaderInfo>
        <NameAndEmail>
          alessandrolobo@hotmail.com
          <SignOutButton>SignIn</SignOutButton>
        </NameAndEmail>

        <ProfilePhoto></ProfilePhoto>
      </HeaderInfo>
      <HamburguerContainer>
        <Hamburguer
          className={
            isActive ? 'hamburguer hamburguer-active  ' : 'hamburguer line '
          }
          onClick={HamburgerClick}
        />
      </HamburguerContainer>
    </Nav>
  )
}
