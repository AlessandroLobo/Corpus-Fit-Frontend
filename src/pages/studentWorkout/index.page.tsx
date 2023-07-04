import { useEffect, useState } from 'react'
import {
  Container,
  Form,
  FormHeader,
  NameContainer,
  Table,
  TbodyResult,
  TextHeader,
  TextRoutineName,
  TextRoutineObjective,
  TextRoutineobservation,
  TrainerSheetContainer,
  WorkoutRoutineContainer,
} from './styles'
import { parseCookies } from 'nookies'
import { validateToken } from '../api/authService'
import { GetServerSidePropsContext } from 'next'
import { getAllStudentRoutines } from '../api/createStudentRoutine'
import WorkoutIco from '../../../public/images/Workout.png'
import Image from 'next/image'

interface Props {
  email: string
  id: string
}

export interface IStudent {
  id: string
  name: string
  email: string
  phone: string
  status: boolean
  expirationDate: string
}

interface ICreateStudentRoutine {
  id: string
  name: string
  studentId: string
  routineId: string
  routine: {
    createdAt: string
    id: string
    name: string
    objective: string
    observation: string
    startDate: string
    endDate: string
    studentId: string | null
    workoutType: string
    // Outras propriedades do objeto "routine"
  }
}

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'Training' | 'ExerciseSheet'
  workoutRoutineId: string
}

export default function StudentWorkout({ email, id }: Props) {
  const [seletctStudantRoutine, setSeletctStudantRoutine] = useState<
    ICreateStudentRoutine[]
  >([])

  const [selectedComponent, setSelectedComponent] =
    useState<ISelectedComponent>(null as any)

  const searchStudentRoutineSelection = async () => {
    const data = await getAllStudentRoutines(id)

    setSeletctStudantRoutine(data.studentRoutines)
    console.log(seletctStudantRoutine)
  }

  useEffect(() => {
    searchStudentRoutineSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function handleSelectedComponent(selectedComponent: ISelectedComponent) {
    setSelectedComponent(selectedComponent)
    // setReturnComponent(selectedComponent.workoutRoutineId)
  }

  return (
    <Container>
      <FormHeader>
        <TextHeader>Area de treino do aluno</TextHeader>
      </FormHeader>

      <Form>
        <TextHeader>Escolha uma rotina para começar</TextHeader>
        <Table>
          <TbodyResult>
            {seletctStudantRoutine?.map((seletctStudantRoutine) => (
              <tr key={seletctStudantRoutine.id}>
                <td>
                  <WorkoutRoutineContainer>
                    <TrainerSheetContainer>
                      <Image
                        src={WorkoutIco}
                        alt="logo"
                        width={50}
                        style={{
                          filter: 'invert(1) contrast(0.8)',
                          transition: 'transform 0.3s ease',
                          cursor: 'pointer',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      />
                      <NameContainer>
                        <TextRoutineName>
                          {seletctStudantRoutine.routine.name}
                        </TextRoutineName>
                        <TextRoutineObjective>
                          {seletctStudantRoutine.routine.objective}
                        </TextRoutineObjective>
                        <TextRoutineobservation>
                          {seletctStudantRoutine.routine.observation}
                        </TextRoutineobservation>
                      </NameContainer>
                    </TrainerSheetContainer>
                  </WorkoutRoutineContainer>
                </td>
              </tr>
            ))}
          </TbodyResult>
        </Table>
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
