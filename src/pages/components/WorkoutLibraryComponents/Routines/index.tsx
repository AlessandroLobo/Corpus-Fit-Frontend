import Image from 'next/image'
import {
  ContainerList,
  Table,
  TbodyResult,
  Text,
  TextInput,
  TextInputContainer,
  TextInputFindContainer,
  WorkoutRoutineContainer,
} from './styles'

import WorkoutIco from '../../../../../public/images/Workout.png'
import React, { useEffect, useState } from 'react'
import { GetAllRoutine } from '@/pages/api/createWorkout'

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'Training'
}

interface IWorkoutRoutine {
  id: string
  name: string
  objective: string
}

export default function Routines(props: {
  workoutRoutineId: IWorkoutRoutine
  selectedComponent: ISelectedComponent
  handleSelectedComponent: (selectedComponent: ISelectedComponent) => void
}) {
  const [workoutRoutine, setWorkoutRoutine] = useState<IWorkoutRoutine[]>([])

  const [workoutRoutineId, setWorkoutRoutineId] = useState<IWorkoutRoutine>({})

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
    // props.setWorkoutRoutineId(workoutRoutine.id)
    setWorkoutRoutineId(id)
    console.log('selectedComponent Enviado de routine', selectedComponent)
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
      </TextInputContainer>

      <Table>
        <TbodyResult>
          {workoutRoutine &&
            workoutRoutine.map((workoutRoutine) => (
              <tr key={workoutRoutine.id}>
                <td onClick={() => handleEdit(workoutRoutine.id)}>
                  <WorkoutRoutineContainer>
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
                  </WorkoutRoutineContainer>
                </td>
              </tr>
            ))}
        </TbodyResult>
      </Table>
    </ContainerList>
  )
}
