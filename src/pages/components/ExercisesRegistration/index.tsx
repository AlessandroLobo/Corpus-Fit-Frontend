import React, { useEffect, useState } from 'react'
import { ModalInfo } from '../Modal/modalInfo'
import { z } from 'zod'
import {
  ButtonAlert,
  ButtonContainer,
  ButtonContainerAlert,
  ButtonDelete,
  ButtonSave,
  ButtonUpdate,
  Container,
  ContainerAlert,
  ContainerList,
  ContainerModalAlert,
  Form,
  FormError,
  Line,
  OverlayAlert,
  Select,
  Table,
  TbodyResult,
  Text,
  TextAlert,
  TextInfo,
  TextInput,
  TextInputContainer,
  TextInputFindContainer,
  Thead,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Pencil, Trash } from '@phosphor-icons/react'
import { GetAllMuscleGroup } from '@/pages/api/createMuscleGroup'
import {
  CreateExercises,
  DeleteExercise,
  GetAllExercises,
  IcreateExercises,
  UpdateParansExercises,
  UpdateExercises,
} from '@/pages/api/createExercises'

interface MuscleGroup {
  id: string
  name: string
}

interface Exercises {
  id: string
  name: string
  description: string
  url: string
  muscleGroupId: string
}

interface Data {
  id: string
  name: string
  description: string
  url: string
  muscleGroupId: string
}

const registerFormSchema = z.object({
  muscularGroup: z.string(),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  url: z.string().url('URL inválida'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export const ExercisesRegistration = () => {
  const [selectedValue, setSelectedValue] = useState('')

  const [exercises, setExercises] = useState<Exercises[]>([])

  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([])

  const [isOpen, setIsOpen] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

  const [textMOdal, setTextModal] = useState('')

  const [exerciseInfo, setExerciseInfo] = useState<Data>({
    id: '',
    name: '',
    description: '',
    url: '',
    muscleGroupId: '',
  })

  const [buttonDeleteDisabled, setButtonDeleteDisabled] = useState(false)

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
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

  async function handleRegister(data: RegisterFormData) {
    try {
      const params: IcreateExercises = {
        name: data.name.toUpperCase(),
        muscleGroupId: selectedValue,
        url: data.url,
      }
      await CreateExercises(params)
      setModalOpen(true)
      setTextModal('Alteração realizada com sucesso!')
      reset()
      handleSearch()
      handleSearchExercises()
    } catch (err: any) {
      // handle errors...
    }
  }

  function butonDelete() {
    setIsOpen(true)
  }

  async function handleUpdate() {
    try {
      const data = exerciseInfo
      const formState = getValues()
      const params: UpdateParansExercises = {
        id: data.id,
        name: formState.name.toUpperCase(),
        muscleGroupId: selectedValue,
        url: formState.url,
      }
      await UpdateExercises(params)
      handleSearch()
      setModalOpen(true)
      setTextModal('Alteração realizada com sucesso!')
      reset()
      handleSearchExercises()
    } catch (err: any) {
      // handle errors...
    }
  }

  async function handleDelete(exerciseInfo: Data) {
    try {
      await DeleteExercise(exerciseInfo.id)
      reset({
        name: '',
        url: '',
      })
      setModalOpen(true)
      setTextModal('Aluno deletado com sucesso!')
      setButtonDeleteDisabled(false)
      handleSearch()
      handleSearchExercises()
    } catch (err: any) {
      // handle errors...
    }
  }

  function handleEdit(id: string) {
    const exerciseInfo = exercises.filter((exercises) => exercises.id === id)[0]

    setValue('name', exerciseInfo.name)
    setValue('url', exerciseInfo.url)
    setExerciseInfo(exerciseInfo)
    setButtonDeleteDisabled(true)
  }

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value)
  }

  return (
    <Container>
      {isOpen && (
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
      </ModalInfo>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
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

        <TextInputContainer>
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
        </ButtonContainer>
      </Form>
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
              <td style={{ width: '40%' }}>NOME:</td>
            </tr>
          </Thead>
          <TbodyResult>
            {exercises?.map((exercise) => (
              <tr key={exercise.id}>
                <td
                  onClick={() => handleEdit(exercise.id)}
                  style={{
                    width: '60%',
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
    </Container>
  )
}
