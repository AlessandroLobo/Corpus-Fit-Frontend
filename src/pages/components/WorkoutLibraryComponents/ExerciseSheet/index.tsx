import { Container } from './styles'

interface ExerciseSheetProps {
  id: string
  selectedComponent: {
    id: string
    component: string
  }
}

export default function ExerciseSheet(props: ExerciseSheetProps) {
  return (
    <Container>
      <h1>ExerciceSheet</h1>
    </Container>
  )
}
