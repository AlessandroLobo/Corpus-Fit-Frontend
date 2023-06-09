import axios, { AxiosError } from 'axios'

export interface ICreateStudentPLanParans {
  planId: string
  studentId: string
  planValue: number
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

export const FindUniquePlans = ({
  plansGenerateId,
}: {
  plansGenerateId: string
}) => {
  console.log('Valor de plansGenerateId:', plansGenerateId)
  return axios
    .get(
      `http://localhost:3333/installments/findUniqueStudentPlan/${plansGenerateId}`,
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

export function DeletePlansGenerate(id: string) {
  return axios
    .delete(`http://localhost:3333/installments/deleteStudentPlan/${id}`)
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
