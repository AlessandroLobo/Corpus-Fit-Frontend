import { GetRoutine } from '@/pages/api/createWorkout'
import { ClipboardText } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { ButtonInfo, ClipboardTButtonInfoContainer } from './styles'
import { ModalInfo } from '../../Modal/modalInfo'
import TrainingSheet from '../TtrainingSheet'

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

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async () => {
    if (!selectedComponent) return
    try {
      const response = await GetRoutine(selectedComponent.id)
      setRoutineData(response.workoutRoutine)
      // console.log('RoutineData', response.workoutRoutine)
    } catch (error) {
      console.log(error)
    }
  }
  function handleClick() {
    setModalOpen(true)
  }
  return (
    <>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        {routineData ? <TrainingSheet routineData={routineData} /> : null}
      </ModalInfo>
      <div>Treinos</div>
      <div>{routineData?.name}</div>
      <div>{routineData?.objective}</div>
      <ClipboardTButtonInfoContainer>
        <ClipboardText size={150} />
        <h3>
          A sua rotina é como uma ficha, adicione vários treinos dentro dessa
          rotina
        </h3>
        <ButtonInfo onClick={handleClick}>Criar Primeiro Treino</ButtonInfo>
      </ClipboardTButtonInfoContainer>
    </>
  )
}
