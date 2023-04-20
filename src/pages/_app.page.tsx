import { globalStyles } from '@/styles/globals'
import type { AppProps } from 'next/app'
import { HeaderComponent } from './navbar/index.page'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} />
    </>
  )
}
