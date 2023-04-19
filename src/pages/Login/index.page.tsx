import { Heading, Text, Button, TextInput } from '@ignite-ui/react'
import {
  ButtonContainer,
  Container,
  Form,
  FormError,
  Header,
  Line,
  LogimMenssage,
  ShowPasswordButton,
} from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '../../../public/images/LOGO CORPUSFIT-2.png'

// const params: LoginParams = {
//   username: values.email,
//   password: values.password,
// }

const claimUserNameFormshema = z.object({
  email: z
    .string()
    .email('Por favor, insira um endereço de e-mail válido.')
    .min(5, 'O endereço de e-mail deve ter pelo menos 5 caracteres.'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .max(50, 'A senha não pode ultrapassar 50 caracteres.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    ),
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormshema>

function Login() {
  // const session = useSession()

  const [error, setError] = useState<string | null>(null)

  const [loginError, setLoginError] = useState<string | null>(null)

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormshema),
  })

  async function onSubmit(values: any) {
    try {
      console.log('Email:', values.email)
      console.log('Password:', values.password)

      const params: LoginParams = {
        username: values.email,
        password: values.password,
      }
      const response = await login(params)
      console.log('Response:', response)
    } catch (error) {
      console.log('Error:', error)
    }
  }
  return (
    <>
      <Container>
        <Header>
          <Heading as="strong">Faça login na sua conta</Heading>
        </Header>
        <Form as="form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <Text size="sm">Email address</Text>
            <TextInput placeholder="Enter your Email" {...register('email')} />
            <FormError>
              <Text>{errors.email ? errors.email?.message : ''}</Text>
            </FormError>
          </label>
          <label>
            <Text size="sm">Password</Text>
            <TextInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              autoComplete="new-password"
            />
            <FormError>
              <Text>
                {errors.password ? errors.password?.message : ''}
                {loginError && (
                  <>
                    <br />
                    <span>{loginError}</span>
                  </>
                )}
                {error && (
                  <>
                    <br />
                    <span>{error}</span>
                  </>
                )}
              </Text>
              <ShowPasswordButton
                onClick={() => setShowPassword(!showPassword)}
              >
                Show password
              </ShowPasswordButton>
            </FormError>
          </label>
          <Button type="submit">
            LOGIN
            <ArrowRight />
          </Button>
          <LogimMenssage>
            <Line />
            <Text size="sm">O Melhor aplicativo de treino on-line</Text>
            <Line />
          </LogimMenssage>
          <ButtonContainer>
            <Image src={logo} alt="logo" width={250} />
          </ButtonContainer>
          <Line />
        </Form>
      </Container>
    </>
  )
}

export default Login
