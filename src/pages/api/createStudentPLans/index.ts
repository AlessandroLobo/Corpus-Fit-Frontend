import axios, { AxiosError } from 'axios'

export interface ICreateStudentPLanParans {
  planId: string
  studentId: string
  planValue: number
}

interface IStudentPlan {
  id: string
}

export function CreateStudentPlans({
  planId,
  studentId,
  planValue,
}: ICreateStudentPLanParans) {
  return axios
    .post('http://localhost:3333/installments/createStudentPlan', {
      planId,
      studentId,
      planValue,
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

export const FindPlansGenerate = ({
  studentParansId,
}: {
  studentParansId: string
}) => {
  console.log('Valor de studentParansId:', studentParansId)
  return axios
    .get(
      `http://localhost:3333/installments/findStudentPlan/${studentParansId}`,
    )
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
