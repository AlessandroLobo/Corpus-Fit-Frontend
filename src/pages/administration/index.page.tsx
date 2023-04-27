import { useState } from 'react'
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
  Button,
  ButonCadContainer,
} from './styles'
import { Barbell, Person, UserPlus } from '@phosphor-icons/react'
import { StudentRegistration } from '../components/StudentRegistration/index.page'
import { parseCookies } from 'nookies'
import { validateToken } from '../api/authService'
import { GetServerSidePropsContext } from 'next'

async function handleSearch() {
  console.log('handelSearch')
}

export default function Administration() {
  const [modalOpen, setModalOpen] = useState(false)

  function handleStudentRegistration() {
    setModalOpen(true)
    console.log('handleRegisterStudent')
  }

  return (
    <Container>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        <StudentRegistration />
      </ModalInfo>
      <ButonCadContainer>
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
      </ButonCadContainer>
      <Form>
        <ContainerList>
          <TextInputContainer>
            <Text>Pesquise por Nome ou E-mail:</Text>
            <TextInput
              onChange={handleSearch}
              id="search-input"
              placeholder="Digite o nome ou e-mail"
            />
          </TextInputContainer>
          <Button
            onClick={handleSearch}
            style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
          >
            Buscar
          </Button>

          {/* {!!searchResults.length && ( */}
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
              {/* {searchResults.map((clients) => ( */}
              <tr>
                <td
                  // onClick={() => handleEdit(clients.id)}
                  style={{
                    width: '50%',
                    paddingLeft: '10px',
                    textTransform: 'uppercase',
                  }}
                >
                  {/* {clients.name} */}
                </td>
                <td
                  // onClick={() => handleEdit(clients.id)}
                  style={{ width: '20%' }}
                >
                  <input
                    type="text"
                    // value={phoneMask(clients.phoneNumber)}
                    onChange={(event) => {
                      // const maskedValue = cpfMask(event.target.value)
                      // Aqui você pode atualizar o valor no estado ou passar para outra função
                    }}
                  />
                </td>

                <td
                  // onClick={() => handleEdit(clients.id)}
                  style={{ width: '10%', paddingLeft: '10px' }}
                >
                  {/* {clients.email} */}
                </td>
                <td
                  // onClick={() => handleEdit(clients.id)}
                  style={{ width: '10%', paddingLeft: '10px' }}
                >
                  {/* {clients.email} */}
                </td>
              </tr>
            </TbodyResult>
          </Table>
        </ContainerList>
      </Form>
    </Container>
  )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const token = cookies.CorpusFitToken

  const user = validateToken(token!)

  console.log(user)

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
