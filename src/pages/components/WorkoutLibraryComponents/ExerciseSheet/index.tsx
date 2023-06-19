import { useEffect, useState } from 'react'
import {
  Container,
  ContainerList,
  Form,
  FormError,
  Select,
  Table,
  TbodyResult,
  Text,
  TextInput,
  TextInputContainer,
  TextInputFindContainer,
  Thead,
} from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetAllExercises } from '@/pages/api/createExercises'
import { GetAllMuscleGroup } from '@/pages/api/createMuscleGroup'

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'Training' | 'ExerciseSheet'
  workoutRoutineId: string
}

interface MuscleGroup {
  id: string
  name: string
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

  const [exerciseInfo, setExerciseInfo] = useState<Data>({
    id: '',
    name: '',
    description: '',
    url: '',
    muscleGroupId: '',
  })

  const {
    register,
    // reset,
    // handleSubmit,
    // setValue,
    // getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleSearchExercises = async () => {
    const searchTerm =
      (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    const data = await GetAllExercises(searchTerm, selectedValue)

    const exercises = data.exercises
    setExercises(exercises)
  }

  const handleSearch = async () => {
    const data = await GetAllMuscleGroup('')
    const muscleGroups = data.muscleGroup
    setMuscleGroups(muscleGroups)
  }
  useEffect(() => {
    handleSearchExercises()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue])

  useEffect(() => {
    handleSearchExercises()
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('props.selectedComponent', props.selectedComponent.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleEdit(id: string) {
    const exerciseInfo = exercises.filter((exercises) => exercises.id === id)[0]

    // setValue('name', exerciseInfo.name)
    // setValue('url', exerciseInfo.url)
    // setExerciseInfo(exerciseInfo)
    // setButtonDeleteDisabled(true)
  }

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value)
  }

  return (
    <Container>
      {/* {isOpen && (
        <OverlayAlert>
          <ContainerAlert>
            <ContainerModalAlert>
              <TextAlert>
                <h2>Deseja excluir esse exercicio?</h2>
              </TextAlert>
              <ButtonContainerAlert>
                <ButtonAlert
                  onClick={() => {
                    exerciseInfo && handleDelete(exerciseInfo)
                    setIsOpen(false)
                  }}
                >
                  Deletar
                </ButtonAlert>
                <ButtonAlert
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  Cancelar
                </ButtonAlert>
              </ButtonContainerAlert>
            </ContainerModalAlert>
          </ContainerAlert>
        </OverlayAlert>
      )}
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        <TextInfo>{<h1>{textMOdal}</h1>}</TextInfo>
      </ModalInfo> */}
      {/* <Form as="form" onSubmit={handleSubmit(handleRegister)}> */}
      <Form>
        <TextInputContainer>
          <Text>Grupo Muscular:</Text>
          <Select
            style={{ width: '100%' }}
            {...register('muscularGroup', { required: true })}
            onChange={handleSelectChange}
            value={selectedValue}
          >
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

        {/* <TextInputContainer>
          <Text>Nome:</Text>
          <TextInput
            {...register('name', {
              required: true,
            })}
            placeholder="Digite seu nome do exercicio"
            style={{ width: '100%' }}
            onBlur={(event) =>
              (event.target.value = event.target.value.toUpperCase())
            }
          />
          {errors.name && (
            <FormError>
              <Text>{errors.name?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>
        <TextInputContainer>
          <Text>URL:</Text>
          <TextInput
            {...register('url', {
              required: true,
            })}
            placeholder="Digite seu nome do exercicio"
            style={{ width: '100%' }}
          />
          {errors.url && (
            <FormError>
              <Text>{errors.url?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>

        <Line />
        <ButtonContainer>
          {!buttonDeleteDisabled ? (
            <ButtonSave
              type="submit"
              style={{ marginTop: 27, marginBottom: 20 }}
            >
              Salvar
              <Pencil />
            </ButtonSave>
          ) : (
            <ButtonUpdate
              type="button"
              style={{ marginTop: 27, marginBottom: 20 }}
              onClick={() => {
                exerciseInfo && handleUpdate()
              }}
            >
              Atualizar
              <Pencil />
            </ButtonUpdate>
          )}

          <ButtonDelete
            type="button"
            style={{ marginTop: 27, marginBottom: 20 }}
            onClick={() => {
              butonDelete()
            }}
            disabled={!buttonDeleteDisabled}
          >
            Deletar
            <Trash />
          </ButtonDelete>
        </ButtonContainer> */}
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
                <td style={{ width: '20%' }}>NOME:</td>
              </tr>
            </Thead>
            <TbodyResult>
              {exercises?.map((exercise) => (
                <tr key={exercise.id}>
                  <td
                    onClick={() => handleEdit(exercise.id)}
                    style={{
                      // width: '0%',
                      paddingLeft: '1rem',
                      textAlign: 'left',
                      textTransform: 'uppercase',
                    }}
                  >
                    {exercise.name}
                  </td>
                </tr>
              ))}
            </TbodyResult>
          </Table>
        </ContainerList>
      </Form>
    </Container>
  )
}
