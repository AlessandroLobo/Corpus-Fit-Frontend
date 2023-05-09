import { CalendarPlus, UserPlus } from '@phosphor-icons/react'

import {
  ButtonCad,
  ButtonCadContainer,
  ButtonContainer,
  Container,
} from './styles'

import { StudentEdit } from '../components/StudentsEdit/index.page'
import { useState } from 'react'

interface PlanGeneratePageProps {
  studentParansId: string
}

export const PlanGeneratePage = ({
  studentParansId,
}: PlanGeneratePageProps) => {
  const [buttonDeleteDisabled, setButtonDeleteDisabled] = useState(false)
  return (
    <Container>
      <ButtonCadContainer>
        <ButtonContainer>
          <ButtonCad>
            <UserPlus size={50} />
            Dados do Alunos
          </ButtonCad>
          <ButtonCad>
            <CalendarPlus size={50} />
            Area de Pagamentos
          </ButtonCad>
        </ButtonContainer>
      </ButtonCadContainer>
      <StudentEdit studentParansId={studentParansId} />
    </Container>
  )
}
