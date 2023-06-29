import axios, { AxiosError } from 'axios'

export const GetStudentRoutine = (id: string) => {
  // console.log('BackGetRoutine id:', id)
  return axios
    .get(`http://localhost:3333/workout/findStudentRoutineByUser/${id}`)
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
