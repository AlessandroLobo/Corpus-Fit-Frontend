import Image from 'next/image'
import { TextContainer, WorkoutRoutineContainer } from './styles'

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
  selectedComponent: ISelectedComponent
  handleSelectedComponent: (selectedComponent: ISelectedComponent) => void
}) {
  const [workoutRoutine, setWorkoutRoutine] = useState<IWorkoutRoutine[]>([])

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async () => {
    const data = await GetAllRoutine('')
    const workoutRoutines = data.workoutRoutines
    setWorkoutRoutine(workoutRoutines)
  }

  function handleEdit(id: string) {
    const selectedComponent: ISelectedComponent = { id, component: 'Training' }
    props.handleSelectedComponent(selectedComponent)
  }

  return (
    <>
      <TextContainer>Rotinas de Treino</TextContainer>

      {workoutRoutine &&
        workoutRoutine.map((workoutRoutine) => (
          <tr key={workoutRoutine.id}>
            <td
              onClick={() => handleEdit(workoutRoutine.id)}
              style={{
                width: '60%',
                paddingLeft: '1rem',
                textAlign: 'left',
                textTransform: 'uppercase',
              }}
            >
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
    </>
  )
}
