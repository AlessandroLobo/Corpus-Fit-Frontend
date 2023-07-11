import React, { useEffect, useState } from 'react'
import { Container, Form, Button, ButtonContainer } from './styles'
import {
  GetAllTrainingSheet,
  ICreateTrainingSheet,
  ICreateTrainings,
} from '@/pages/api/createTraining'

interface ISelectedComponent {
  id: string
  component: 'Routines' | 'TrainingSelectionScreen' | 'ExerciseSheet'
  workoutRoutineId: string
}

export default function TrainingSelectionScreen(props: {
  selectedComponent: ISelectedComponent
  handleSelectedComponent: (selectedComponent: ISelectedComponent) => void
}) {
  const { selectedComponent } = props

  const [trainingSheet, setTrainingSheet] = useState<ICreateTrainingSheet[]>([])

  const [Training, setTraining] = useState<ICreateTrainings[] | undefined>()

  const [currentSlide, setCurrentSlide] = useState(0)

  const [exercise, setExercise] = useState<ICreateTrainings[] | undefined>()

  useEffect(() => {
    listTrainingSheet()
  }, [])

  const listTrainingSheet = async () => {
    const data = await GetAllTrainingSheet(selectedComponent.workoutRoutineId)
    if (data?.trainingSheets?.length > 0) {
      setTrainingSheet(data.trainingSheets)
      setTraining(data.trainingSheets[0].Training)
      // setExercise(data.trainingSheets[0].training[0]?.exercise)
      console.log(data.trainingSheets)
    }
  }

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === trainingSheet.length - 1 ? 0 : prevSlide + 1,
    )
  }

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? trainingSheet.length - 1 : prevSlide - 1,
    )
  }

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={handlePreviousSlide}>Previous</Button>
        <Button onClick={handleNextSlide}>Next</Button>
      </ButtonContainer>
      <Form>
        {trainingSheet.length > 0 && (
          <>
            <h2>{trainingSheet[currentSlide].workoutType}</h2>
            {trainingSheet[currentSlide].Training?.map((training) => (
              <div key={training.id}>
                <h3>{training.name}</h3>
                <p>Repetições: {training.repetitions}</p>
                <p>Descanso: {training.restTimeSeconds} segundos</p>
                <p>Peso: {training.weight} kg</p>
                <p>url: {training?.exercise?.url}</p>
              </div>
            ))}
          </>
        )}
      </Form>
    </Container>
  )
}
