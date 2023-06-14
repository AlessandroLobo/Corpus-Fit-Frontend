import { useState } from 'react'

export const useSelectWeekSheet = () => {
  const [selectWeekSheet] = useState([
    { id: 0, value: '', label: '' },
    { id: 1, value: 'Segunda', label: 'Segunda' },
    { id: 2, value: 'Terça', label: 'Terça' },
    { id: 3, value: 'Quarta', label: 'Quarta' },
    { id: 4, value: 'Quinta', label: 'Quinta' },
    { id: 5, value: 'Sexta', label: 'Sexta' },
    { id: 6, value: 'Sábado', label: 'Sábado' },
    { id: 7, value: 'Domingo', label: 'Domingo' },
  ])
  return selectWeekSheet
}
