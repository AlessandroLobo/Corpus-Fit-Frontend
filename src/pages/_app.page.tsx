import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import Header from './components/Navbar/index.page'
import { AuthProvider } from '../context/AuthContext'

globalStyles()

export default function App({
  Component,
  pageProps,
}: AppProps & { email: string }) {
  return (
    <>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
