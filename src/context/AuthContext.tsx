import axios from 'axios'
import Router from 'next/router'
import { parseCookies, setCookie } from 'nookies'
// import { parseCookies, setCookie } from 'nookies'
import React, { createContext, useState, useEffect } from 'react'

type User = {
  name: string
  email: string
  id: string
}

type AuthProviderProps = {
  children: React.ReactNode
}

export interface LoginParams {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: (params: LoginParams) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const cookies = parseCookies()

  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  const token = cookies.CorpusFitToken
  // console.log(token)

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get('http://localhost:3333/users/find', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // console.log('usuario logado', response.data) // ou qualquer outra lógica a ser executada com a resposta do servidor
        setUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [token])

  async function signIn({ email, password }: LoginParams) {
    // console.log('Enviando dados de login:', email, password)
    try {
      const response = await axios.post('http://localhost:3333/authenticate', {
        email,
        password,
      })

      const token = response.data
      // console.log('email recebido:', email)
      await SaveCookies(token)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // O servidor respondeu com um status diferente de 2xx
          console.log(error.response.data)
          // console.log(error.response.status)
          // console.log(error.response.headers)
        } else if (error.request) {
          // A requisição foi feita, mas não houve resposta
          console.log(error.request)
        } else {
          // Algum erro ocorreu durante a requisição
          console.log('Error', error.message)
        }
        console.log(error.config)
        throw error
      } else {
        throw error
      }
    }
  }

  async function SaveCookies(token: string) {
    // Salva o token como cookie seguro no lado do cliente.
    setCookie(null, 'CorpusFitToken', token, {
      maxAge: 30 * 24 * 60 * 60, // 30 dias
      path: '/', // caminho do cookie (geralmente é '/')
      secure: true, // define se o cookie deve ser enviado apenas em conexões HTTPS
    })
    setUser(user)
    Router.push('/userDashboard')
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
