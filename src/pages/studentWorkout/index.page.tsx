import { useEffect, useState } from 'react'
import {
  Container,
  Form,
  NameContainer,
  Table,
  TbodyResult,
  TextHeader,
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
}

export default function StudentWorkout({ email, id }: Props) {
  const [studentParansId, setStudentParansId] = useState<string>('')

  const [seletctStudantRoutine, setSeletctStudantRoutine] = useState<
    ICreateStudentRoutine[]
  >([])

  useEffect(() => {
    setStudentParansId(id)
    searchStudentRoutineSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentParansId])

  const searchStudentRoutineSelection = async () => {
    const data = await getAllStudentRoutines(studentParansId)

    setSeletctStudantRoutine(data.studentRoutines)
    console.log(seletctStudantRoutine)
  }

  return (
    <Container>
      <Form>
        <TextHeader>Area de treino do aluno</TextHeader>
      </Form>
      <Form>
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
                        {seletctStudantRoutine.name}
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
