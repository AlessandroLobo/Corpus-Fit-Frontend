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
import {
  DeletePlansGenerate,
  FindUniquePlans,
} from '@/pages/api/createStudentPLans'
import { usePaymentMethod } from '@/utils/usePaymentMethod'
import {
  IMonthlyCreateParans,
  createMonthlyPayment,
  deleteMonthlyPayment,
} from '@/pages/api/createMonthlyPayment'
import { ArrowUUpLeft, CurrencyDollar, Trash } from '@phosphor-icons/react'

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

  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const [isOpenRefund, setIsOpenRefund] = useState(false)

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [buttonDeleteDisabled, setButtonDeleteDisabled] = useState(true)

  const [inputSelect, setInputSelect] = useState(false)

  const [refundDelete, setRefundDelete] = useState(false)

  const [registerError, setRegisterError] = useState<string | null>(null)

  const [selectedValue, setSelectedValue] = useState('')

  const paymentMethod: PaymentMethod[] = usePaymentMethod()

  // console.log('Planid enviando parametro', plansGenerate)
  function FindUniquePlansFunction() {
    const fetchData = async () => {
      try {
        const data = await FindUniquePlans({
          plansGenerateId,
        })

        console.log(data.id)

        const financials = data.financials
        console.log(data.financials)

        if (financials.length > 0) {
          console.log('entrou no if')
          setButtonDeleteDisabled(true)
          setRefundDelete(false)
          setInputSelect(true)
        } else {
          setRefundDelete(true)
        }

        setPlansGenerate(data)
      } catch (error) {
        setError(err)
      }
    }

    if (plansGenerateId) {
      fetchData()
    }
  }

  useEffect(() => {
    console.log('teste useEffect')
    FindUniquePlansFunction()
  }, [isOpenRefund, isOpenDelete, isOpen, refundDelete])

  function handleSelectOption(event: React.ChangeEvent<HTMLSelectElement>) {
    setButtonDisabled(true)
    setSelectedValue(event.target.value)
  }

  async function handleRegister() {
    try {
      const params: IMonthlyCreateParans = {
        studentId: studentSelect.id,
        paymentType: selectedValue,
        paymentValue: plansGenerate.planValue,
        studentPlanId: plansGenerate.id,
      }
      await createMonthlyPayment(params)
      setIsOpen(true)
      setButtonDisabled(false)
    } catch (err: any) {
      console.log(err)
      setError('Something went wrong')
    }
  }

  async function handleDelete() {
    try {
      await DeletePlansGenerate(plansGenerate.id)
      setButtonDeleteDisabled(false)
      setPlansGenerate({
        id: '',
        dueDate: '',
        planValue: 0,
        financials: [],
      })
      setInputSelect(true)
      // setTextModal('Aluno deletado com sucesso!')
    } catch (err: any) {
      // handle errors...
    }
  }

  async function handleRefund() {
    try {
      await deleteMonthlyPayment(plansGenerate.financials[0].id)
      setRefundDelete(true)
      setInputSelect(false)
      // setTextModal('Aluno deletado com sucesso!')
    } catch (err: any) {
      // handle errors...
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
      {isOpenDelete && (
        <OverlayAlert>
          <ContainerAlert>
            <ContainerModalAlert>
              <TextAlert>
                <h2>Deseja excluir esse pagamento?</h2>
              </TextAlert>
              <ButtonContainerAlert>
                <ButtonAlert
                  onClick={() => {
                    handleDelete()
                    setIsOpenDelete(false)
                  }}
                >
                  Deletar
                </ButtonAlert>
                <ButtonAlert
                  onClick={() => {
                    setIsOpenDelete(false)
                  }}
                >
                  Cancelar
                </ButtonAlert>
              </ButtonContainerAlert>
            </ContainerModalAlert>
          </ContainerAlert>
        </OverlayAlert>
      )}
      {isOpenRefund && (
        <OverlayAlert>
          <ContainerAlert>
            <ContainerModalAlert>
              <TextAlert>
                <h2>Deseja estornar esse pagamento?</h2>
              </TextAlert>
              <ButtonContainerAlert>
                <ButtonAlert
                  onClick={() => {
                    handleRefund()
                    setIsOpenRefund(false)
                  }}
                >
                  Estornar
                </ButtonAlert>
                <ButtonAlert
                  onClick={() => {
                    setIsOpenRefund(false)
                  }}
                >
                  Cancelar
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
            value={studentSelect.name || ''}
            placeholder="Digite seu nome completo"
            style={{ width: '100%' }}
            onBlur={(event) =>
              (event.target.value = event.target.value.toUpperCase())
            }
          />
          <Text>Forma de pagamento:</Text>
          <Select
            disabled={inputSelect}
            style={{ width: '100%' }}
            onChange={handleSelectOption}
          >
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
          {refundDelete ? (
            <ButtonAlert
              disabled={!buttonDeleteDisabled}
              type="button"
              onClick={() => {
                setIsOpenDelete(true)
              }}
            >
              Deletar Plano
              <Trash />
            </ButtonAlert>
          ) : (
            <ButtonAlert
              disabled={!buttonDeleteDisabled}
              type="button"
              onClick={() => {
                setIsOpenRefund(true)
              }}
            >
              Estornar Pagamento
              <ArrowUUpLeft />
            </ButtonAlert>
          )}
        </ButtonContainerAlert>
      </Container>
    </>
  )
}
