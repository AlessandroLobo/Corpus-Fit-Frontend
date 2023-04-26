import { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

interface Plan {
  id: string
  name: string
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
