import { useEffect, useState } from 'react'
import {
  Container,
  ContainerList,
  ContainerSheet,
  Form,
  FormError,
  Line,
  Select,
  Table,
  TableExercices,
  TbodyResult,
  Text,
  TextInput,
  TextInputContainer,
  TextInputFindContainer,
  TextTableExercices,
  Thead,
  TrainerSheetContainer,
  TrashContainer,
} from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetAllExercises } from '@/pages/api/createExercises'
import { GetAllMuscleGroup } from '@/pages/api/createMuscleGroup'
import {
  CreateTrainings,
  DeleteTraining,
  GetAllTraining,
  ICreateTrainings,
} from '@/pages/api/createTraining'
import { Plus, Trash } from '@phosphor-icons/react'

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'Training' | 'ExerciseSheet'
  workoutRoutineId: string
  workoutType: string
}

interface MuscleGroup {
  id: string
  name: string
  muscleGroupId: string
  repetitions: string
}

interface TrainingSheets {
  id: string
  name: string
  muscleGroup: string
  repetitions: string
  restTimeSeconds: number
  weight: number
}
const registerFormSchema = z.object({
  muscularGroup: z.string(),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function ExerciseSheet(props: {
  selectedComponent: ISelectedComponent
  handleSelectedComponent: (selectedComponent: ISelectedComponent) => void
}) {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([])

  const [exercises, setExercises] = useState<Exercises[]>([])

  const [selectedValue, setSelectedValue] = useState('')

  const [trainingSheetInfoId, setTrainingSheeInfotId] = useState('')

  const [selectedValueName, setSelectedValueName] = useState('')

  const [trainings, setTrainings] = useState<TrainingSheets[]>([])

  const {
    register,

    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  useEffect(() => {
    handleSearchExercises()
    console.log('training', trainings)
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
    setSelectedValueName(props.selectedComponent.workoutType)
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

  async function handleEdit(id: string) {
    const exerciseInfo = exercises.filter((exercises) => exercises.id === id)[0]

    try {
      const params: ICreateTrainings = {
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
            <Thead>
              <tr>
                <td style={{ width: '10%' }}>NOME:</td>
              </tr>
            </Thead>
            <TbodyResult>
              {exercises?.map((exercise) => (
                <tr key={exercise.id}>
                  <td
                    onClick={() => handleEdit(exercise.id)}
                    style={{
                      paddingLeft: '1rem',
                      textAlign: 'left',
                      textTransform: 'uppercase',
                    }}
                  >
                    <TrainerSheetContainer>
                      {exercise.name}
                    </TrainerSheetContainer>
                    <TrashContainer>
                      <Plus size={20} />
                    </TrashContainer>
                  </td>
                </tr>
              ))}
            </TbodyResult>
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
              <td style={{ width: '10%' }}>Salvar:</td>
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
                  />
                </td>
                <td style={{ padding: '0', textAlign: 'center' }}>
                  <TextInput
                    style={{ padding: '0', textAlign: 'center', fontSize: 18 }}
                    defaultValue={training.restTimeSeconds}
                  />
                </td>
                <td style={{ padding: '0', textAlign: 'center' }}>
                  <TextInput
                    style={{ padding: '0', textAlign: 'center', fontSize: 18 }}
                    defaultValue={training.repetitions}
                  />
                </td>
                <td>Salvar</td>
              </tr>
            ))}
          </TbodyResult>
        </TableExercices>
      </Form>
    </Container>
  )
}
