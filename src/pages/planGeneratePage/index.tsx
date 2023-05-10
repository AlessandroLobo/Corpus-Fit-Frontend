import { ArrowFatDown, CalendarPlus, UserPlus } from '@phosphor-icons/react'

import {
  ButtonCad,
  ButtonCadContainer,
  ButtonContainer,
  Container,
  SetTabsContainer,
  SetTabsEdit,
  SetTabsPlans,
} from './styles'

import { StudentEdit } from '../components/StudentsEdit/index.page'
import { useEffect, useState } from 'react'
import { StudentsPlansGenerate } from '../components/StudentsPlansGenerate'

interface PlanGeneratePageProps {
  studentParansId: string
}

export const PlanGeneratePage = ({
  studentParansId,
}: PlanGeneratePageProps) => {
  const [studentEditVisible, setStudentEditVisible] = useState(false)

  const [studentsPlansGeneratorVisible, setStudentsPlansGeneratorVisible] =
    useState(true)

  useEffect(() => {
    setStudentEditVisible(true)
    setStudentsPlansGeneratorVisible(false)
  }, [])

  const handleToggle = (value: string) => {
    if (value === ' studentEdit') {
      setStudentsPlansGeneratorVisible(false)
      setStudentEditVisible(true)
    } else if (value === 'studentsPlansGenerator') {
      setStudentsPlansGeneratorVisible(true)
      setStudentEditVisible(false)
    }
  }

  return (
    <Container>
      <ButtonCadContainer>
        <ButtonContainer>
          <ButtonCad
            onClick={() => handleToggle(' studentEdit')}
            style={studentEditVisible ? { color: '#00e7f9' } : undefined}
          >
            <UserPlus size={50} />
            Dados do Alunos
          </ButtonCad>
          <ButtonCad
            onClick={() => handleToggle('studentsPlansGenerator')}
            style={
              studentsPlansGeneratorVisible ? { color: '#00e7f9' } : undefined
            }
          >
            <CalendarPlus size={50} />
            Area de Pagamentos
          </ButtonCad>
        </ButtonContainer>
      </ButtonCadContainer>
      <SetTabsContainer>
        {studentEditVisible && (
          <SetTabsEdit>
            <ArrowFatDown size={30} />
          </SetTabsEdit>
        )}
        {studentsPlansGeneratorVisible && (
          <SetTabsPlans>
            <ArrowFatDown size={30} />
          </SetTabsPlans>
        )}
      </SetTabsContainer>
      {studentEditVisible && <StudentEdit studentParansId={studentParansId} />}
      {studentsPlansGeneratorVisible && (
        <StudentsPlansGenerate studentParansId={studentParansId} />
      )}
    </Container>
  )
}
