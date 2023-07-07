import React, { useEffect, useState } from 'react'
import {
  Container,
  ContainerList,
  ContainerSheet,
  ContainerSheetSave,
  Form,
  FormError,
  Line,
  Select,
  Table,
  TableExercices,
  TbodyResult,
  TbodyResultUp,
  TexHead,
  TexHeadContainer,
  TexHeadContainerDiv,
  Text,
  TextInput,
  TextInputContainer,
  TextInputFindContainer,
  TextTableExercices,
  Thead,
  TheadUp,
  TrainerSheetContainer,
  TrashContainer,
} from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetAllExercises, IcreateExercises } from '@/pages/api/createExercises'
import {
  GetAllMuscleGroup,
  IcreateMuscleGroup,
} from '@/pages/api/createMuscleGroup'
import {
  CreateTrainings,
  DeleteTraining,
  GetAllTraining,
  ICreateTrainings,
  UpdateTraining,
} from '@/pages/api/createTraining'
import { FloppyDisk, Plus, Trash } from '@phosphor-icons/react'

interface ISelectedComponent {
  id: string
  WorkoutName: string
  component: 'Routines' | 'Training' | 'ExerciseSheet'
  workoutRoutineId: string
  workoutType: string
}

export interface Exercises {
  id: string
  name: string
  description?: string
  url?: string
  muscleGroupId?: string
}

