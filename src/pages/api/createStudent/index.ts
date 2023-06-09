import axios, { AxiosError } from 'axios'

export interface LoginParams {
  name: string
  email: string
  cpf: string
  status: boolean
  // planId: string
  password: string
  birthDate: string
  weight: string
  gender: string
  phone: string
  CEP: string
  city: string
  address: string
  number: string
  state: string
}

export interface UpdateParams {
  id: string
  name: string
  email: string
  cpf: string
  status: boolean
  // planId: string
  password: string
  birthDate: string
  weight: string
  gender: string
  phone: string
  CEP: string
  city: string
  address: string
  number: string
  state: string
}

export function createStudent({
  name,
  email,
  cpf,
  status,
  // planId,
  password,
  birthDate,
  weight,
  gender,
  phone,
  CEP,
  city,
  address,
  number,
  state,
}: LoginParams) {
  console.log(name)
  return axios
    .post('http://localhost:3333/students/', {
      name,
      email,
      cpf,
      status,
      // planId,
      password,
      birthDate,
      weight,
      gender,
      phone,
      CEP,
      city,
      address,
      number,
      state,
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

export function updateStudent({
  id,
  name,
  email,
  status,
  cpf,
  // planId,
  password,
  birthDate,
  weight,
  gender,
  phone,
  CEP,
  city,
  address,
  number,
  state,
}: UpdateParams) {
  return axios
    .put('http://localhost:3333/student/update', {
      id,
      name,
      email,
      status,
      cpf,
      // planId,
      password,
      birthDate,
      weight,
      gender,
      phone,
      CEP,
      city,
      address,
      number,
      state,
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

export function deleteStudent(id: string) {
  return axios
    .delete(`http://localhost:3333/student/delete/${id}`)
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
