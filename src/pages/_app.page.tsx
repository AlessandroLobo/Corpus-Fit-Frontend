import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { HeaderPage } from './components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderPage />
      <Component {...pageProps} />
    </>
  )
}
