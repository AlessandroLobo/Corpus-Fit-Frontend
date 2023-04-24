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

async function handleSearch() {
  console.log('handelSearch')
}

export default function Administration() {
  return (
    <Container>
      <ButonCadContainer>
        <ButtonCad>
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
              </tr>
            </TbodyResult>
          </Table>
        </ContainerList>
      </Form>
    </Container>
  )
}
