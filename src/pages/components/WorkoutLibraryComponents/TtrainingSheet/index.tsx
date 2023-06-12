import { z } from 'zod'
import {
  Container,
  Form,
  FormError,
  Text,
  TextInput,
  TextInputContainer,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface IRoutineData {
  // Defina aqui o formato dos dados de retorno da API
  name: string
  objective: string
  workioutType: string
}

interface TrainingSheetProps {
  routineData: IRoutineData
}

const registerFormSchema = z.object({
  tipo: z.string(),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function TrainingSheet(props: TrainingSheetProps) {
  const {
    register,
    // reset,
    // handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })
  console.log(props.routineData)

  return (
    <Container>
      <Form as="form">
        <TextInputContainer>
          <Text>Tipo:</Text>
          <TextInput
            {...register('tipo', {
              required: true,
            })}
            placeholder="Digite seu nome completo"
            style={{ width: '100%' }}
            onBlur={(event) =>
              (event.target.value = event.target.value.toUpperCase())
            }
          />
          {errors.name && (
            <FormError>
              <Text>{errors.name?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>
        <TextInputContainer>
          <Text>Nome:</Text>
          <TextInput
            {...register('name', {
              required: true,
            })}
            placeholder="Digite seu nome completo"
            style={{ width: '100%' }}
            onBlur={(event) =>
              (event.target.value = event.target.value.toUpperCase())
            }
          />
          {errors.name && (
            <FormError>
              <Text>{errors.name?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>
      </Form>
    </Container>
  )
}
