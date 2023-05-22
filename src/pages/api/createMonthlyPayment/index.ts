import axios, { AxiosError } from 'axios'

export interface IMonthlyCreateParans {
  studentId: string
  paymentType: string
  paymentValue: number
  studentPlanId: string
}

export function createMonthlyPayment({
  studentId,
  paymentType,
  paymentValue,
  studentPlanId,
}: IMonthlyCreateParans) {
  return axios
    .post('http://localhost:3333/financial/createMonthlyPayment', {
      studentId,
      paymentType,
      paymentValue,
      studentPlanId,
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

export function deleteMonthlyPayment(id: string) {
  return axios
    .delete(`http://localhost:3333/financial/deleteMonthlyPayment/${id}`)
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
