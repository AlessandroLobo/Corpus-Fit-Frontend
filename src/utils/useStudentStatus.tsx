import { useState } from 'react'

export const useStudentStatus = () => {
  const [studentStatus] = useState([
    { id: 0, value: 'Ativo', label: 'Ativo' },
    { id: 1, value: 'Desativado', label: 'Desativado' },
  ])
  return studentStatus
}
