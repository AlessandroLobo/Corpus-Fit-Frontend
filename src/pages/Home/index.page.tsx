import { Heading } from '@ignite-ui/react'
import { CaretDoubleRight } from '@phosphor-icons/react'
import {
  Container,
  ImageStartYorFitness,
  TextExplanation,
  Description,
  Explanation,
  IconWrapper,
} from './styles'

export const HomePage = () => {
  return (
    <>
      <Container>
        <Heading as="h1" style={{ color: '#00e7f9' }}>
          <ImageStartYorFitness
            src="/images/start_your_fitness.png"
            alt="Start Your Fitness"
          />
        </Heading>
        <Description>
          <p>
            Criamos o aplicativo <span>Corpus Fit Training Online</span> para
            ajudar as pessoas a atingirem seus objetivos de condicionamento
            físico com facilidade, segurança e eficiência. Oferecemos programas
            de treinamento personalizados criados por especialistas em fitness,
            nutrição e bem-estar, tornando acessível a qualquer hora e em
            qualquer lugar.
          </p>
          <span>Venha fazer parte da sua transformação!</span>
        </Description>

        <TextExplanation>
          <Explanation>
            <IconWrapper>
              <CaretDoubleRight size={20} />
            </IconWrapper>
            <p>FLEXIBILIDADE DE</p> <span>HORÁRIOS</span>
          </Explanation>
        </TextExplanation>
        <TextExplanation>
          <Explanation>
            <CaretDoubleRight size={20} />
            <span>TREINOS</span> <p>PERSONALIZADOS</p>
          </Explanation>
        </TextExplanation>
        <TextExplanation>
          <Explanation>
            <CaretDoubleRight size={20} />
            <p>ACESSO A UM </p> <span>PERSONAL</span>
          </Explanation>
        </TextExplanation>
      </Container>
    </>
  )
}
