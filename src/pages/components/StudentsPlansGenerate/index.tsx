import {
  ButtonAlert,
  ButtonContainer,
  ButtonContainerAlert,
  ButtonCreatePlan,
  Container,
  ContainerAlert,
  ContainerList,
  ContainerModalAlert,
  ContainerPlan,
  ContainerPlanTitle,
  Form,
  FormData,
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
  Thead,
} from './styles'
import { date, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useEffect, useRef, useState } from 'react'
import { FindStudent } from '@/pages/api/getAllStudents/index.api'
import { getAddress } from '@/utils/getAddress'
import { usePlans } from '@/pages/api/plans/index.api'
import { dataMask } from '@/utils/maskUtils'
import { CalendarPlus } from '@phosphor-icons/react'
import { ModalInfo } from '../Modal/modalInfo'
import {
  ICreateStudentPLanParans,
  CreateStudentPlans,
  FindPlansGenerate,
} from '@/pages/api/createStudentPLans'
import { PaymentReceiving } from '../PaymentReceiving'
import dayjs from 'dayjs'

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
  dueDate: z.string(),
  studentStatus: z.string(),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const StudentsPlansGenerate = ({ studentParansId }: StudentEditProps) => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
    trigger,
    // getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const [student, setStudent] = useState<Data | null>(null)

  const [studentSelect, setStudentSelect] = useState('')

  const [studentActive, setStudentActive] = useState('')

  const [studentActiveColor, setStudentActiveColor] = useState('')

  const [maxDueDate, setMaxDueDate] = useState('')

  const [plansGenerate, setPlansGenerate] = useState('')

  const [selectPlansGenerate, setSelectPlansGenerate] = useState('')

  const [err, setError] = useState('')

  const { plans, loading } = usePlans()

  const [planObjectPrice, setPlanObjetcPrice] = useState('')

  const [editingPlanGenerate, setEditingPlanGenerate] = useState(false)

  const planNameRef = useRef('')

  const planPriceRef = useRef('')

  const [modalOpen, setModalOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [textModal, setTextModal] = useState('')

  const [registerError, setRegisterError] = useState<string | null>(null)

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
    FindPlansGenerateFunction()
  }, [modalOpen])

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
  }, [studentParansId, err, modalOpen])

  if (!student) {
    return <Form>Carregando dados...</Form>
  }

  if (loading) {
    return <Form>Carregando planos...</Form>
  }

  function FindPlansGenerateFunction() {
    const fetchData = async () => {
      try {
        const data = await FindPlansGenerate({ studentParansId })

        setPlansGenerate(data.formattedStudentPlans)

        const maxDueDateFormat = dayjs(data.maxDueDate)
        const formattedMaxDueDate = maxDueDateFormat.isValid()
          ? maxDueDateFormat.format('DD/MM/YYYY')
          : 'Sem Plano'

        const dateNow = dayjs()
        const maxDueDateInput = dayjs(data.maxDueDate, 'DD/MM/YYYY')

        console.log(formattedMaxDueDate)

        if (maxDueDateInput.diff(dateNow, 'day') > 0) {
          setMaxDueDate(formattedMaxDueDate)
          setStudentActive('Ativo')

          setStudentActiveColor('#00e7f9')
          console.log('Ativo -------------')
        } else {
          setMaxDueDate(formattedMaxDueDate)
          setStudentActive('Inativo')

          setStudentActiveColor('#FF0000')
          console.log('Inativo=========')
        }

        console.log('studentActive', studentActive)
      } catch (error) {
        setError(err) // Atualizar a variável de erro corretamente
      }
    }

    if (studentParansId) {
      fetchData()
    }
  }

  function handleAlertGeneratePlan() {
    setTextModalAlert('Deseja gerar um novo plano?')
    setIsOpen(true)
    FindPlansGenerateFunction()
  }

  function handlerGeneratePlan() {
    handleRegister()
  }

  function handleEdit(plansGenerateId: any) {
    // console.log('plansGenerateId', plansGenerateId)
    setSelectPlansGenerate(plansGenerateId)
    setStudentSelect(student ? student.id : '')
    setEditingPlanGenerate(true)
    setModalOpen(true)
  }

  async function handleRegister() {
    try {
      const params: ICreateStudentPLanParans = {
        planId: usePlanId,
        studentId: student?.id ?? '',
        planValue: parseFloat(planObjectPrice),
      }
      await CreateStudentPlans(params)
      await FindPlansGenerateFunction()
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        if (
          err.response.data.message === 'Error creating user: Cpf já cadastrado'
        ) {
          setRegisterError('O CPF informado já está cadastrado.')
        } else {
          setRegisterError(
            'Ocorreu um erro ao criar usuário. Por favor, tente novamente mais tarde.',
          )
        }
      } else {
        setRegisterError(
          'Ocorreu um erro interno do servidor. Por favor, tente novamente mais tarde.',
        )
      }
    }
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
                    FindPlansGenerateFunction()
                    setButtonCreatePlanDisabled(false)
                  }}
                >
                  Ok
                </ButtonAlert>
                <ButtonAlert
                  onClick={() => {
                    setIsOpen(false)
                    FindPlansGenerateFunction()
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
        {editingPlanGenerate ? (
          <PaymentReceiving
            plansGenerateId={selectPlansGenerate}
            studentSelect={student}
          />
        ) : (
          <TextInfo>
            <h1>{textModal}</h1>
          </TextInfo>
        )}
      </ModalInfo>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
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
                    style={{ width: '7rem', textAlign: 'center' }}
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
                    {...register('dueDate', {
                      required: true,
                    })}
                    value={maxDueDate || ''}
                    id="dueDate"
                    style={{ width: '7rem', textAlign: 'center' }}
                    onBlur={(event) =>
                      (event.target.value = event.target.value.toUpperCase())
                    }
                  />
                  {errors.dueDate && (
                    <FormError>
                      <Text>{errors.dueDate?.message}</Text>
                    </FormError>
                  )}
                </ContainerPlanTitle>
                <ContainerPlanTitle>
                  {' '}
                  <Text>Status:</Text>
                  <TextInput
                    {...register('studentStatus', {
                      required: true,
                    })}
                    value={studentActive || ''}
                    placeholder="Digite seu nome completo"
                    style={{
                      width: '7rem',
                      textAlign: 'center',
                      color: studentActiveColor,
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                    }}
                    onBlur={(event) =>
                      (event.target.value = event.target.value.toUpperCase())
                    }
                  />
                  {errors.dueDate && (
                    <FormError>
                      <Text>{errors.dueDate?.message}</Text>
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

        <ContainerList>
          <Table>
            <Thead>
              <tr>
                <td style={{ width: '20%' }}>Descrição:</td>
                <td style={{ width: '10%' }}>Vencimento:</td>
                <td style={{ width: '10%' }}>Valor:</td>
                <td style={{ width: '10%' }}>Pagamento:</td>
                <td style={{ width: '10%' }}>Forma:</td>
              </tr>
            </Thead>
            <TbodyResult>
              {Array.isArray(plansGenerate) &&
                plansGenerate.map((plansGenerate) => (
                  <tr key={plansGenerate?.Id}>
                    <td onClick={() => handleEdit(plansGenerate.id)}>
                      {plansGenerate.plan.name}
                    </td>
                    <td onClick={() => handleEdit(plansGenerate.id)}>
                      {plansGenerate.dueDate}
                    </td>

                    <td
                      onClick={() => handleEdit(plansGenerate.id)}
                      style={{
                        // width: '10%',
                        paddingLeft: '1rem',
                      }}
                    >
                      R$
                      {plansGenerate.planValue}
                    </td>

                    <td
                      onClick={() => handleEdit(plansGenerate.id)}
                      style={{ paddingLeft: '1rem' }}
                    >
                      {plansGenerate.financials[0]?.paymentDate}
                    </td>

                    <td
                      onClick={() => handleEdit(plansGenerate.id)}
                      style={{ paddingLeft: '1rem' }}
                    >
                      {plansGenerate.financials[0]?.paymentType}
                    </td>
                  </tr>
                ))}
            </TbodyResult>
          </Table>
        </ContainerList>
      </Form>
    </>
  )
}

export { StudentsPlansGenerate }
