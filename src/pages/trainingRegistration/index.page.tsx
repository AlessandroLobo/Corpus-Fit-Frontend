import { CaretLeft, PersonArmsSpread } from '@phosphor-icons/react'
import {
  Form,
  ButtonCad,
  ButtonContainer,
  ButtonCadContainer,
  Line,
  Container,
  Text,
  TextContainerBack,
  TextVoltar,
} from './styles'
import { validateToken } from '../api/authService'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { ModalInfo } from '../components/Modal/modalInfo'
import { WorkoutRoutineRegistration } from '../components/WorkoutLibraryComponents/WorkoutRoutineRegistration'
import React, { useState } from 'react'

import Routines from '../components/WorkoutLibraryComponents/Routines'
import Training from '../components/WorkoutLibraryComponents/Training'
import ExerciseSheet from '../components/WorkoutLibraryComponents/ExerciseSheet'

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'Training' | 'ExerciseSheet'
  workoutRoutineId: string
}

export default function TrainingRegistration() {
  const [modalOpen, setModalOpen] = useState(false)

  const [returnComponent, setReturnComponent] = useState<string | null>(null)

  const [selectedComponent, setSelectedComponent] =
    useState<ISelectedComponent>(null as any)

  function handleWorkoutRoutineRegistration() {
    setModalOpen(true)
  }

  function handleSelectedComponent(selectedComponent: ISelectedComponent) {
    setSelectedComponent(selectedComponent)
    setReturnComponent(selectedComponent.workoutRoutineId)
    // console.log('handleSelectedComponent', selectedComponent)
    // console.log('returnComponent', returnComponent)
  }

  return (
    <Container>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        {modalOpen ? <WorkoutRoutineRegistration /> : null}
      </ModalInfo>

      <ButtonCadContainer>
        <TextContainerBack>
          {selectedComponent?.component === 'ExerciseSheet' ? (
            <>
              <CaretLeft size={20} />
              <TextVoltar
                onClick={() =>
                  handleSelectedComponent({
                    workoutRoutineId: returnComponent ?? '',
                    id: returnComponent ?? '',
                    component: 'Training',
                  })
                }
              >
                Voltar
              </TextVoltar>
            </>
          ) : selectedComponent?.component === 'Training' ? (
            <>
              <CaretLeft size={20} />
              <TextVoltar
                onClick={() =>
                  handleSelectedComponent({
                    workoutRoutineId: returnComponent ?? '',
                    id: returnComponent ?? '',
                    component: 'Routines',
                  })
                }
              >
                Voltar
              </TextVoltar>
            </>
          ) : (
            <>
              <CaretLeft size={23} />
              <TextVoltar
                onClick={() =>
                  handleSelectedComponent({
                    workoutRoutineId: returnComponent ?? '',
                    id: returnComponent ?? '',
                    component: 'Routines',
                  })
                }
              >
                Voltar
              </TextVoltar>
            </>
          )}
        </TextContainerBack>
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
      <Form>
        {selectedComponent?.component === 'ExerciseSheet' ? (
          <ExerciseSheet
            selectedComponent={selectedComponent}
            handleSelectedComponent={handleSelectedComponent}
          />
        ) : selectedComponent?.component === 'Training' ? (
          <Training
            selectedComponent={selectedComponent}
            handleSelectedComponent={handleSelectedComponent}
          />
        ) : (
          <Routines
            workoutRoutineId={
              selectedComponent ? selectedComponent.workoutRoutineId : ''
            }
            selectedComponent={selectedComponent}
            handleSelectedComponent={handleSelectedComponent}
          />
        )}
      </Form>
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
