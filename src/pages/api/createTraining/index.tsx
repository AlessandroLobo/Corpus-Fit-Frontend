import axios, { AxiosError } from 'axios'

export interface ICreateTrainingSheet {
  id?: string
  name: string
  workoutType?: string
  routineId: string
}

interface ApiResponse {
  trainingSheets: ICreateTrainingSheet[]
  // outras propriedades podem ser adicionadas se necessário
}

export function CreateTrainingSheet({
  name,
  workoutType,
  routineId,
}: ICreateTrainingSheet) {
  return axios
    .post('http://localhost:3333/workout/createTrainingSheet', {
      name,
      workoutType,
      routineId,
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

export const GetAllTrainingSheet = async (id: any): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      'http://localhost:3333/workout/listTrainingSheet',
      {
        params: {
          id,
        },
      },
    )
    return { trainingSheets: response.data.trainingSheets }
  } catch (error) {
    console.log(error)
    return { trainingSheets: [] }
  }
}
