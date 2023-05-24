import { Barbell, Person } from '@phosphor-icons/react'
import {
  Container,
  Form,
  ButtonCad,
  ButtonContainer,
  ButtonCadContainer,
  Line,
} from './styles'
import { validateToken } from '../api/authService'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

export default function TrainingRegistration() {
  return (
    <Container>
      <ButtonCadContainer>
        <ButtonContainer>
          <ButtonCad>
            <Person size={50} />
            Grupos Musculares
          </ButtonCad>
          <ButtonCad>
            <Barbell size={50} />
            Cadastro de Exercícios
          </ButtonCad>
        </ButtonContainer>
        <Line />
        <ButtonContainer></ButtonContainer>
      </ButtonCadContainer>
      <Form></Form>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const token = cookies.CorpusFitToken

  const user = validateToken(token!)

  // console.log(user)

  if (!user || user.user !== 'admin@hotmail.com') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      someData: 'Some value',
    },
  }
}
