import { BackgroundImage } from '../styles/styles'
import { FooterComponent } from './Footer/index.page'
import { HomePage } from './Home/index.page'

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
