import { useState } from 'react'

export const useWorkoutTypes = () => {
  const [useWorkoutTypes] = useState([
    { id: 0, value: 'Week', label: 'Dia da Semana - Ex: Segunda, Terça...' },
    { id: 1, value: 'Number', label: 'Numérico - Ex: Treino 1, Treino 2...' },
  ])
  return useWorkoutTypes
}