const registerFormSchema = z.object({
  muscularGroup: z.string(),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function ExerciseSheet(props: {
  selectedComponent: ISelectedComponent
  handleSelectedComponent: (selectedComponent: ISelectedComponent) => void
}) {
  const [muscleGroups, setMuscleGroups] = useState<IcreateMuscleGroup[]>([])

  const [exercises, setExercises] = useState<IcreateExercises[]>([])

  const [selectedValue, setSelectedValue] = useState('')

  const [trainingSheetInfoId, setTrainingSheeInfotId] = useState('')

  const [selectedValueWorkoutType, setSelectedValueWorkoutType] = useState('')

  const [selectedValueName, setSelectedValueName] = useState('')

  const [trainings, setTrainings] = useState<ICreateTrainings[]>([])

  // Defina o estado para cada valor do campo
  const [tweight, setTWeight] = useState<number | undefined>(
    trainings[0]?.weight ?? undefined,
  )

  const [restTimeSeconds, setRestTimeSeconds] = useState<number | undefined>(
    trainings[0]?.restTimeSeconds ?? undefined,
  )

  const [repetitions, setRepetitions] = useState<number | undefined>(
    trainings[0]?.repetitions ?? undefined,
  )

  const {
    register,

    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  useEffect(() => {
    handleSearchExercises()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue])

  useEffect(() => {
    handleSearchExercises()
    handleSearch()
    searchExercisesSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTrainingSheeInfotId(props.selectedComponent.id)
    setSelectedValueWorkoutType(props.selectedComponent.workoutType)
    setSelectedValueName(props.selectedComponent.WorkoutName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearchExercises = async () => {
    const searchTerm =
      (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    const data = await GetAllExercises(searchTerm, selectedValue)

    const exercises = data.exercises
    setExercises(exercises)
  }

  const searchExercisesSelection = async () => {
    const data = await GetAllTraining(props.selectedComponent.id)

    const trainings = data.trainings
    setTrainings(trainings)
  }

  const handleSearch = async () => {
    const data = await GetAllMuscleGroup('')
    const muscleGroups = data.muscleGroup
    setMuscleGroups(muscleGroups)
  }

  async function handleCreate(id: string) {
    const exerciseInfo = exercises.filter((exercises) => exercises.id === id)[0]

    try {
      const params: ICreateTrainings = {
        id,
        name: exerciseInfo.name,
        muscleGroupId: selectedValue,
        exerciseId: exerciseInfo.id,
        trainingSheetId: trainingSheetInfoId,
      }
      await CreateTrainings(params)

      handleSearch()
    } catch (err: any) {
      // handle errors...
    }
    searchExercisesSelection()
  }

  // Funções de tratamento para atualizar os valores dos campos
  const handleWeight = (inputValue: number) => {
    setTWeight(inputValue)
    // setInputId(trainingId)
    console.log('inputValue handle', inputValue)
  }

  const handleRestTimeSeconds = (inputValue: number) => {
    setRestTimeSeconds(inputValue)
    // setInputId(trainingId)
    console.log('inputValue handle', inputValue)
  }

  const handleRepetitions = (inputValue: number) => {
    setRepetitions(inputValue)
    // setInputId(trainingId)
    console.log('inputValue handle', inputValue)
  }

  async function handleUpdate(id: string) {
    console.log('handleupdate', tweight, restTimeSeconds, repetitions, id)
    try {
      const params: ICreateTrainings = { id }

      if (tweight !== undefined) {
        params.weight = tweight
      }

      if (restTimeSeconds !== undefined) {
        params.restTimeSeconds = restTimeSeconds
      }

      if (repetitions !== undefined) {
        params.repetitions = repetitions
      }

      if (Object.keys(params).length > 0) {
        params.id = id
        await UpdateTraining(params)
        console.log('params', params)
      }

      handleSearch()
    } catch (err: any) {
      // Tratar erros...
    }

    searchExercisesSelection()
  }

  async function handleDelete(id: string) {
    try {
      await DeleteTraining(id)
      searchExercisesSelection()
    } catch (err: any) {
      // handle errors...
    }
  }

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value)
  }

  return (
    <Container>
      <Form>
        <TexHeadContainerDiv>
          <TexHeadContainer>
            <TexHead>{selectedValueName}</TexHead>
            <TexHead>{selectedValueWorkoutType}</TexHead>
          </TexHeadContainer>
        </TexHeadContainerDiv>
        <TextInputContainer>
          <Text>Grupo Muscular:</Text>
          <Select
            style={{ width: '100%' }}
            {...register('muscularGroup', { required: true })}
            onChange={handleSelectChange}
            value={selectedValue}
          >
            <option value={''}></option>
            {muscleGroups.map((muscleGroup) => (
              <option key={muscleGroup.id} value={muscleGroup.id}>
                {muscleGroup.name}
              </option>
            ))}
          </Select>
          {errors.muscularGroup && (
            <FormError>
              <Text>{errors.muscularGroup?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>

        <ContainerList>
          <TextInputContainer>
            <Text>Pesquise o exercício:</Text>
            <TextInputFindContainer>
              <TextInput
                onChange={handleSearchExercises}
                id="search-input"
                placeholder="Digite o nome do plano"
              />
            </TextInputFindContainer>
          </TextInputContainer>
          <Table>
            <TheadUp>
              <tr>
                <td style={{ width: '10%' }}>NOME:</td>
              </tr>
            </TheadUp>
            <TbodyResultUp>
              {exercises?.map((exercise) => (
                <tr key={exercise.id}>
                  <td
                    onClick={() => handleCreate(exercise.id || '')}
                    style={{
                      paddingLeft: '1rem',
                      textAlign: 'left',
                      textTransform: 'uppercase',
                    }}
                  >
                    <ContainerSheet>
                      <TrainerSheetContainer>
                        {exercise.name}
                      </TrainerSheetContainer>
                      <TrashContainer>
                        <Plus size={20} />
                      </TrashContainer>
                    </ContainerSheet>
                  </td>
                </tr>
              ))}
            </TbodyResultUp>
          </Table>
        </ContainerList>
        <Line />
        <TextTableExercices>
          Exercícios Selecionados Click para excluir:
        </TextTableExercices>
        <TableExercices>
          <Thead>
            <tr>
              <td style={{ width: '10%' }}>NOME:</td>
              <td style={{ width: '10%' }}>Peso:</td>
              <td style={{ width: '10%' }}>Descanso:</td>
              <td style={{ width: '10%' }}>Repetições:</td>
              <td style={{ width: '5%', textAlign: 'center' }}>Salvar:</td>
            </tr>
          </Thead>
          <TbodyResult>
            {trainings?.map((training) => (
              <tr key={training.id}>
                <td>
                  <ContainerSheet>
                    <TrainerSheetContainer>
                      {training.name}
                    </TrainerSheetContainer>
                    <TrashContainer
                      onClick={() => handleDelete(training.id)}
                      style={{
                        textAlign: 'left',
                        textTransform: 'uppercase',
                      }}
                    >
                      <Trash size={25} />
                    </TrashContainer>
                  </ContainerSheet>
                </td>

                <td style={{ padding: '0', textAlign: 'center' }}>
                  <TextInput
                    style={{ padding: '0', textAlign: 'center', fontSize: 18 }}
                    defaultValue={training.weight}
                    onChange={(event) => {
                      const inputValue = parseFloat(event.target.value)
                      handleWeight(inputValue)
                    }}
                  />
                </td>
                <td style={{ padding: '0', textAlign: 'center' }}>
                  <TextInput
                    style={{ padding: '0', textAlign: 'center', fontSize: 18 }}
                    defaultValue={training.restTimeSeconds}
                    onChange={(event) => {
                      const inputValue = parseFloat(event.target.value)
                      handleRestTimeSeconds(inputValue)
                    }}
                  />
                </td>
                <td style={{ padding: '0', textAlign: 'center' }}>
                  <TextInput
                    style={{
                      padding: '0',
                      textAlign: 'center',
                      fontSize: 18,
                    }}
                    defaultValue={training.repetitions}
                    onChange={(event) => {
                      const inputValue = parseFloat(event.target.value)
                      handleRepetitions(inputValue)
                    }}
                  />
                </td>
                <td onClick={() => handleUpdate(training.id)}>
                  <ContainerSheetSave>
                    Salvar
                    <FloppyDisk size={20} />
                  </ContainerSheetSave>
                </td>
              </tr>
            ))}
          </TbodyResult>
        </TableExercices>
      </Form>
    </Container>
  )
}
