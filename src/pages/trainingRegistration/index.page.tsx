import { PersonArmsSpread } from '@phosphor-icons/react'
import {
  Form,
  ButtonCad,
  ButtonContainer,
  ButtonCadContainer,
  Line,
  Container,
  Text,
} from './styles'
import { validateToken } from '../api/authService'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { ModalInfo } from '../components/Modal/modalInfo'
import { WorkoutRoutineRegistration } from '../components/WorkoutLibraryComponents/WorkoutRoutineRegistration'
import { useState } from 'react'

export default function TrainingRegistration() {
  const [modalOpen, setModalOpen] = useState(false)

  function handleWorkoutRoutineRegistration() {
    setModalOpen(true)
    // console.log('handleRegisterStudent')
  }

  return (
    <Container>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        {modalOpen ? <WorkoutRoutineRegistration /> : null}
      </ModalInfo>

      <ButtonCadContainer>
        <Text style={{ color: '#00e7f9' }}>Biblioteca de Treino</Text>
        <ButtonContainer>
          <ButtonCad onClick={handleWorkoutRoutineRegistration}>
            <PersonArmsSpread size={50} />
            Adicionar Rotina
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
