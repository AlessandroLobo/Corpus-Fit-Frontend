import React, { useEffect, useState } from 'react'
import {
  Container,
  Form,
  Button,
  ButtonContainer,
  Text,
  TextContainerHeader,
  TextHeader,
  LineHeader,
  TextHeaderInfo,
  TextCurrentTraining,
  ButtonSelectTraining,
  TextTrainingContainer,
  TextTraining,
  TextTrainingName,
  TextTrainingTitle,
} from './styles'
import {
  GetAllTrainingSheet,
  ICreateTrainingSheet,
  ICreateTrainings,
} from '@/pages/api/createTraining'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

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

  const [exerciseCount, setExerciseCount] = useState(0)

  const [trainingCount, setTrainingCount] = useState(0)

  const [durationTraining, setDurationTraining] = useState(0)

  useEffect(() => {
    const listTrainingSheet = async () => {
      const data = await GetAllTrainingSheet(selectedComponent.workoutRoutineId)
      if (data?.trainingSheets?.length > 0) {
        const trainingLength = data.trainingSheets[0].Training?.length || 0
        const exerciseLength = trainingLength * data.trainingSheets.length || 0
        // const durationTrainig = data.trainingSheets[0].duration || 0

        setTrainingSheet(data.trainingSheets)
        setTraining(data.trainingSheets[0].Training)
        setExerciseCount(trainingLength)
        setTrainingCount(exerciseLength)
        // setDurationTrainig(durationTrainig)
        console.log(data.trainingSheets)
      }
    }
    listTrainingSheet()
  }, [selectedComponent.workoutRoutineId])

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === trainingSheet.length - 1 ? 0 : prevSlide + 1,
    )
    durationSelected()
  }

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? trainingSheet.length - 1 : prevSlide - 1,
    )
    durationSelected()
  }

  function durationSelected() {
    setDurationTraining(trainingSheet[currentSlide].duration || 0)
  }

  return (
    <Container>
      <TextCurrentTraining>
        <Text>
          Dia {''}
          {currentSlide + 1}/{trainingSheet.length} -{' '}
          {trainingSheet[currentSlide]?.name}
        </Text>
      </TextCurrentTraining>
      <TextHeader>
        <TextContainerHeader>
          <TextHeaderInfo>Exercícios</TextHeaderInfo>
          <Text>{exerciseCount}</Text>
        </TextContainerHeader>
        <LineHeader />
        <TextContainerHeader>
          <TextHeaderInfo>Series</TextHeaderInfo>
          <Text>{trainingCount}</Text>
        </TextContainerHeader>
        <LineHeader />
        <TextContainerHeader>
          <TextHeaderInfo>Duração</TextHeaderInfo>
          <Text>{durationTraining}</Text>
        </TextContainerHeader>
      </TextHeader>
      <ButtonContainer>
        <Button>Start Dia {currentSlide + 1}</Button>
      </ButtonContainer>
      <ButtonContainer>
        <ButtonSelectTraining onClick={handlePreviousSlide}>
          <CaretLeft size={40} />
        </ButtonSelectTraining>
        <ButtonSelectTraining onClick={handleNextSlide}>
          <CaretRight size={40} />
        </ButtonSelectTraining>
      </ButtonContainer>
      <Form>
        {trainingSheet.length > 0 && (
          <>
            <TextTrainingTitle>
              {trainingSheet[currentSlide].workoutType}
            </TextTrainingTitle>
            {trainingSheet[currentSlide].Training?.map((training) => (
              <div key={training.id}>
                <TextTrainingName>{training.name}</TextTrainingName>
                <TextTrainingContainer>
                  <TextTraining>{training.sets} Series </TextTraining>
                  <TextTraining>X</TextTraining>
                  <TextTraining>{training.repetitions} Reps</TextTraining>-
                  <TextTraining>Desc {training.restTimeSeconds}</TextTraining>-
                  <TextTraining>Peso {training.weight}</TextTraining>
                  {/* <p>url: {training?.exercise?.url}</p> */}
                </TextTrainingContainer>
              </div>
            ))}
          </>
        )}
      </Form>
    </Container>
  )
}
