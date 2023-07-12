import axios, { AxiosError } from 'axios'

export interface ICreateExercise {
  url?: string
}

export interface ICreateTrainings {
  id: string
  name?: string
  muscleGroupId?: string
  exerciseId?: string
  trainingSheetId?: string
  duration?: number
  repetitions?: number
  sets?: number
  restTimeSeconds?: number
  weight?: number
  exercise?: ICreateExercise // Alteração na tipagem aqui
}
export interface ICreateTrainingSheet {
  id?: string
  name: string
  workoutType?: string
  duration?: number
  routineId: string
  Training?: ICreateTrainings[]
}

interface ApiResponse {
  trainingSheets: ICreateTrainingSheet[]
  // outras propriedades podem ser adicionadas se necessário
}
interface ApiResponseTraining {
  trainings: ICreateTrainings[]
  // outras propriedades podem ser adicionadas se necessário
}

export function CreateTrainingSheet({
  name,
  workoutType,
  duration,
  routineId,
}: ICreateTrainingSheet) {
  return axios
    .post('http://localhost:3333/workout/createTrainingSheet', {
      name,
      workoutType,
      duration,
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

export function CreateTrainings({
  name,
  muscleGroupId,
  exerciseId,
  trainingSheetId,
  repetitions,
  restTimeSeconds,
  weight,
}: ICreateTrainings) {
  return axios
    .post('http://localhost:3333/workout/createTrainings', {
      name,
      muscleGroupId,
      exerciseId,
      trainingSheetId,
      repetitions,
      restTimeSeconds,
      weight,
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
  console.log('id api', id)
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

export const GetAllTraining = async (id: any): Promise<ApiResponseTraining> => {
  try {
    const response = await axios.get(
      'http://localhost:3333/workout/listTrainings',
      {
        params: {
          id,
        },
      },
    )
    return { trainings: response.data.trainings }
  } catch (error) {
    console.log(error)
    return { trainings: [] }
  }
}

export function UpdateTraining({
  id,
  sets,
  repetitions,
  restTimeSeconds,
  weight,
}: ICreateTrainings) {
  return axios
    .put('http://localhost:3333/workout/updateTrainings', {
      id,
      sets,
      repetitions,
      restTimeSeconds,
      weight,
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

export function DeleteTraining(id: string) {
  console.log(id)
  return axios
    .delete(`http://localhost:3333/workout/deleteTrainings/${id}`)
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

export function DeleteTrainingSheet(id: string) {
  console.log(id)
  return axios
    .delete(`http://localhost:3333/workout/deleteTrainingSheet/${id}`)
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
