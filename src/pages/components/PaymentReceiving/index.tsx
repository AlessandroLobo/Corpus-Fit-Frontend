import { useEffect, useState } from 'react'
import {
  Container,
  ContainerList,
  Form,
  Table,
  TbodyResult,
  Text,
  TextInput,
  Thead,
} from './styles'
import { FindUniquePlans } from '@/pages/api/createStudentPLans'

interface PaymentReceivingProps {
  plansGenerateId: any
  studentSelect: any
}

export const PaymentReceiving = ({
  plansGenerateId,
  studentSelect,
}: PaymentReceivingProps) => {
  const [err, setError] = useState('')

  const [plansGenerate, setPlansGenerate] = useState([])
  console.log('Planide enviando parametro', plansGenerateId)
  console.log('Aluno', studentSelect)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FindUniquePlans({
          plansGenerateId,
        })

        // const { planGenerate } = data

        setPlansGenerate(data)
        console.log('PlanGenerate', data)
      } catch (error) {
        setError(err)
      }
    }

    if (plansGenerateId) {
      fetchData()
    }
  }, [err, plansGenerateId])
  // console.log(studentSelect)
  return (
    <Container>
      <Form>
        <Text>Nome:</Text>
        <TextInput
          // {...register('name', {
          //   required: true,
          // })}
          defaultValue={studentSelect.name || ''}
          placeholder="Digite seu nome completo"
          style={{ width: '100%' }}
          onBlur={(event) =>
            (event.target.value = event.target.value.toUpperCase())
          }
        />
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
                <td>{plansGenerate.dueDate}</td>

                <td
                  style={{
                    width: '10%',
                    paddingLeft: '1rem',
                  }}
                >
                  R$
                  {plansGenerate.planValue}
                </td>

                <td
                  // onClick={() => handleEdit(plan.id)}
                  style={{ width: '10%', paddingLeft: '1rem' }}
                >
                  {plansGenerate.paymentDate}
                </td>

                <td
                  // onClick={() => handleEdit(plan.id)}
                  style={{ width: '10%', paddingLeft: '1rem' }}
                >
                  {/* {plansGenerate.createdAt} */}
                </td>
              </tr>
            </TbodyResult>
          </Table>
        </ContainerList>
      </Form>
    </Container>
  )
}
