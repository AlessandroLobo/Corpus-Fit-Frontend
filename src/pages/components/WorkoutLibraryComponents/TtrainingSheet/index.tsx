import { z } from 'zod'
import {
  ButtonSave,
  Container,
  Form,
  FormError,
  Select,
  Text,
  TextInfo,
  TextInput,
  TextInputContainer,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Pencil } from '@phosphor-icons/react'
import { useSelectWeekSheet } from '@/utils/useTypeWeek'
import React, { useEffect, useState } from 'react'
import {
  CreateTrainingSheet,
  ICreateTrainingSheet,
} from '@/pages/api/createTraining'
import { ModalInfo } from '../../Modal/modalInfo'

interface IRoutineData {
  // Defina aqui o formato dos dados de retorno da API
  name: string
  objective: string
  workoutType: string
}

interface TrainingSheetProps {
  routineData: IRoutineData
}

interface SelectWeeks {
  id: number
  value: string
  label: string
}

const registerFormSchema = z.object({
  tipo: z.string(),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  selectWeek: z.string(),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function TrainingSheet(props: TrainingSheetProps) {
  const selectWeeks: SelectWeeks[] = useSelectWeekSheet()

  const [modalOpen, setModalOpen] = useState(false)

  // const [statusValue, setstatusValue] = useState(true)

  const [textMOdal, setTextModal] = useState('')

  const [workoutTypeSelect, setWorkoutTypeSelect] = useState(false)

  const {
    register,
    // reset,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })
  // console.log(props.routineData.workoutType)

  useEffect(() => {
    if (
      props.routineData.workoutType === 'Dia da Semana - Ex: Segunda, Terça...'
    ) {
      setWorkoutTypeSelect(true)
    }
  }, [props.routineData.workoutType])

  // function handlePlanChange(event) {
  //   const selectedValue = event.target.value
  //   console.log('Valor selecionado:', selectedValue)
  //   // Faça algo com o valor selecionado aqui
  // }

  async function handleRegister(data: RegisterFormData) {
    console.log('Data', data)
    let workoutTypeData = ''
    // verifica qual campo foi preenchido input ou select
    if (data.tipo === '') {
      workoutTypeData = data.selectWeek
    } else {
      workoutTypeData = data.tipo.toUpperCase()
    }

    try {
      const params: ICreateTrainingSheet = {
        name: data.name.toUpperCase(),
        workoutType: workoutTypeData,
      }
      console.log(params)
      await CreateTrainingSheet(params)
      setModalOpen(true)
      setTextModal('Treino cadastrado com sucesso!')
      // reset()
      // handleSearch()
    } catch (err: any) {
      // handle errors...
    }
  }

  return (
    <Container>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        <TextInfo>
          <h1>{textMOdal}</h1>
        </TextInfo>
      </ModalInfo>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <TextInputContainer>
          <Text>Tipo:</Text>
          {workoutTypeSelect ? (
            <Select
              style={{ width: '100%' }}
              {...register('selectWeek', { required: true })}
            >
              {selectWeeks.map((week) => (
                <option key={week.id} value={week.label}>
                  {week.label}
                </option>
              ))}
            </Select>
          ) : (
            <TextInput
              {...register('tipo', {
                required: true,
              })}
              placeholder="Digite o tipo ex: Treino 1 , Treino 2 ou A, B, C..."
              style={{ width: '100%' }}
              onBlur={(event) =>
                (event.target.value = event.target.value.toUpperCase())
              }
            />
          )}
        </TextInputContainer>
        <TextInputContainer>
          <Text>Nome:</Text>
          <TextInput
            {...register('name', {
              required: true,
            })}
            placeholder="Digite um nome"
            style={{ width: '100%' }}
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
        <ButtonSave
          type="submit"
          // onClick={handleSearch}
          style={{ marginTop: 17, marginBottom: 10, width: '100%' }}
        >
          Salvar
          <Pencil />
        </ButtonSave>
      </Form>
    </Container>
  )
}
