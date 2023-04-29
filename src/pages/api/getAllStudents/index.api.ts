import axios, { AxiosError } from 'axios'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  expirationDate: string
}

export const FindStudent = ({
  studentParansId,
}: {
  studentParansId: string
}) => {
  console.log('FindStudent api', studentParansId)
  return axios
    .get(`http://localhost:3333/users/findUser/${studentParansId}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      if (error.response) {
        // O servidor respondeu com um status diferente de 2xx
        console.log(error.response.data)
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.log(error.request)
      } else {
        // Algum erro ocorreu durante a requisição
        console.log('Error', error.message)
      }
      console.log(error.config)
      throw error
    })
}

export const GetAllStudents = async (
  name: string,
  email: string,
): Promise<Student[]> => {
  const response = await axios.get('http://localhost:3333/users/listStudents', {
    params: {
      name,
      email,
    },
  })
  return response.data
}
