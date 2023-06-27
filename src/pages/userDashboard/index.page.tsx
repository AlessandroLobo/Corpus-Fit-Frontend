import { parseCookies } from 'nookies'
import { validateToken } from '../api/authService'
import { GetServerSidePropsContext } from 'next'
import { ButtonCadContainer, Container, Text, TextHeader } from './styles'
import { useCallback, useEffect, useState } from 'react'
import { FindStudent } from '../api/getAllStudents/index.api'
import { FindPlansGenerate } from '../api/createStudentPLans'
import dayjs from 'dayjs'

interface Props {
  email: string
  id: string
}

export interface IStudent {
  id: string
  name: string
  email: string
  phone: string
  status: boolean
  expirationDate: string
}

const UserDashboard = ({ email, id }: Props) => {
  const [student, setStudent] = useState<IStudent | null>(null)

  const [err, setError] = useState<string | null>(null)

  const [statusStudent, setStatusStudent] = useState<string>('')

  const [plansGenerate, setPlansGenerate] = useState('')

  const [maxDueDate, setMaxDueDate] = useState('')

  const [studentActive, setStudentActive] = useState('')

  const [studentActiveColor, setStudentActiveColor] = useState('')

  const handleSearch = useCallback(
    async (id: string) => {
      try {
        const studentData = await FindStudent({ studentParansId: id })
        setStudent(studentData)
        console.log('studentData', studentData)
      } catch (error) {
        if (typeof error === 'string') {
          setError(error)
        } else {
          setError('Ocorreu um erro desconhecido')
        }
      }
      if (student?.status === true) {
        setStatusStudent('Ativo')
      } else {
        setStatusStudent('Inativo')
      }
    },
    [student?.status],
  )

  useEffect(() => {
    handleSearch(id)
    FindPlansGenerateFunction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, handleSearch])

  function FindPlansGenerateFunction() {
    const fetchData = async () => {
      try {
        const data = await FindPlansGenerate({ studentParansId: id })

        console.log('plangenerate', data)

        setPlansGenerate(data.formattedStudentPlans)

        const maxDueDateFormat = dayjs(data.maxDueDate)
        const formattedMaxDueDate = maxDueDateFormat.isValid()
          ? maxDueDateFormat.format('DD/MM/YYYY')
          : 'Sem Plano'

        const dateNow = dayjs()
        const maxDueDateInput = dayjs(data.maxDueDate, 'DD/MM/YYYY')

        if (maxDueDateInput.diff(dateNow, 'day') > 0) {
          setMaxDueDate(formattedMaxDueDate)
          setStudentActive('Ativo')

          setStudentActiveColor('#00e7f9')
        } else {
          setMaxDueDate(formattedMaxDueDate)
          setStudentActive('Inativo')

          setStudentActiveColor('#FF0000')
        }
      } catch (error) {
        setError(err)
      }
    }

    if (id) {
      fetchData()
    }
  }

  return (
    <Container>
      <ButtonCadContainer>
        <TextHeader>Área do Aluno</TextHeader>
        <Text>Olá seja bem-vindo, {student?.name}!</Text>
        <Text>Seu status é: {studentActive}</Text>
        <Text>Data de vencimento do plano: {maxDueDate}</Text>
        {err && <p>Ocorreu um erro: {err}</p>}{' '}
        {/* Renderize a mensagem de erro se existir */}
      </ButtonCadContainer>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const token = cookies.CorpusFitToken

  const user = validateToken(token!)

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const email = user.user
  const id = user.id

  return {
    props: { email, id },
  }
}

export default UserDashboard
