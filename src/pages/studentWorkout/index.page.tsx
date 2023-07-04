import { GetServerSidePropsContext } from 'next'
import RoutineSelectionScreen from '../components/StudentWorkoutComponents/TrainingSelectionScreen'
import { Container, Form, FormHeader, TextHeader } from './styles'
import { parseCookies } from 'nookies'
import { validateToken } from '../api/authService'

interface Props {
  email: string
  id: string
}

export default function StudentWorkout({ email, id }: Props) {
  return (
    <Container>
      <FormHeader>
        <TextHeader>Area de treino do aluno</TextHeader>
      </FormHeader>

      <Form>
        <RoutineSelectionScreen email={email} id={id} />
      </Form>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const token = cookies.CorpusFitToken

  const user = validateToken(token!)

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const email = user.user
  const id = user.id

  return {
    props: { email, id },
  }
}
