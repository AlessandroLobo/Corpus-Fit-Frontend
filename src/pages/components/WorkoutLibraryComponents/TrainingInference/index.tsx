import { FindStudent } from '@/pages/api/getAllStudents/index.api'
import Image from 'next/image'
import {
  Container,
  Form,
  Line,
  Table,
  TbodyResult,
  Text,
  TextInput,
  TextInputContainer,
  TextInputFindContainer,
  TrainerSheetContainer,
  TrashContainer,
  WorkoutRoutineContainer,
} from './styles'
import { useEffect, useState } from 'react'
import WorkoutIco from '../../../../../public/images/Workout.png'
import { GetAllRoutine } from '@/pages/api/createWorkout'
import {
  DeleteStudentRoutine,
  createStudentRoutine,
  getAllStudentRoutines,
} from '@/pages/api/createStudentRoutine'
import { Trash } from '@phosphor-icons/react'

interface StudentEditProps {
  studentParansId: string
}

interface IWorkoutRoutine {
  id: string
  name: string
  workoutType?: string
  objective: string
  observation: string
  studentId: string | null
  startDate: Date | null
  endDate: Date | null
}

interface ICreateStudentRoutine {
  id: string
  name: string
  studentId: string
  routineId: string
}

interface IStudentRoutine {
  name: string
  studentId: string
  routineId: string
}

export const TrainingInference = ({ studentParansId }: StudentEditProps) => {
  const [workoutRoutine, setWorkoutRoutine] = useState<
    IWorkoutRoutine[] | undefined
  >([])

  const [student, setStudent] = useState<IStudentRoutine | null>(null)

  const [seletctStudantRoutine, setSeletctStudantRoutine] = useState<
    ICreateStudentRoutine[]
  >([])

  const [err, setError] = useState('')

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async () => {
    const searchTerm =
      (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    const data = await GetAllRoutine(searchTerm)
    const workoutRoutines = data.workoutRoutines
    setWorkoutRoutine(workoutRoutines)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await FindStudent({
          studentParansId,
        })

        setStudent(studentData)
      } catch (error) {
        setError(err)
      }
    }
    fetchData()
  }, [studentParansId, err])

  useEffect(() => {
    searchStudentRoutineSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchStudentRoutineSelection = async () => {
    const data = await getAllStudentRoutines(studentParansId)

    setSeletctStudantRoutine(data.studentRoutines)
  }

  async function handleRegister(id: string, name: string) {
    try {
      const params: IStudentRoutine = {
        name,
        studentId: studentParansId,
        routineId: id,
      }
      await createStudentRoutine(params)
      searchStudentRoutineSelection()
    } catch (err: any) {
      // handle errors...
    }
  }

  async function handleDelete(id: string) {
    try {
      await DeleteStudentRoutine(id)
      searchStudentRoutineSelection()
    } catch (err: any) {
      // handle errors...
    }
  }

  return (
    <Container>
      <Form>
        <TextInputContainer>
          <Text>ALUNO</Text>
          <Text>{student?.name}</Text>
          <Text>Treinons inferidos ao aluno:</Text>
          <Line />
        </TextInputContainer>
        <Table>
          <TbodyResult>
            {workoutRoutine &&
              seletctStudantRoutine.map((seletctStudantRoutine) => (
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
                        <div>
                          {seletctStudantRoutine.name}
                          <br />
                        </div>
                      </TrainerSheetContainer>
                      <TrashContainer
                        onClick={() => handleDelete(seletctStudantRoutine.id)}
                      >
                        <Trash size={28} />
                      </TrashContainer>
                    </WorkoutRoutineContainer>
                  </td>
                </tr>
              ))}
          </TbodyResult>
        </Table>
        <TextInputContainer>
          <Line />
          <Text>Pesquise por Nome:</Text>
          <TextInputFindContainer>
            <TextInput
              onChange={handleSearch}
              id="search-input"
              placeholder="Digite o nome da rotina"
            />
          </TextInputFindContainer>

          <Table>
            <TbodyResult>
              {workoutRoutine &&
                workoutRoutine.map((workoutRoutine) => (
                  <tr key={workoutRoutine.id}>
                    <td>
                      <WorkoutRoutineContainer>
                        <TrainerSheetContainer
                          onClick={() =>
                            handleRegister(
                              workoutRoutine.id,
                              workoutRoutine.name,
                            )
                          }
                        >
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
                          <div>
                            {workoutRoutine.name}
                            <br />
                            {workoutRoutine.objective}
                          </div>
                        </TrainerSheetContainer>
                        {/* <TrashContainer
                    onClick={() => handleDelete(workoutRoutine.id)}
                    >
                      <Trash size={28} />
                    </TrashContainer> */}
                      </WorkoutRoutineContainer>
                    </td>
                  </tr>
                ))}
            </TbodyResult>
          </Table>
          <Line />
        </TextInputContainer>
      </Form>
    </Container>
  )
}
