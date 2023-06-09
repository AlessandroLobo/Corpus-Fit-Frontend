import React, { useEffect, useState } from 'react'
import { ModalInfo } from '../Modal/modalInfo'
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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Pencil, Trash } from '@phosphor-icons/react'
import {
  createPlans,
  CreateParans,
  GetAllPlans,
  updatePlans,
  UpdateParans,
  deletePlans,
} from '@/pages/api/plans/index.api'

interface Plan {
  id: string
  name: string
  duration: number
  price: number
}

interface Data {
  id: string
  name: string
  duration: number
  price: number
}

const registerFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  duration: z.number().min(1, 'A duração deve ter pelo menos 1 caracteres'),
  price: z.number().min(0.01, 'O valor mínimo é de R$ 10,00'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export const PlanRegistration = () => {
  const [plans, setPlans] = useState<Plan[]>([])

  const [modalOpen, setModalOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [textMOdal, setTextModal] = useState('')

  const [buttonDeleteDisabled, setButtonDeleteDisabled] = useState(false)

  const [planInfo, setPlanInfo] = useState<Data>({
    id: '',
    name: '',
    duration: 0,
    price: 0,
  })

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async () => {
    const searchTerm =
      (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    const data = await GetAllPlans(searchTerm)

    const { plans } = data

    setPlans(plans)
  }

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormData) {
    try {
      const params: CreateParans = {
        name: data.name.toUpperCase(),
        duration: data.duration,
        price: data.price,
      }
      await createPlans(params)
      setModalOpen(true)
      setTextModal('Alteração realizada com sucesso!')
      reset()
      handleSearch()
    } catch (err: any) {
      // handle errors...
    }
  }

  async function handleUpdate(plan: Data) {
    try {
      const data = planInfo
      const params: UpdateParans = {
        id: data.id,
        name: data.name.toUpperCase(),
        duration: parseInt(data.duration.toString()), // converte para número
        price: parseFloat(data.price.toString()), // converte para número
      }
      await updatePlans(params)
      handleSearch()

      setModalOpen(true)
      setTextModal('Alteração realizada com sucesso!')
      reset()
    } catch (err: any) {
      // handle errors...
    }
  }

  function handleEdit(id: string) {
    const planInfo = plans.filter((plan) => plan.id === id)[0]
    setValue('name', planInfo.name)
    setValue('duration', planInfo.duration)
    setValue('price', planInfo.price)
    setPlanInfo(planInfo)
    setButtonDeleteDisabled(true)
  }

  function butonDelete() {
    setIsOpen(true)
  }

  async function handleDelete(plan: Data) {
    try {
      await deletePlans(planInfo.id)
      // alert('Exclusão feita')
      reset({
        name: '',
        duration: 0,
        price: 0,
      })
      setModalOpen(true)
      setTextModal('Aluno deletado com sucesso!')
      setButtonDeleteDisabled(false)
      handleSearch()
    } catch (err: any) {
      // handle errors...
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setPlanInfo((prevPlanInfo) => ({
      ...prevPlanInfo,
      [name]: value,
    }))
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
                    planInfo && handleDelete(planInfo)
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
        <TextInfo>
          <h1>{textMOdal}</h1>
        </TextInfo>
      </ModalInfo>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInputContainer>
          <Text>Nome:</Text>

          {!buttonDeleteDisabled ? (
            <TextInput
              {...register('name', {
                required: true,
              })}
              placeholder="Digite o nome do plano"
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
              value={planInfo.name ?? 'Aguardando informações...'}
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
        <InputContainer>
          <TextInputContainer>
            <Text>Duração em dias:</Text>
            {!buttonDeleteDisabled ? (
              <TextInput
                {...register('duration', {
                  required: true,
                  valueAsNumber: true, // converte automaticamente para número
                })}
                type="number"
                placeholder="Digite a duração do plano"
              />
            ) : (
              <TextInput
                {...register('duration', {
                  required: true,
                  valueAsNumber: true, // converte automaticamente para número
                })}
                type="number"
                placeholder="Digite a duração do plano"
                value={planInfo.duration ?? 'Aguardando informações...'}
                onChange={handleInputChange}
              />
            )}

            {errors.duration && (
              <FormError>
                <Text>{errors.duration?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>
          <TextInputContainer>
            <Text>Valor:</Text>
            {!buttonDeleteDisabled ? (
              <TextInput
                {...register('price', {
                  required: true,
                  valueAsNumber: true, // converte automaticamente para número
                })}
                type="number"
                step="0.01"
                placeholder="Digite o valor do plano"
              />
            ) : (
              <TextInput
                {...register('price', {
                  required: true,
                  valueAsNumber: true, // converte automaticamente para número
                })}
                type="number"
                step="0.01"
                placeholder="Digite o valor do plano"
                value={planInfo.price ?? 'Aguardando informações...'}
                onChange={handleInputChange}
              />
            )}

            {errors.price && (
              <FormError>
                <Text>{errors.price?.message}</Text>{' '}
              </FormError>
            )}
          </TextInputContainer>
        </InputContainer>
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
                planInfo && handleUpdate(planInfo)
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
              <td style={{ width: '20%' }}>DURAÇÃO:</td>
              <td style={{ width: '20%' }}>VALOR:</td>
            </tr>
          </Thead>
          <TbodyResult>
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td
                  onClick={() => handleEdit(plan.id)}
                  style={{
                    width: '60%',
                    paddingLeft: '1rem',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                  }}
                >
                  {plan.name}
                </td>

                <td
                  onClick={() => handleEdit(plan.id)}
                  style={{
                    width: '10%',
                    paddingLeft: '1rem',
                  }}
                >
                  {plan.duration} Dias
                </td>

                <td
                  // onClick={() => handleEdit(plan.id)}
                  style={{ width: '10%', paddingLeft: '1rem' }}
                >
                  {plan.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
            ))}
          </TbodyResult>
        </Table>
      </ContainerList>
    </Container>
  )
}
