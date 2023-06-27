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
  TextInputFindContainer,
  TextInputSelectPagination,
  FormHeader,
  TextContainerBack,
  TextBack,
} from './styles'
import { CaretLeft } from '@phosphor-icons/react'
import { GetAllStudents } from '@/pages/api/getAllStudents/index.api'
import Pagination from '../../Pagination'
import { TrainingInference } from '../TrainingInference'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  expirationDate: string
  maxDueDate: string
}

// interface StudentEditProps {
//   studentId: string
//   studentModalId: string
// }
let LIMIT = 12

export default function StudentSearchTrainingInference() {
  // const [modalOpen, setModalOpen] = useState(false)

  const [students, setStudents] = useState<Student[]>([])

  const [selectForm, setSelectForm] = useState(true)

  // const [createStudent, setCreateStudent] = useState(false)

  // const [editingStudent, setEditingStudent] = useState(false)

  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // const [createPlan, setCreatePlan] = useState(false)

  // const [createMuscleGroup, setCreateMuscleGroup] = useState(false)

  // const [createExercisesRegistration, setExercisesRegistration] =
  useState(false)

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

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  const handleSearch = async () => {
    const searchTerm =
      (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    if (offset < 0) {
      setOffset(1)
    }
    const data = await GetAllStudents(searchTerm, searchTerm, LIMIT, offset)

    // Desestrutura os dados retornados por GetAllStudents
    const { students, total } = data

    // Define os estados de students e totalResults com os dados retornados
    setStudents(students as Student[])
    setTotalResults(total)
  }

  function handleEdit(studentParansId: any) {
    setSelectForm(false)
    console.log('studentParansId', studentParansId)
    setSelectedStudent(studentParansId)
    // setSelectedStudent(studentParansId)
    // setEditingStudent(true)
    // setModalOpen(true)
  }
  function handleBack(studentParansId: any) {
    setSelectForm(true)
  }

  return (
    <Container>
      <FormHeader>
        {selectForm ? (
          <div>Escolha o aluno para inferir o treino:</div>
        ) : (
          <div>Escolha a rotina para inferir ao aluno:</div>
        )}

        {!selectForm ? (
          <TextContainerBack>
            <CaretLeft size={20} />
            <TextBack onClick={handleBack}>Voltar</TextBack>
          </TextContainerBack>
        ) : null}
      </FormHeader>
      {selectForm ? (
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

            {students && students.length > 0 && (
              <Table>
                <Thead>
                  <tr>
                    <td style={{ width: '40%' }}>NOME:</td>
                    <td style={{ width: '20%' }}>E-MAIL:</td>
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
      ) : (
        <TrainingInference studentParansId={selectedStudent} />
      )}
    </Container>
  )
}
