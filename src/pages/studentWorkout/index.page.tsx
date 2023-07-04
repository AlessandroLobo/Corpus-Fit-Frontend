import { GetServerSidePropsContext } from 'next'
// import RoutineSelectionScreen from '../components/StudentWorkoutComponents/TrainingSelectionScreen'
import {
  ButtonCadContainer,
  Container,
  Form,
  FormHeader,
  TextBack,
  TextContainerBack,
  TextHeader,
} from './styles'
import { parseCookies } from 'nookies'
import { validateToken } from '../api/authService'
import RoutineSelectionScreen from '../components/StudentWorkoutComponents/RoutineSelectionScreen'
import { useState } from 'react'
import TrainingSelectionScreen from '../components/StudentWorkoutComponents/TrainingSelectionScreen'
import { CaretLeft } from '@phosphor-icons/react'

interface Props {
  email: string
  id: string
}

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'TrainingSelectionScreen' | 'ExerciseSheet'
  workoutRoutineId: string
}

export default function StudentWorkout({ email, id }: Props) {
  const [selectedComponent, setSelectedComponent] =
    useState<ISelectedComponent>(null as any)

  const [returnComponent, setReturnComponent] = useState<string | null>(null)

  function handleSelectedComponent(selectedComponent: ISelectedComponent) {
    setSelectedComponent(selectedComponent)
    console.log(selectedComponent)
  }
  return (
    <Container>
      <ButtonCadContainer>
        <TextContainerBack>
          {selectedComponent?.component === 'TrainingSelectionScreen' ? (
            <>
              <CaretLeft size={20} />
              <TextBack
                onClick={() =>
                  handleSelectedComponent({
                    workoutRoutineId: returnComponent ?? '',
                    id: returnComponent ?? '',
                    component: 'Training',
                  })
                }
              >
                Voltar
              </TextBack>
            </>
          ) : selectedComponent?.component === 'Training' ? (
            <>
              <CaretLeft size={20} />
              <TextBack
                onClick={() =>
                  handleSelectedComponent({
                    workoutRoutineId: returnComponent ?? '',
                    id: returnComponent ?? '',
                    component: 'Routines',
                  })
                }
              >
                Voltar
              </TextBack>
            </>
          ) : (
            <>
              <CaretLeft size={23} />
              <TextBack
                onClick={() =>
                  handleSelectedComponent({
                    workoutRoutineId: returnComponent ?? '',
                    id: returnComponent ?? '',
                    component: 'Routines',
                  })
                }
              >
                Voltar
              </TextBack>
            </>
          )}
        </TextContainerBack>
      </ButtonCadContainer>
      <FormHeader>
        <TextHeader>Area de treino do aluno</TextHeader>
      </FormHeader>

      <Form>
        {selectedComponent &&
          selectedComponent.component === 'TrainingSelectionScreen' ? (
          <TrainingSelectionScreen />
        ) : (
          <RoutineSelectionScreen
            email={email}
            id={id}
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

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const email = user.user
  const id = user.id

  return {
    props: { email, id },
  }
}
