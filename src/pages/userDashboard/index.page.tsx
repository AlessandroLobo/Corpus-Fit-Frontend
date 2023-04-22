import { parseCookies } from 'nookies'
import { validateToken } from '../api/authService'
import { GetServerSidePropsContext } from 'next'

interface Props {
  email: string
}

const UserDashboard = ({ email }: Props) => {
  return (
    <div>
      <h1>Área do Aluno</h1>
      <p>Olá, {email}!</p>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context)
  const token = cookies.CorpusFitToken

  const user = validateToken(token!)
  console.log('getsider', user)

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const email = user.user

  return {
    props: { email },
  }
}

export default UserDashboard
