import axios, { AxiosError } from 'axios'

export interface ICreateRoutine {
  id: string
  name: string
  workoutType?: string
  objective: string
  observation: string
  studentId: string
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

export const GetAllRoutine = async (
  name: string,
  // muscleGroupId: string,
): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      'http://localhost:3333/workout/findRoutine',
      {
        params: {
          name,
          // muscleGroupId,
        },
      },
    )
    return { workoutRoutines: response.data.workoutRoutines }
  } catch (error) {
    console.log(error)
    return { workoutRoutines: [] }
  }
}

// export function UpdateExercises({
//   id,
//   name,
//   description,
//   url,
//   muscleGroupId,
// }: UpdateParansExercises) {
//   return axios
//     .put('http://localhost:3333/trainings/updateExercise', {
//       id,
//       name,
//       description,
//       url,
//       muscleGroupId,
//     })
//     .then((response) => response.data)
//     .catch((error: AxiosError) => {
//       if (error.response) {
//         // O servidor respondeu com um status diferente de 2xx
//         console.log(error.response.data)
//       } else if (error.request) {
//         // A requisição foi feita, mas não houve resposta
//         console.log(error.request)
//       } else {
//         // Algum erro ocorreu durante a requisição
//         console.log('Error', error.message)
//       }
//       console.log(error.config)
//       throw error // adicione essa linha para lançar o erro novamente
//     })
// }

// export function DeleteExercise(id: string) {
//   console.log(id)
//   return axios
//     .delete(`http://localhost:3333/trainings/deleteExercise/${id}`)
//     .then((response) => response.data)
//     .catch((error: AxiosError) => {
//       if (error.response) {
//         console.log(error.response.data)
//       } else if (error.request) {
//         console.log(error.request)
//       } else {
//         console.log('Error', error.message)
//       }
//       console.log(error.config)
//       throw error
//     })
// }
