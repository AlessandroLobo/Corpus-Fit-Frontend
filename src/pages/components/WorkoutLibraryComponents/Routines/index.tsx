import Image from 'next/image'
import {
  Button,
  ContainerList,
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

import WorkoutIco from '../../../../../public/images/Workout.png'
import React, { useEffect, useState } from 'react'
import { DeleteRoutine, GetAllRoutine } from '@/pages/api/createWorkout'
import { ArrowClockwise, Trash } from '@phosphor-icons/react'

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'Training' | 'ExerciseSheet'
  workoutRoutineId: string
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

export default function Routines(props: {
  workoutRoutineId: string
  selectedComponent: ISelectedComponent | undefined
  handleSelectedComponent: (selectedComponent: ISelectedComponent) => void
}) {
  const [workoutRoutine, setWorkoutRoutine] = useState<
    IWorkoutRoutine[] | undefined
  >([])

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

  function handleEdit(id: string) {
    const selectedComponent: ISelectedComponent = {
      workoutRoutineId: id,
      id,
      component: 'Training',
    }
    props.handleSelectedComponent(selectedComponent)
  }

  async function handleDelete(id: string) {
    console.log('handleDelete', id)
    try {
      await DeleteRoutine(id)
      handleSearch()
    } catch (err: any) {
      // handle errors...
    }
  }

  return (
    <ContainerList>
      <TextInputContainer>
        <Text>Pesquise por Nome:</Text>
        <TextInputFindContainer>
          <TextInput
            onChange={handleSearch}
            id="search-input"
            placeholder="Digite o nome ou e-mail"
          />
        </TextInputFindContainer>
        <div>
          {' '}
          <Button
            onClick={handleSearch}
            style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
          >
            Atualizar dados
            <ArrowClockwise size={18} />
          </Button>
        </div>
      </TextInputContainer>

      <Table>
        <TbodyResult>
          {workoutRoutine &&
            workoutRoutine.map((workoutRoutine) => (
              <tr key={workoutRoutine.id}>
                <td>
                  <WorkoutRoutineContainer>
                    <TrainerSheetContainer
                      onClick={() => handleEdit(workoutRoutine.id)}
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
                    <TrashContainer
                      onClick={() => handleDelete(workoutRoutine.id)}
                    >
                      <Trash size={28} />
                    </TrashContainer>
                  </WorkoutRoutineContainer>
                </td>
              </tr>
            ))}
        </TbodyResult>
      </Table>
    </ContainerList>
  )
}
