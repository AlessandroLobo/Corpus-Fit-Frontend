import { GetRoutine } from '@/pages/api/createWorkout'
import { ArrowClockwise, ClipboardText, Plus } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import {
  Button,
  ClipboardTButtonInfoContainer,
  ContainerList,
  Table,
  TbodyResult,
  TrainingSheetContainer,
} from './styles'
import { ModalInfo } from '../../Modal/modalInfo'
import TrainingSheet from '../TtrainingSheet'
import {
  GetAllTrainingSheet,
  ICreateTrainingSheet,
} from '@/pages/api/createTraining'

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'Training' | 'ExerciseSheet'
  workoutRoutineId: string
}

interface IRoutineData {
  id: string
  name: string
  objective: string
  workoutType: string
}
export default function Training(props: {
  selectedComponent: ISelectedComponent
  handleSelectedComponent: (selectedComponent: ISelectedComponent) => void
}) {
  const { selectedComponent } = props

  const [selectWorkoutRoutineId, setSelectWorkoutRoutineId] = useState<
    string | undefined
  >()

  const [routineData, setRoutineData] = useState<IRoutineData>()

  const [trainingSheet, settrainingSheet] = useState<ICreateTrainingSheet[]>([])

  const [modalOpen, setModalOpen] = useState(false)

  const [stateListTrainingSheet, setStateListTrainingSheet] = useState(false)

  useEffect(() => {
    listTrainingSheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleSearch()
    console.log('SelectComponentTraining', selectedComponent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async () => {
    if (!selectedComponent) return
    try {
      const response = await GetRoutine(selectedComponent.workoutRoutineId)
      setSelectWorkoutRoutineId(selectedComponent.workoutRoutineId)
      setRoutineData(response.workoutRoutine)
      console.log('Training', response.workoutRoutine.id)
    } catch (error) {
      console.log(error)
    }
  }

  const listTrainingSheet = async () => {
    const data = await GetAllTrainingSheet(selectedComponent.workoutRoutineId)
    if (data.trainingSheets.length > 0) {
      setStateListTrainingSheet(true)
      settrainingSheet(data.trainingSheets)
      // console.log('data', data.trainingSheets)
    }
  }

  function handleEdit(id: string) {
    const workoutRoutineId = selectWorkoutRoutineId || '' // Valor padrão em caso de undefined
    const selectedComponent: ISelectedComponent = {
      workoutRoutineId,
      id,
      component: 'ExerciseSheet',
    }
    props.handleSelectedComponent(selectedComponent)
  }

  function handleClick() {
    setModalOpen(true)
  }

  return (
    <div>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        {routineData ? <TrainingSheet routineData={routineData} /> : null}
      </ModalInfo>
      <div>Treinos</div>
      <div>{routineData?.name}</div>
      <div>{routineData?.objective}</div>
      {!stateListTrainingSheet ? (
        <div>
          {' '}
          <Button
            onClick={listTrainingSheet}
            style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
          >
            Atualizar dados
            <ArrowClockwise size={18} />
          </Button>
        </div>
      ) : null}

      {stateListTrainingSheet ? (
        <>
          <div>
            <Button
              onClick={handleClick}
              style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
            >
              Treino
              <Plus size={18} />
            </Button>
            <Button
              onClick={listTrainingSheet}
              style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
            >
              Atualizar dados
              <ArrowClockwise size={18} />
            </Button>
          </div>
          <ContainerList>
            <Table>
              <TbodyResult>
                {trainingSheet &&
                  trainingSheet.map((trainingSheet) => (
                    <tr key={trainingSheet.id}>
                      <td
                        onClick={() =>
                          trainingSheet.id ? handleEdit(trainingSheet.id) : ''
                        }
                      >
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
        </>
      ) : (
        <ClipboardTButtonInfoContainer>
          <ClipboardText size={150} />
          <h3>
            A sua rotina é como uma ficha, adicione vários treinos dentro dessa
            rotina
          </h3>
          <Button
            onClick={handleClick}
            style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
          >
            Criar Primeiro Treino
          </Button>
        </ClipboardTButtonInfoContainer>
      )}
    </div>
  )
}
