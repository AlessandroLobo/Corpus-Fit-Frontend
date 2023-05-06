import { useEffect, useState } from 'react'
import { ModalInfo } from '../Modal/modalInfo'
import {
  ButtonContainer,
  ButtonDelete,
  ButtonUpdate,
  Container,
  ContainerList,
  Form,
  FormError,
  InputContainer,
  Line,
  Table,
  TbodyResult,
  Text,
  TextInfo,
  TextInput,
  TextInputContainer,
  TextInputFindContainer,
  Thead,
} from './style'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Pencil, Trash } from '@phosphor-icons/react'
import {
  createPlans,
  CreateParans,
  GetAllPlans,
} from '@/pages/api/plans/index.api'

interface Plan {
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

  const [textMOdal, setTextModal] = useState('')

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async () => {
    const searchTerm =
      (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    const data = await GetAllPlans(searchTerm)

    console.log('Data', data)
    const { plans } = data

    setPlans(plans)
  }

  console.log('Plans', plans)
  const {
    register,
    reset,
    handleSubmit,
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
    } catch (err: any) {
      // handle errors...
    }
  }

  // if (loading) {
  //   return <p>Carregando planos...</p>
  // }

  return (
    <Container>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        <TextInfo>
          <h1>{textMOdal}</h1>
        </TextInfo>
      </ModalInfo>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInputContainer>
          <Text>Nome:</Text>
          <TextInput
            {...register('name', {
              required: true,
            })}
            placeholder="Digite o nome do plano"
            onBlur={(event) =>
              (event.target.value = event.target.value.toUpperCase())
            }
          />
          {errors.name && (
            <FormError>{<Text>{errors.name?.message}</Text>}</FormError>
          )}
        </TextInputContainer>
        <InputContainer>
          <TextInputContainer>
            <Text>Duração em dias:</Text>
            <TextInput
              {...register('duration', {
                required: true,
                valueAsNumber: true, // converte automaticamente para número
              })}
              type="number"
              placeholder="Digite a duração do plano"
            />
            {errors.duration && (
              <FormError>
                <Text>{errors.duration?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>
          <TextInputContainer>
            <Text>Valor:</Text>
            <TextInput
              {...register('price', {
                required: true,
                valueAsNumber: true, // converte automaticamente para número
              })}
              type="number" 
              step="0.01"
              placeholder="Digite o valor do plano"
            />
            {errors.price && (
              <FormError>
                {' '}
                <Text>{errors.price?.message}</Text>{' '}
              </FormError>
            )}
          </TextInputContainer>
        </InputContainer>
        <Line />
        <ButtonContainer>
          <ButtonUpdate
            type="submit"
            style={{ marginTop: 27, marginBottom: 20 }}
          >
            Salvar
            <Pencil />
          </ButtonUpdate>
          <ButtonDelete
            type="button"
            style={{ marginTop: 27, marginBottom: 20 }}
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
                  // onClick={() => handleEdit(plan.id)}
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
                  // onClick={() => handleEdit(plan.id)}
                  style={{
                    width: '10%',
                    paddingLeft: '1rem',
                  }}
                >
                  {plan.duration}
                </td>

                <td
                  // onClick={() => handleEdit(plan.id)}
                  style={{ width: '10%', paddingLeft: '1rem' }}
                >
                  {plan.price}
                </td>
              </tr>
            ))}
          </TbodyResult>
        </Table>
      </ContainerList>
    </Container>
  )
}
