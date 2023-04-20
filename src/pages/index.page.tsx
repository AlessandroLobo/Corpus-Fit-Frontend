import { BackgroundImage } from '../styles/styles'
import { FooterComponent } from './footer/index.page'
import { HomePage } from './home/index.page'

// import StartYorFitness from '../../public/images/start_your_fitness.png'

export default function Home() {
  return (
    <>
      <BackgroundImage
        src="/images/model_corda.jpg"
        layout="fill"
        alt="background image"
      />
      <HomePage />
      <FooterComponent />
    </>
  )
}
