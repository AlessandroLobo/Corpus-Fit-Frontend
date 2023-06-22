import axios, { AxiosError } from 'axios'

export interface IStudent {
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
  console.log('studentParansId enviando backend', studentParansId)
  return axios
    .get(`http://localhost:3333/students/findStudent/${studentParansId}`)
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
  limit: number,
  offset: number,
): Promise<{ students: IStudent[]; total: number; maxDueDate: string }> => {
  try {
    const response = await axios.get(
      'http://localhost:3333/students/listStudents',
      {
        params: {
          name,
          email,
          limit,
          offset,
        },
      },
    )
    return {
      students: response.data.users,
      total: response.data.total,
      maxDueDate: response.data.maxDueDate,
    }
  } catch (error) {
    console.log(error)
    return { students: [], total: 0, maxDueDate: '' }
  }
}
