import { useEffect, useState } from 'react'
import { ModalInfo } from '../components/Modal/modalInfo'
import {
  Container,
  ContainerList,
  Form,
  Table,
  TbodyResult,
  Text,
  TextInput,
  TextInputContainer,
  Thead,
  ButtonCad,
  ButtonContainer,
  ButtonCadContainer,
  Line,
  TextInputFindContainer,
  TextInputSelectPagination,
  Button,
} from './styles'
import {
  ArrowClockwise,
  Barbell,
  CalendarPlus,
  Person,
  UserPlus,
} from '@phosphor-icons/react'
import { parseCookies } from 'nookies'
import { validateToken } from '../api/authService'
import { GetServerSidePropsContext } from 'next'
import { GetAllStudents } from '../api/getAllStudents/index.api'
import { StudentRegistration } from '../components/StudentsRegistration/index.page'
import Pagination from '../components/Pagination'
import { PlanRegistration } from '../components/PlanRegistration'
import { PlanGeneratePage } from '../planGeneratePage'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  expirationDate: string
}

interface StudentEditProps {
  studentId: string
  studentModalId: string
}
let LIMIT = 12

export default function Administration({ studentId }: StudentEditProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const [students, setStudents] = useState<Student[]>([])

  const [createStudent, setCreateStudent] = useState(false)

  const [editingStudent, setEditingStudent] = useState(false)

  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const [createPlan, setCreatePlan] = useState(false)

  const [totalResults, setTotalResults] = useState(0)

  const [currentPage] = useState(1)

  const [offset, setOffset] = useState(0)

  function handleLIMIT(e: any) {
    LIMIT = e.target.value
    if (e.target.value <= 0) {
      LIMIT = 12
    }
    setOffset(0)
    console.log('LIMIT', LIMIT)
    handleSearch()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleSearch()
  }, [offset])

  const handleSearch = async () => {
    const searchTerm =
      (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    if (offset < 0) {
      setOffset(1)
      console.log('offset menor que 0', offset)
    }
    const data = await GetAllStudents(searchTerm, searchTerm, LIMIT, offset)
    // console.log('offset Administration', offset)

    // Desestrutura os dados retornados por GetAllStudents
    const { students, total } = data

    // Define os estados de students e totalResults com os dados retornados
    setStudents(students)
    setTotalResults(total)
    console.log(students)
  }

  function handleStudentRegistration() {
    setCreateStudent(true)
    setEditingStudent(false)
    setCreatePlan(false)
    setModalOpen(true)
    // console.log('handleRegisterStudent')
  }

  function handlePlanRegistration() {
    setCreateStudent(false)
    setEditingStudent(false)
    setCreatePlan(true)
    setModalOpen(true)
  }

  function handleEdit(studentParansId: any) {
    setSelectedStudent(studentParansId)
    setEditingStudent(true)
    setModalOpen(true)
  }

  console.log(createPlan)
  return (
    <Container>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        {editingStudent ? (
          <PlanGeneratePage studentParansId={selectedStudent} />
        ) : createPlan ? (
          <PlanRegistration />
        ) : createStudent ? (
          <StudentRegistration />
        ) : null}
      </ModalInfo>

      <ButtonCadContainer>
        <ButtonContainer>
          <ButtonCad onClick={handleStudentRegistration}>
            <UserPlus size={50} />
            Cadastro de Alunos
          </ButtonCad>
          <ButtonCad>
            <Barbell size={50} />
            Cadastro de Treinos
          </ButtonCad>
          <ButtonCad>
            <Person size={50} />
            Cadastro de Exercícios
          </ButtonCad>
        </ButtonContainer>
        <Line />
        <ButtonContainer>
          <ButtonCad onClick={handlePlanRegistration}>
            <CalendarPlus size={50} />
            Cadastro de Planos
          </ButtonCad>
        </ButtonContainer>
      </ButtonCadContainer>

      <Form>
        <ContainerList>
          <TextInputContainer>
            <Text>Pesquise por Nome ou E-mail:</Text>
            <TextInputFindContainer>
              <TextInput
                onChange={handleSearch}
                id="search-input"
                placeholder="Digite o nome ou e-mail"
              />
              <TextInputSelectPagination
                onChange={handleLIMIT}
                defaultValue="12"
                placeholder="12"
              />
            </TextInputFindContainer>
          </TextInputContainer>
          <Button
            onClick={handleSearch}
            style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
          >
            Atualizar dados
            <ArrowClockwise size={18} />
          </Button>
          {students && students.length > 0 && (
            <Table>
              <Thead>
                <tr>
                  <td style={{ width: '40%' }}>NOME:</td>
                  <td style={{ width: '20%' }}>E-MAIL:</td>
                  <td style={{ width: '20%' }}>TELEFONE:</td>
                  <td style={{ width: '20%' }}>VENCIMENTO:</td>
                </tr>
              </Thead>
              <TbodyResult>
                {students
                  .slice((currentPage - 1) * LIMIT, currentPage * LIMIT)
                  .map((student) => (
                    <tr key={student.id}>
                      <td
                        onClick={() => handleEdit(student.id)}
                        style={{
                          width: '60%',
                          paddingLeft: '10px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {student.name}
                      </td>

                      <td
                        onClick={() => handleEdit(student.id)}
                        style={{
                          width: '20%',
                          paddingLeft: '20px',
                        }}
                      >
                        {student.email}
                      </td>

                      <td
                        onClick={() => handleEdit(student.id)}
                        style={{ width: '20%', paddingLeft: '10px' }}
                      >
                        {student.phone}
                      </td>

                      <td
                        onClick={() => handleEdit(student.id)}
                        style={{ width: '20%', paddingLeft: '10px' }}
                      >
                        {student.maxDueDate}
                      </td>
                    </tr>
                  ))}
              </TbodyResult>
            </Table>
          )}
          <Pagination
            limit={LIMIT}
            total={totalResults}
            offset={offset}
            setOffset={setOffset}
            handleSearch={handleSearch}
          />
        </ContainerList>
      </Form>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const token = cookies.CorpusFitToken

  const user = validateToken(token!)

  // console.log(user)

  if (!user || user.user !== 'admin@hotmail.com') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      someData: 'Some value',
    },
  }
}
