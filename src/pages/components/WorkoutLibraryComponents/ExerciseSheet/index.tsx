import { Container } from './styles'

interface ExerciceSheetProps {
  id: string
  selectedComponent: {
    id: string
    component: string
  }
}

export default function ExerciceSheet(props: ExerciceSheetProps) {
  return (
    <Container>
      <h1>ExerciceSheet</h1>
    </Container>
  )
}
