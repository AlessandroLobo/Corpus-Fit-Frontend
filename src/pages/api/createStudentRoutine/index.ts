import axios, { AxiosError } from 'axios'

export interface ICreateStudentRoutine {
  name: string
  studentId: string
  routineId: string
}

interface ICreateStudentRoutineData {
  id: string
  name: string
  studentId: string
  routineId: string
}

interface ApiResponse {
  studentRoutines: ICreateStudentRoutineData[]
  // outras propriedades podem ser adicionadas se necessário
}

export function createStudentRoutine({
  name,
  studentId,
  routineId,
}: ICreateStudentRoutine): Promise<void> {
  return axios
    .post('http://localhost:3333/workout/createStudentRoutine', {
      name,
      studentId,
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
      throw error
    })
}

export const getAllStudentRoutines = async (id: any): Promise<ApiResponse> => {
  console.log('backend id', id)
  try {
    const response = await axios.get(
      'http://localhost:3333/workout/listStudentRoutine',
      {
        params: {
          id,
        },
      },
    )
    console.log('backend', response.data.studentRoutines)
    return { studentRoutines: response.data.studentRoutines }
  } catch (error) {
    return { studentRoutines: [] }
  }
}

// export const GetRoutine = (id: string) => {
//   // console.log('BackGetRoutine id:', id)
//   return axios
//     .get(`http://localhost:3333/workout/findRoutine/${id}`)
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
//       throw error
//     })
// }

// export function DeleteRoutine(id: string) {
//   console.log(id)
//   return axios
//     .delete(`http://localhost:3333/workout/deleteRoutine/${id}`)
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
