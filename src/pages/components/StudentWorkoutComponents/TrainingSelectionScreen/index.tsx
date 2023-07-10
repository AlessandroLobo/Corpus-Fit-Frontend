import React, { useState } from 'react'
import { Container, Form, Button, ButtonContainer } from './styles'

export default function TrainingSelectionScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = ['Slide 1', 'Slide 2', 'Slide 3'] // Substitua pelo conteúdo dos seus slides

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1,
    )
  }

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    )
  }

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={handlePreviousSlide}>Previous</Button>
        <Button onClick={handleNextSlide}>Next</Button>
      </ButtonContainer>
      <Form>{slides[currentSlide]}</Form>
    </Container>
  )
}
