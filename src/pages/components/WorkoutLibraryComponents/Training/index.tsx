import { GetRoutine } from '@/pages/api/createWorkout'
import { ClipboardText } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import {
  ButtonInfo,
  ClipboardTButtonInfoContainer,
  ContainerList,
  Table,
  TbodyResult,
  TrainingSheetContainer,
  WorkoutTrainingSheetContainer,
} from './styles'
import { ModalInfo } from '../../Modal/modalInfo'
import TrainingSheet from '../TtrainingSheet'
import {
  GetAllTrainingSheet,
  ICreateTrainingSheet,
} from '@/pages/api/createTraining'

interface TrainingProps {
  id: string
  selectedComponent: {
    id: string
    component: string
  }
}

interface IRoutineData {
  name: string
  objective: string
  workoutType: string
}

export default function Training(props: TrainingProps) {
  const { selectedComponent } = props

  const [routineData, setRoutineData] = useState<IRoutineData>()

  const [trainingSheet, settrainingSheet] = useState<ICreateTrainingSheet[]>([])

  const [modalOpen, setModalOpen] = useState(false)

  const [stateListTrainingSheet, setStateListTrainingSheet] = useState(false)

  useEffect(() => {
    listTrainingSheet()
  }, [])

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listTrainingSheet = async () => {
    const data = await GetAllTrainingSheet()
    if (data.trainingSheets.length > 0) {
      setStateListTrainingSheet(true)
      settrainingSheet(data.trainingSheets)
      console.log('data', data.trainingSheets)
    }
    // console.log('data', data.trainingSheets)
  }
  const handleEdit = (id: string) => {
    console.log(id)
  }

  const handleSearch = async () => {
    if (!selectedComponent) return
    try {
      const response = await GetRoutine(selectedComponent.id)
      setRoutineData(response.workoutRoutine)
      console.log('RoutineData', response.workoutRoutine.id)
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
      <div>
        <ButtonInfo onClick={handleClick}>Treino</ButtonInfo>
      </div>
      {stateListTrainingSheet ? (
        <ContainerList>
          <Table>
            <TbodyResult>
              {trainingSheet &&
                trainingSheet.map((trainingSheet) => (
                  <tr key={trainingSheet.id}>
                    <td onClick={() => handleEdit(trainingSheet.id)}>
                      <TrainingSheetContainer>
                        {trainingSheet.workoutType}
                      </TrainingSheetContainer>
                      <TrainingSheetContainer>
                        {trainingSheet.name}
                      </TrainingSheetContainer>
                    </td>
                  </tr>
                ))}
            </TbodyResult>
          </Table>
        </ContainerList>
      ) : (
        <ClipboardTButtonInfoContainer>
          <ClipboardText size={150} />
          <h3>
            A sua rotina é como uma ficha, adicione vários treinos dentro dessa
            rotina
          </h3>
          <ButtonInfo onClick={handleClick}>Criar Primeiro Treino</ButtonInfo>
        </ClipboardTButtonInfoContainer>
      )}
    </>
  )
}
