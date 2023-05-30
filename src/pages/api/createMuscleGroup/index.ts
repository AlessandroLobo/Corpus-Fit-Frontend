import axios, { AxiosError } from 'axios'

export interface IcreateMuscleGroup {
  id?: string
  name: string
}

interface ApiResponse {
  muscleGroup: IcreateMuscleGroup[]
  // outras propriedades podem ser adicionadas se necessário
}

export interface UpdateParans {
  id: string
  name: string
}

export function CreateMuscleGroup({ name }: IcreateMuscleGroup) {
  return axios
    .post('http://localhost:3333/trainings/createMuscleGroup', {
      name,
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

export const GetAllMuscleGroup = async (name: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      'http://localhost:3333/trainings/findMuscleGroup',
      {
        params: {
          name,
        },
      },
    )
    return { muscleGroup: response.data.muscleGroup }
  } catch (error) {
    console.log(error)
    return { muscleGroup: [] }
  }
}

export function UpdateMuscleGroup({ id, name }: UpdateParans) {
  return axios
    .put('http://localhost:3333/trainings/updateMuscleGroup', {
      id,
      name,
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

export function DeleteMuscleGroup(id: string) {
  return axios
    .delete(`http://localhost:3333/trainings/deleteMuscleGroup/${id}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      if (error.response) {
        console.log(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      console.log(error.config)
      throw error
    })
}
