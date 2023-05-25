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
  InputContainer,
  Line,
  OverlayAlert,
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
import {
  CreateMuscleGroup,
  GetAllMuscleGroup,
  IcreateMuscleGroup,
  UpdateMuscleGroup,
  UpdateParans,
} from '@/pages/api/createMuscleGroup'

interface Plan {
  id: string
  name: string
}

interface Data {
  id: string
  name: string
}

const registerFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export const MuscleGroupRegistration = () => {
  const [muscleGroups, setMuscleGroups] = useState<Plan[]>([])

  const [isOpen, setIsOpen] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

  const [textMOdal, setTextModal] = useState('')

  const [muscleGroupInfo, setMuscleGroupInfo] = useState<Data>({
    id: '',
    name: '',
  })

  const [buttonDeleteDisabled, setButtonDeleteDisabled] = useState(false)

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleSearch = async () => {
    const searchTerm =
      (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    const data = await GetAllMuscleGroup(searchTerm)

    const muscleGroups = data.muscleGroup

    setMuscleGroups(muscleGroups)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  async function handleRegister(data: RegisterFormData) {
    try {
      const params: IcreateMuscleGroup = {
        name: data.name.toUpperCase(),
      }
      await CreateMuscleGroup(params)
      setModalOpen(true)
      setTextModal('Alteração realizada com sucesso!')
      reset()
      handleSearch()
    } catch (err: any) {
      // handle errors...
    }
  }

  async function handleUpdate(muscleGroup: Data) {
    try {
      const data = muscleGroupInfo
      const params: UpdateParans = {
        id: data.id,
        name: data.name.toUpperCase(),
      }
      console.log(params)
      await UpdateMuscleGroup(params)
      handleSearch()
      setModalOpen(true)
      setTextModal('Alteração realizada com sucesso!')
      reset()
    } catch (err: any) {
      // handle errors...
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setMuscleGroupInfo((prevMuscleGroupInfo) => ({
      ...prevMuscleGroupInfo,
      [name]: value,
    }))
  }

  function handleEdit(id: string) {
    const muscleGroupInfo = muscleGroups.filter(
      (muscleGroup) => muscleGroup.id === id,
    )[0]

    setValue('name', muscleGroupInfo.name)
    setMuscleGroupInfo(muscleGroupInfo)
    setButtonDeleteDisabled(true)
  }

  return (
    <Container>
      {isOpen && (
        <OverlayAlert>
          <ContainerAlert>
            <ContainerModalAlert>
              <TextAlert>
                <h2>Deseja excluir esse aluno?</h2>
              </TextAlert>
              <ButtonContainerAlert>
                <ButtonAlert
                  onClick={() => {
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
          <Text>Nome:</Text>

          {!buttonDeleteDisabled ? (
            <TextInput
              {...register('name', {
                required: true,
              })}
              placeholder="Digite o nome do grupo muscular"
              onBlur={(event) =>
                (event.target.value = event.target.value.toUpperCase())
              }
            />
          ) : (
            <TextInput
              {...register('name', {
                required: true,
              })}
              placeholder="Digite o nome do plano"
              value={muscleGroupInfo.name ?? 'Aguardando informações...'}
              onChange={handleInputChange}
              onBlur={(event) =>
                (event.target.value = event.target.value.toUpperCase())
              }
            />
          )}
          {errors.name && (
            <FormError>{<Text>{errors.name?.message}</Text>}</FormError>
          )}
        </TextInputContainer>
        <InputContainer></InputContainer>
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
                muscleGroupInfo && handleUpdate(muscleGroupInfo)
              }}
            >
              Atualizar
              <Pencil />
            </ButtonUpdate>
          )}

          <ButtonDelete
            type="button"
            style={{ marginTop: 27, marginBottom: 20 }}
            // onClick={() => {
            //   butonDelete()
            // }}
            disabled={!buttonDeleteDisabled}
          >
            Deletar
            <Trash />
          </ButtonDelete>
        </ButtonContainer>
      </Form>
      <ContainerList>
        <TextInputContainer>
          <Text>Pesquise por plano:</Text>
          <TextInputFindContainer>
            <TextInput
              onChange={handleSearch}
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
            {muscleGroups.map((muscleGroup) => (
              <tr key={muscleGroup.id}>
                <td
                  onClick={() => handleEdit(muscleGroup.id)}
                  style={{
                    width: '60%',
                    paddingLeft: '1rem',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                  }}
                >
                  {muscleGroup.name}
                </td>
              </tr>
            ))}
          </TbodyResult>
        </Table>
      </ContainerList>
    </Container>
  )
}
