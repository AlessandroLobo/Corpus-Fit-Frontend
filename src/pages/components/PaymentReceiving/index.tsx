import React, { useEffect, useState } from 'react'
import {
  ButtonAlert,
  ButtonContainerAlert,
  Container,
  ContainerAlert,
  ContainerList,
  ContainerModalAlert,
  Form,
  Option,
  OverlayAlert,
  Select,
  Table,
  TbodyResult,
  Text,
  TextAlert,
  TextInput,
  Thead,
} from './styles'
import { FindUniquePlans } from '@/pages/api/createStudentPLans'
import { usePaymentMethod } from '@/utils/usePaymentMethod'
import {
  IMonthlyCreateParans,
  createMonthlyPayment,
} from '@/pages/api/createMonthlyPayment'
import { CurrencyDollar, Trash } from '@phosphor-icons/react'

interface PaymentReceivingProps {
  plansGenerateId: any
  studentSelect: any
}

interface PaymentMethod {
  id: number
  value: string
  label: string
}

interface IPlan {
  id: string
  dueDate: string
  planValue: number
  financials?: any[] | undefined
}

export const PaymentReceiving = ({
  plansGenerateId,
  studentSelect,
}: PaymentReceivingProps) => {
  const [err, setError] = useState('')

  const [plansGenerate, setPlansGenerate] = useState<IPlan>({
    id: '',
    dueDate: '',
    planValue: 0,
    financials: [],
  })

  const [isOpen, setIsOpen] = useState(false)

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [registerError, setRegisterError] = useState<string | null>(null)

  const [selectedValue, setSelectedValue] = useState('')

  const paymentMethod: PaymentMethod[] = usePaymentMethod()

  console.log('Planid enviando parametro', plansGenerate)
  // console.log('Aluno', studentSelect)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FindUniquePlans({
          plansGenerateId,
        })

        // const { planGenerate } = data

        setPlansGenerate(data)
      } catch (error) {
        setError(err)
      }
    }

    if (plansGenerateId) {
      fetchData()
    }
  }, [err, plansGenerateId])
  // console.log(studentSelect)

  function handleSelectOption(event: React.ChangeEvent<HTMLSelectElement>) {
    setButtonDisabled(true)
    setSelectedValue(event.target.value)
  }

  async function handleRegister() {
    console.log(selectedValue)
    try {
      const params: IMonthlyCreateParans = {
        studentId: studentSelect.id,
        paymentType: selectedValue,
        paymentValue: plansGenerate.planValue,
        studentPlanId: plansGenerate.id,
      }
      await createMonthlyPayment(params)
      setIsOpen(true)
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
                <h2>Pagamento Efetuado com sucesso</h2>
              </TextAlert>
              <ButtonContainerAlert>
                <ButtonAlert
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  Ok
                </ButtonAlert>
              </ButtonContainerAlert>
            </ContainerModalAlert>
          </ContainerAlert>
        </OverlayAlert>
      )}
      <Container>
        <Form>
          <Text>Nome:</Text>
          <TextInput
            defaultValue={studentSelect.name || ''}
            placeholder="Digite seu nome completo"
            style={{ width: '100%' }}
            onBlur={(event) =>
              (event.target.value = event.target.value.toUpperCase())
            }
          />
          <Text>Forma de pagamento:</Text>
          <Select style={{ width: '100%' }} onChange={handleSelectOption}>
            {paymentMethod.map((paymentMethod) => (
              <Option key={paymentMethod.id} value={paymentMethod.value}>
                {paymentMethod.label}
              </Option>
            ))}
          </Select>
          <ContainerList>
            <Table>
              <Thead>
                <tr>
                  <td style={{ width: '10%' }}>Vencimento:</td>
                  <td style={{ width: '10%' }}>Valor:</td>
                  <td style={{ width: '10%' }}>Pagamento:</td>
                  <td style={{ width: '10%' }}>Forma:</td>
                </tr>
              </Thead>
              <TbodyResult>
                <tr>
                  <td>{plansGenerate && plansGenerate.dueDate}</td>

                  <td
                    style={{
                      width: '10%',
                      paddingLeft: '1rem',
                    }}
                  >
                    R$
                    {plansGenerate && plansGenerate.planValue}
                  </td>

                  <td style={{ width: '10%', paddingLeft: '1rem' }}>
                    {plansGenerate.financials &&
                      plansGenerate.financials.length > 0 &&
                      plansGenerate.financials[0].paymentDate}
                  </td>

                  <td style={{ width: '10%', paddingLeft: '1rem' }}>
                    {plansGenerate.financials &&
                      plansGenerate.financials.length > 0 &&
                      plansGenerate.financials[0].paymentType}
                  </td>
                </tr>
              </TbodyResult>
            </Table>
          </ContainerList>
        </Form>
        <ButtonContainerAlert>
          <ButtonAlert
            disabled={!buttonDisabled}
            type="button"
            onClick={() => {
              handleRegister()
            }}
          >
            Efetuar pagamento
            <CurrencyDollar />
          </ButtonAlert>
          <ButtonAlert
            disabled={!buttonDisabled}
            type="button"
            onClick={() => {
              handleRegister()
            }}
          >
            Excluir Pagamento
            <Trash />
          </ButtonAlert>
        </ButtonContainerAlert>
      </Container>
    </>
  )
}
