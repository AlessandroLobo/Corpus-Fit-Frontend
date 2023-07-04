import React, { useEffect, useState } from 'react'
import {
  ContainerList,
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
import { getAllStudentRoutines } from '@/pages/api/createStudentRoutine'
import Image from 'next/image'

import WorkoutIco from '../../../../../public/images/Workout.png'
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
  component: 'Routines' | 'TrainingSelectionScreen' | 'ExerciseSheet'
  workoutRoutineId: string
}

export default function RoutineSelectionScreen(props: {
  email: string
  id: string
  selectedComponent: ISelectedComponent | undefined
  handleSelectedComponent: (selectedComponent: ISelectedComponent) => void
  // Adicione aqui os tipos de dados para outros dados que você está enviando
}) {
  const [seletctStudantRoutine, setSeletctStudantRoutine] = useState<
    ICreateStudentRoutine[]
  >([])

  const [selectedComponent, setSelectedComponent] =
    useState<ISelectedComponent>(null as any)

  const searchStudentRoutineSelection = async () => {
    const data = await getAllStudentRoutines(props.id)

    setSeletctStudantRoutine(data.studentRoutines)
    console.log(seletctStudantRoutine)
  }

  useEffect(() => {
    searchStudentRoutineSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id])

  function handleEdit(id: string) {
    const selectedComponent: ISelectedComponent = {
      workoutRoutineId: id,
      id,
      component: 'TrainingSelectionScreen',
    }
    props.handleSelectedComponent(selectedComponent)
  }

  function handleSelectedComponent(selectedComponent: ISelectedComponent) {
    setSelectedComponent(selectedComponent)
    setReturnComponent(selectedComponent.workoutRoutineId)
  }

  return (
    <ContainerList>
      <TextHeader> uma rotina para começar </TextHeader>
      <Table>
        <TbodyResult>
          {seletctStudantRoutine?.map((seletctStudantRoutine) => (
            <tr key={seletctStudantRoutine.id}>
              <td>
                <WorkoutRoutineContainer>
                  <TrainerSheetContainer
                    onClick={() => handleEdit(seletctStudantRoutine.id)}
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
    </ContainerList>
  )
}
