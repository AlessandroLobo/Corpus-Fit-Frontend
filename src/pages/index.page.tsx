import { Heading } from '@ignite-ui/react'
import {
  Container,
  BackgroundImage,
  ImageStartYorFitness,
} from '../styles/stylesHome'

// import StartYorFitness from '../../public/images/start_your_fitness.png'

export default function Home() {
  return (
    <>
      <BackgroundImage
        src="/images/image1.jpg"
        layout="fill"
        alt="background image"
      />
      <Heading as="h1" style={{ color: '#00e7f9' }}>
        <Container>
          <ImageStartYorFitness
            src="/images/start_your_fitness.png"
            alt="Start Your Fitness"
          />
        </Container>
      </Heading>
    </>
  )
}
