import { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

export interface CreateParans {
  name: string
  duration: number
  price: number
}
interface Plan {
  id: string
  name: string
  duration: number
  price: number
}

interface ApiResponse {
  plans: Plan[]
  // outras propriedades podem ser adicionadas se necessário
}

export function createPlans({ name, duration, price }: CreateParans) {
  return axios
    .post('http://localhost:3333/plans/createPlans/', {
      name,
      duration,
      price,
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

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    axios
      .get('http://localhost:3333/plans/listPlans', {
        params: {
          _select: 'id,name', // seleciona apenas o id e o name dos planos
        },
      })
      .then((response: AxiosResponse) => {
        setPlans(response.data)
        setLoading(false)
      })
      .catch((error: AxiosError) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return { plans, loading }
}

export const GetAllPlans = async (name: string): Promise<ApiResponse> => {
  console.log('Name na api', name)
  try {
    const response = await axios.get<ApiResponse>(
      'http://localhost:3333/plans/findPlan',
      {
        params: {
          name,
        },
      },
    )

    return { plans: response.data.plans }
  } catch (error) {
    console.log(error)
    return { plans: [] }
  }
}
