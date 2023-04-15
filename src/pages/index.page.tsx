import { FooterComponent } from './components/Footer'
import { HomePage } from './components/Home'
import { BackgroundImage } from '../styles/styles'

// import StartYorFitness from '../../public/images/start_your_fitness.png'

export default function Home() {
  return (
    <>
      <BackgroundImage
        src="/images/image1.jpg"
        layout="fill"
        alt="background image"
      />
      <HomePage />
      <FooterComponent />
    </>
  )
}
