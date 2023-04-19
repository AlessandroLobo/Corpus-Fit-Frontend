import axios from 'axios'

interface LoginParams {
  username: string
  password: string
}

export function login({ username, password }: LoginParams) {
  return axios.post('/api/login', {
    username,
    password,
  })
}
