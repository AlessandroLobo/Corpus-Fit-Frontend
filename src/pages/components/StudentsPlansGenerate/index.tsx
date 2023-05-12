import {
  Button,
  ButtonAlert,
  ButtonContainer,
  ButtonContainerAlert,
  ButtonCreatePlan,
  Container,
  ContainerAlert,
  ContainerModalAlert,
  ContainerPlan,
  ContainerPlanTitle,
  Form,
  FormData,
  FormError,
  Line,
  OverlayAlert,
  Select,
  Text,
  TextAlert,
  TextInfo,
  TextInput,
  TextInputContainer,
} from './styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useEffect, useRef, useState } from 'react'
import { FindStudent } from '@/pages/api/getAllStudents/index.api'
import { getAddress } from '@/utils/getAddress'
import { usePlans } from '@/pages/api/plans/index.api'
import { dataMask } from '@/utils/maskUtils'
import { CalendarPlus } from '@phosphor-icons/react'
import { ModalInfo } from '../Modal/modalInfo'

interface StudentEditProps {
  studentParansId: string
}

interface Data {
  id: string
  name: string
}
const registerFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  plan: z.string().nonempty({ message: 'Escolha um Plano' }),
  price: z.number().min(0.01, 'O valor mínimo é de R$ 10,00'),
  dueData: z.string().length(8, 'Digite uma data valida'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const StudentsPlansGenerate = ({ studentParansId }: StudentEditProps) => {
  const {
    register,
    // handleSubmit,
    // reset,
    formState: { errors },
    trigger,
    // getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const [student, setStudent] = useState<Data | null>(null)

  const [err, setError] = useState('')

  const { plans, loading } = usePlans()

  const [planObjectPrice, setPlanObjetcPrice] = useState('')

  const planNameRef = useRef('')

  const planPriceRef = useRef('')

  const [modalOpen, setModalOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [textModal, setTextModal] = useState('')

  const [textModalAlert, setTextModalAlert] = useState('')

  const [usePlanId, setUsePlanId] = useState('')

  const [buttonCreatePlanDisabled, setButtonCreatePlanDisabled] =
    useState(false)

  function handlePlanChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedName = event.target.value
    // Procura o objeto do plano selecionado no array "plans"
    const selectedPlanObj = plans.find((plan) => plan.name === selectedName)
    // Atualiza o valor de "ide" com o ID do objeto encontrado
    if (selectedPlanObj) {
      setPlanObjetcPrice(selectedPlanObj.price.toString())
      setUsePlanId(selectedPlanObj.id)
    }
    setButtonCreatePlanDisabled(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await FindStudent({
          studentParansId,
        })
        const addressInfo = await getAddress(studentData.CEP)

        if (!addressInfo) {
          setError('Invalid Zip Code')
          return
        }

        setStudent(studentData)

        const planName = studentData.Plan.name
        const planPrice = studentData.Plan.price

        planNameRef.current = planName
        planPriceRef.current = planPrice
      } catch (error) {
        setError(err)
      }
    }
    fetchData()
  }, [studentParansId, err])

  if (!student) {
    return <Form>Carregando dados...</Form>
  }

  if (loading) {
    return <Form>Carregando planos...</Form>
  }
  function handleAlertGeneratePlan() {
    setIsOpen(true)
  }

  function handlerGeneratePlan() {
    setTextModalAlert('Plano gerado com sucesso!')
    console.log('Text Modal Alert', textModalAlert)
    console.log('PlanId', usePlanId)
    console.log('Student Id', student?.id)
  }

  return (
    <>
      {isOpen && (
        <OverlayAlert>
          <ContainerAlert>
            <ContainerModalAlert>
              <TextAlert>
                <h2>{textModalAlert}</h2>
              </TextAlert>
              <ButtonContainerAlert>
                <ButtonAlert
                  onClick={() => {
                    handlerGeneratePlan()
                    setIsOpen(false)
                  }}
                >
                  Ok
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
          <h1>{textModal}</h1>
        </TextInfo>
      </ModalInfo>

      <Form
        as="form"
        onSubmit={(event) => {
          event.preventDefault()
          // handleDelete(clientId)
          // handleUpdate(student)
        }}
      >
        <FormData>
          <TextInputContainer>
            <Container>
              <Text>Nome:</Text>
              <TextInput
                {...register('name', {
                  required: true,
                })}
                defaultValue={student?.name || ''}
                placeholder="Digite seu nome completo"
                style={{ width: '100%' }}
                onBlur={(event) =>
                  (event.target.value = event.target.value.toUpperCase())
                }
              />
              {errors.name && (
                <FormError>
                  <Text>{errors.name?.message}</Text>{' '}
                </FormError>
              )}
            </Container>
            <Container>
              <Text>Plano:</Text>
              <Select
                style={{ width: '100%' }}
                {...register('plan', { required: true })}
                defaultValue={planNameRef.current}
                onChange={handlePlanChange}
              >
                <option value=""></option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </Select>
              {errors.plan && (
                <FormError>
                  <Text>{errors.plan?.message}</Text>
                </FormError>
              )}
              <ContainerPlan>
                <ContainerPlanTitle>
                  <Text>Valor:</Text>
                  <TextInput
                    {...register('price', {
                      required: true,
                    })}
                    contentEditable={false}
                    readOnly={true}
                    defaultValue={planObjectPrice}
                    placeholder="Digite seu nome completo"
                    style={{ width: '20' }}
                  />
                  {errors.name && (
                    <FormError>
                      <Text>{errors.name?.message}</Text>{' '}
                    </FormError>
                  )}
                </ContainerPlanTitle>
                <ContainerPlanTitle>
                  <Text>Final do plano:</Text>
                  <TextInput
                    {...register('dueData', {
                      required: true,
                    })}
                    placeholder="Digite sua data de Nascimento completo"
                    style={{ width: '100%' }}
                    onBlur={(e) => {
                      e.target.value = dataMask(e.target.value)
                      trigger('dueData')
                    }}
                  />
                  {errors.dueData && (
                    <FormError>
                      <Text>{errors.dueData?.message}</Text>
                    </FormError>
                  )}
                </ContainerPlanTitle>
              </ContainerPlan>
            </Container>
          </TextInputContainer>
        </FormData>
        <ButtonContainer>
          <ButtonCreatePlan
            onClick={handleAlertGeneratePlan}
            type="submit"
            disabled={!buttonCreatePlanDisabled}
            style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
          >
            Gerar plano do aluno
            <CalendarPlus size={18} />
          </ButtonCreatePlan>
        </ButtonContainer>
        <Line />
      </Form>
    </>
  )
}

export { StudentsPlansGenerate }
