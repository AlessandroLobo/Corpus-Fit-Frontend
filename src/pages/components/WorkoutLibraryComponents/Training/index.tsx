import { GetRoutine } from '@/pages/api/createWorkout'
import React, { useEffect, useState } from 'react'

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
      <div>id {routineData?.name}</div>
      <div>{routineData?.objective}</div>
    </>
  )
}
