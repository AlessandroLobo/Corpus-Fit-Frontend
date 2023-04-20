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
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { validateToken } from '../api/authService'

interface Props {
  email: string
}

export const HeaderComponent = ({ email }: Props) => {
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
          <Link href="/userDashboard">Area do Aluno</Link>
          <Link href="/">Treinos</Link>
          <Link href="/">Administração</Link>
        </LinkContainer>
        <HeaderInfo>
          <NameAndEmail>
            <p>Olá, {email}!</p>
            <SignOutButton onClick={toggleNav}>
              <Link href={'/login'}>SignIn</Link>
            </SignOutButton>
          </NameAndEmail>
          <ProfilePhoto></ProfilePhoto>
        </HeaderInfo>
      </Container>
    </Nav>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const token = cookies.token

  const user = validateToken(token!)

  if (!user) {
    return {
      redirect: {
        permanent: false,
      },
    }
  }

  const email = user.user

  return {
    props: { email },
  }
}
