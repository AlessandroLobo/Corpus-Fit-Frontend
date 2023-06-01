import { useState } from 'react'

export const useDifficultys = () => {
  const [useDifficultys] = useState([
    { id: 0, value: 'Adaptação', label: 'Adaptação' },
    { id: 1, value: 'Iniciante', label: 'Iniciante' },
    { id: 2, value: 'intermediário', label: 'Intermediário' },
    { id: 3, value: 'Avançado', label: 'Avançado' },
  ])
  return useDifficultys
}
