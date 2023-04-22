import axios, { AxiosError } from 'axios'

export interface LoginParams {
  email: string
  password: string
}

export function login({ email, password }: LoginParams) {
  return axios
    .post('http://localhost:3333/authenticate', {
      email,
      password,
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
