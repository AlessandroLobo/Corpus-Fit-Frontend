import { TextInput } from '@ignite-ui/react'
import { Form, FormData, FormError, Text, TextInputContainer } from './styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { FindStudent } from '@/pages/api/getAllStudents/index.api'
import { getAddress } from '@/utils/getAddress'
import { usePlans } from '@/pages/api/plans/index.api'

interface StudentEditProps {
  studentParansId: string
}

interface Data {
  id: string
  name: string
}
const registerFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const StudentsPlansGenerate = ({ studentParansId }: StudentEditProps) => {
  const [student, setStudent] = useState<Data | null>(null)

  const [err, setError] = useState('')

  const { plans, loading } = usePlans()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await FindStudent({
          studentParansId,
        })
        const addressInfo = await getAddress(studentData.CEP)

        if (!addressInfo) {
          setError('Invalid Zip Code')
          return
        }

        setStudent(studentData)

        // const planName = studentData.Plan.name

        // planNameRef.current = planName
      } catch (error) {
        setError(err)
      }
    }
    fetchData()
  }, [studentParansId, err])

  const {
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  if (!student) {
    return <Form>Carregando dados...</Form>
  }

  if (loading) {
    return <Form>Carregando planos...</Form>
  }

  return (
    <Form as="form">
      {' '}
      <FormData>
        <TextInputContainer>
          <Text>Nome:</Text>
          <TextInput
            {...register('name', {
              required: true,
            })}
            defaultValue={student?.name || ''}
            placeholder="Digite seu nome completo"
            style={{ width: '70%' }}
            onBlur={(event) =>
              (event.target.value = event.target.value.toUpperCase())
            }
          />
          {/* {errors.name && ( */}
          <FormError>{/* <Text>{errors.name?.message}</Text> */}</FormError>
          {/* )} */}
        </TextInputContainer>
      </FormData>
    </Form>
  )
}

export { StudentsPlansGenerate }
