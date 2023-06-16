import { useState } from 'react'
import {
  ButtonAlert,
  ButtonContainer,
  ButtonContainerAlert,
  ButtonSave,
  Container,
  ContainerAlert,
  ContainerModalAlert,
  Form,
  FormError,
  Line,
  OverlayAlert,
  Select,
  Text,
  TextAlert,
  TextArea,
  TextInfo,
  TextInput,
  TextInputContainer,
} from './styles'
import { ModalInfo } from '../../Modal/modalInfo'
import { Pencil } from '@phosphor-icons/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useWorkoutTypes } from '@/utils/useWorkoutTypes'
import { useDifficultys } from '@/utils/useDifficultys'
import { useObjectives } from '@/utils/useObjectives'
import { CreateRoutine, ICreateRoutine } from '@/pages/api/createWorkout'
import dayjs from 'dayjs'

const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
// Adiciona os plugins de UTC e timezone ao Day.js
dayjs.extend(utc)
dayjs.extend(timezone)
interface WorkoutType {
  id: number
  value: string
  label: string
}
interface Difficultys {
  id: number
  value: string
  label: string
}
interface Objectives {
  id: number
  value: string
  label: string
}

const registerFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  workoutType: z.string().nonempty('O tipo de treino é obrigatório'),
  difficulty: z.string().nonempty('A dificuldade é obrigatória'),
  objective: z.string().nonempty('O objetivo é obrigatório'),
  observation: z
    .string()
    .max(200, 'A observação pode ter no máximo 200 caracteres'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export const WorkoutRoutineRegistration = () => {
  const objectives: Objectives[] = useObjectives()

  const difficultys: Difficultys[] = useDifficultys()

  const workoutTypes: WorkoutType[] = useWorkoutTypes()

  const [isOpen, setIsOpen] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

  const [textMOdal, setTextModal] = useState('')

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const {
    register,
    reset,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormData) {
    console.log('start', startDate)
    console.log('end---', endDate)
    try {
      const dataObj = new Date()
      const dataFormatadaStart: string = `${dataObj.getFullYear()}${String(
        dataObj.getMonth() + 1,
      ).padStart(2, '0')}${String(dataObj.getDate()).padStart(2, '0')}`

      const formattedStartDate = dayjs(dataFormatadaStart, 'YYYYMMDD')
        .utc()
        .toDate()

      const dataFormatadaEnd: string = `${dataObj.getFullYear()}${String(
        dataObj.getMonth() + 1,
      ).padStart(2, '0')}${String(dataObj.getDate()).padStart(2, '0')}`

      const formattedEndDate = dayjs(dataFormatadaEnd, 'YYYYMMDD')
        .utc()
        .toDate()

      const params: ICreateRoutine = {
        id: '',
        name: data.name,
        workoutType: data.workoutType,
        objective: data.objective,
        observation: data.observation,
        studentId: '',
        startDate: formattedStartDate || null,
        endDate: formattedEndDate || null,
      }

      await CreateRoutine(params)
      setModalOpen(true)
      setTextModal('Alteração realizada com sucesso!')
      setStartDate(null)
      setEndDate(null)
      reset()
      // handleSearch()
    } catch (err: any) {
      // handle errors...
    }
  }

  return (
    <Container>
      {isOpen && (
        <OverlayAlert>
          <ContainerAlert>
            <ContainerModalAlert>
              <TextAlert>
                <h2>Deseja excluir esse grupo muscular?</h2>
              </TextAlert>
              <ButtonContainerAlert>
                <ButtonAlert>Deletar</ButtonAlert>
                <ButtonAlert
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  Cancelar
                </ButtonAlert>
              </ButtonContainerAlert>
            </ContainerModalAlert>
          </ContainerAlert>
        </OverlayAlert>
      )}
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        <TextInfo>{<h1>{textMOdal}</h1>}</TextInfo>
      </ModalInfo>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInputContainer>
          <Text>Nome da Rotina:</Text>
          <TextInput
            {...register('name', {
              required: true,
            })}
            onBlur={(event) =>
              (event.target.value = event.target.value.toUpperCase())
            }
          />
          {errors.name && (
            <FormError>
              <Text>{errors.name?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>
        <TextInputContainer>
          <Text>Tipos dos treinos:</Text>

          <Select
            style={{ width: '100%' }}
            {...register('workoutType', { required: true })}
          >
            <option value=""></option>
            {workoutTypes.map((workoutTypes) => (
              <option key={workoutTypes.id} value={workoutTypes.label}>
                {workoutTypes.label}
              </option>
            ))}
          </Select>
          {errors.workoutType && (
            <FormError>
              <Text>{errors.workoutType?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>
        <TextInputContainer>
          <Text>Objetivo:</Text>
          <Select
            style={{ width: '100%' }}
            {...register('objective', { required: true })}
          >
            <option value=""></option>
            {objectives.map((objectives) => (
              <option key={objectives.id} value={objectives.label}>
                {objectives.label}
              </option>
            ))}
          </Select>
          {errors.objective && (
            <FormError>
              <Text>{errors.objective?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>
        <TextInputContainer>
          <Text>Dificuldade:</Text>
          <Select
            style={{ width: '100%' }}
            {...register('difficulty', { required: true })}
          >
            <option value=""></option>
            {difficultys.map((difficulty) => (
              <option key={difficulty.id} value={difficulty.label}>
                {difficulty.label}
              </option>
            ))}
          </Select>
          {errors.difficulty && (
            <FormError>
              <Text>{errors.difficulty?.message}</Text>
            </FormError>
          )}
        </TextInputContainer>

        {/* <TextDatePickerContainer>
          <TextInputContainer>
            <Text>Data de Início:</Text>
            <DatePickerContainer
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
            />
          </TextInputContainer>
          <TextInputContainerDataPiker>
            <Text>Data Final:</Text>
            <DatePickerContainer
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
            />
          </TextInputContainerDataPiker>
        </TextDatePickerContainer> */}

        <TextInputContainer>
          <Text>Obs/Instruções:</Text>
          <TextArea {...register('observation', { required: true })} />
        </TextInputContainer>
        <Line />
        <ButtonContainer>
          <ButtonSave type="submit" style={{ marginTop: 27, marginBottom: 20 }}>
            Salvar
            <Pencil />
          </ButtonSave>
        </ButtonContainer>
      </Form>
    </Container>
  )
}
