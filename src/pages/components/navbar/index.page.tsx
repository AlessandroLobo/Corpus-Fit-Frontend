import Image from 'next/image'
import {
  Container,
  HeaderInfo,
  HeaderTitle,
  LinkContainer,
  NameAndEmail,
  Nav,
  ProfilePhoto,
  SignButton,
  SignOutButton,
} from './styles'

import HamburguerButton from '@/common/HamburguerButton'
import { useContext, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/context/AuthContext'
import nookies from 'nookies'

import logo from '../../../../public/images/LOGO CORPUSFIT-2.png'

export default function Header() {
  const { user } = useContext(AuthContext)

  const [navToggle, setNavToggle] = useState(true)

  const navStyle = {
    overflow: 'hidden',
    maxHeight: navToggle ? '5.25rem' : '19.8rem',
    transition: 'max-height 0.5s ease-out',
  }

  function logout() {
    console.log('função logout')
    nookies.destroy(null, 'CorpusFitToken', { path: '/' })
    window.location.reload()
  }

  function toggleNav() {
    setNavToggle(!navToggle)
  }

  return (
    <Nav style={navStyle}>
      <HeaderTitle>
        <Image src={logo} alt="logo" width={100} />
        <div onClick={toggleNav} className="hamburguer-container">
          <HamburguerButton />
        </div>
      </HeaderTitle>
      <Container>
        <LinkContainer>
          <Link href="/">Home</Link>
          <Link href="/userDashboard">Area do Aluno</Link>
          <Link href="/studentWorkout">Treinos</Link>
          {user?.email === 'admin@hotmail.com' ? (
            <>
              <Link href="/trainingRegistration">Biblioteca de Treinos</Link>
              <Link href="/administration">Administração</Link>
            </>
          ) : null}
        </LinkContainer>
        <HeaderInfo>
          <NameAndEmail>
            {user ? (
              <>
                <p>{user.email}</p>
                <SignOutButton onClick={logout}>
                  <SignOutButton>Logout</SignOutButton>
                </SignOutButton>
              </>
            ) : (
              <SignButton>
                <Link href={'/login'}>Login</Link>
              </SignButton>
            )}
          </NameAndEmail>
          <ProfilePhoto></ProfilePhoto>
        </HeaderInfo>
      </Container>
    </Nav>
  )
}
