import { GetRoutine } from '@/pages/api/createWorkout'
import { Button } from '@ignite-ui/react'
import { ClipboardText } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { ButtonInfo, ClipboardTButtonInfoContainer } from './styles'

interface TrainingProps {
  id: string
  selectedComponent: {
    id: string
    component: string
  }
}

interface IRoutineData {
  // Defina aqui o formato dos dados de retorno da API
  name: string
  objective: string
  workioutType: string
}

export default function Training(props: TrainingProps) {
  const { selectedComponent } = props
  const [routineData, setRoutineData] = useState<IRoutineData>()

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async () => {
    if (!selectedComponent) return
    try {
      const response = await GetRoutine(selectedComponent.id)
      setRoutineData(response.workoutRoutine)
      console.log(routineData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>Treinos</div>
      <div>{routineData?.name}</div>
      <div>{routineData?.objective}</div>
      <ClipboardTButtonInfoContainer>
        <ClipboardText size={150} />
        <h3>
          A sua rotina é como uma ficha, adicione vários treinos dentro dessa
          rotina
        </h3>
        <ButtonInfo>Criar Primeiro Treino</ButtonInfo>
      </ClipboardTButtonInfoContainer>
    </>
  )
}
