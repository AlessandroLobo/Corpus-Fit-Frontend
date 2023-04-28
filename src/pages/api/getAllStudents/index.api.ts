import axios from 'axios'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  expirationDate: string
}

export const getAllStudents = async (
  name: string,
  email: string,
): Promise<Student[]> => {
  const response = await axios.get('http://localhost:3333/users/listStudents', {
    params: {
      name,
      email,
    },
  })
  return response.data
}
