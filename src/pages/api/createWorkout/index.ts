import axios, { AxiosError, AxiosError, AxiosError } from 'axios'

export interface ICreateRoutine {
  id: string
  name: string
  workoutType?: string
  objective: string
  observation: string
  studentId: string | null
  startDate: Date | null
  endDate: Date | null
}

interface ApiResponse {
  workoutRoutines: ICreateRoutine[]
  // outras propriedades podem ser adicionadas se necessário
}

// export interface UpdateParansExercises {
//   id: string
//   name: string
//   description?: string
//   url?: string
//   muscleGroupId?: string
// }

export function CreateRoutine({
  id,
  name,
  workoutType,
  objective,
  observation,
  studentId,
  startDate,
  endDate,
}: ICreateRoutine) {
  return axios
    .post('http://localhost:3333/workout/createRoutine', {
      id,
      name,
      workoutType,
      objective,
      observation,
      studentId: null,
      startDate,
      endDate,
    })
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
      throw error // adicione essa linha para lançar o erro novamente
    })
}

export const GetAllRoutine = async (name: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      'http://localhost:3333/workout/listRoutine',
      {
        params: {
          name,
        },
      },
    )
    return { workoutRoutines: response.data.workoutRoutines }
  } catch (error) {
    console.log(error)
    return { workoutRoutines: [] }
  }
}

export const GetRoutine = (id: string) => {
  // console.log('BackGetRoutine id:', id)
  return axios
    .get(`http://localhost:3333/workout/findRoutine/${id}`)
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

export function DeleteRoutine(id: string) {
  console.log(id)
  return axios
    .delete(`http://localhost:3333/workout/deleteRoutine/${id}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      if (error.response) {
        const responseData = error.response.data as Record<string, any> // Realiza a verificação de tipo

        if (
          error.response.status === 400 &&
          responseData.error === 'P2003' &&
          responseData.meta?.field_name === 'routineId'
        ) {
          // Erro de chave estrangeira - Restrição falhou
          const errorMessage =
            'Erro ao excluir a rotina: a restrição de chave estrangeira falhou.'
          console.error(errorMessage)
          throw new Error(errorMessage)
        }

        // Outros erros de resposta da API
        console.log(responseData)
      } else if (error.request) {
        // Erro de requisição sem resposta da API
        console.log(error.request)
      } else {
        // Erro durante a configuração do Axios ou outros erros
        console.log('Error', error.message)
      }
      console.log(error.config)
      throw error
    })
}
