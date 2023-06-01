import { useState } from 'react'
import {
  ButtonAlert,
  ButtonContainer,
  ButtonContainerAlert,
  ButtonDelete,
  ButtonSave,
  ButtonUpdate,
  Container,
  ContainerAlert,
  ContainerList,
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
  TextInputFindContainer,
} from './styles'
import { ModalInfo } from '../../Modal/modalInfo'
import { Pencil, Trash } from '@phosphor-icons/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useWorkoutTypes } from '@/utils/useWorkoutTypes'
import { useDifficultys } from '@/utils/useDifficultys'
import { useObjectives } from '@/utils/useObjectives'

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

  const {
    register,
    // reset,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
    // try {
    //   const params: IcreateMuscleGroup = {
    //     name: data.name.toUpperCase(),
    //   }
    //   await CreateMuscleGroup(params)
    //   setModalOpen(true)
    //   setTextModal('Alteração realizada com sucesso!')
    //   reset()
    //   handleSearch()
    // } catch (err: any) {
    //   // handle errors...
    // }
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
                <ButtonAlert
                // onClick={() => {
                //   muscleGroupInfo && handleDelete(muscleGroupInfo)
                //   setIsOpen(false)
                // }}
                >
                  Deletar
                </ButtonAlert>
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

          {/* {!buttonDeleteDisabled ? ( */}
          <TextInput
            {...register('name', {
              required: true,
            })}
          // placeholder="Digite o nome do grupo muscular"
          // onBlur={(event) =>
          //   (event.target.value = event.target.value.toUpperCase())
          // }
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
          // onChange={handleSelectChange}
          // value={selectedValue}
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
          // onChange={handleSelectChange}
          // value={selectedValue}
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
        <TextInputContainer>
          <Text>Obs/Instruções:</Text>
          <TextArea {...register('observation', { required: true })} />
        </TextInputContainer>
        <Line />
        <ButtonContainer>
          {/* {!buttonDeleteDisabled ? ( */}
          <ButtonSave type="submit" style={{ marginTop: 27, marginBottom: 20 }}>
            Salvar
            <Pencil />
          </ButtonSave>

          <ButtonDelete
          // type="button"
          // style={{ marginTop: 27, marginBottom: 20 }}
          // onClick={() => {
          //   butonDelete()
          // }}
          // disabled={!buttonDeleteDisabled}
          >
            Deletar
            <Trash />
          </ButtonDelete>
        </ButtonContainer>
      </Form>
    </Container>
  )
}
