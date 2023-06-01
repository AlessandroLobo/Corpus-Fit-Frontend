import { useState } from 'react'

export const useObjectives = () => {
  const [useObjectives] = useState([
    { id: 0, value: 'Hipertrofia', label: 'Hipertrofia' },
    { id: 1, value: 'Redução de Gordura', label: 'Redução de Gordura' },
    {
      id: 2,
      value: 'Redução de Gordura/Hipertrofia',
      label: 'Redução de Gordura/Hipertrofia',
    },
    { id: 3, value: 'Definição Muscular', label: 'Definição Muscular' },
    { id: 4, value: 'Condicionamento Físico', label: 'Condicionamento Físico' },
    { id: 5, value: 'Qualidade de Vida', label: 'Qualidade de Vida' },
  ])
  return useObjectives
}
