import { TextInput } from '@ignite-ui/react'
import {
  Form,
  FormDataTelSexo,
  FormError,
  Line,
  Option,
  Select,
  TextInputContainer,
  TextInfo,
  Text,
  ButtonContainer,
  ButtonDelete,
  ContainerAlert,
  ContainerModalAlert,
  OverlayAlert,
  ButtonContainerAlert,
  ButtonAlert,
  TextAlert,
  ButtonUpdate,
} from './styles'
import React, { useEffect, useRef, useState } from 'react'
import { getAddress } from '../../../utils/getAddress'
import { useGenders } from '../../../utils/useGenders'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cpf } from 'cpf-cnpj-validator'
import { cepMask, cpfMask, dataMask, phoneMask } from '../../../utils/maskUtils'
import { ModalInfo } from '../Modal/modalInfo'
import { usePlans } from '@/pages/api/plans/index.api'
import {
  UpdateParams,
  deleteStudent,
  updateStudent,
} from '@/pages/api/createStudent'
import { Pencil, Trash } from '@phosphor-icons/react'
import { FindStudent } from '@/pages/api/getAllStudents/index.api'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
interface Genders {
  id: number
  value: string
  label: string
}

interface StudentEditProps {
  studentParansId: string
}
interface Data {
  id: string
  name: string
  cpf: string
  email: string
  password: string
  plan: string
  birthDate: string
  weight: string
  phone: string
  gender: string
  CEP: string
  city: string
  address: string
  number: string
  state: string
}

const registerFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cpf: z
    .string()
    .length(11, 'O CPF deve ter exatamente 11 dígitos')
    .refine((value) => cpf.isValid(value), 'CPF inválido')
    .transform((value) => value.replace(/[^\d]/g, '')),
  email: z.string().email('Endereço de e-mail inválido'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .max(50, 'A senha não pode ultrapassar 50 caracteres.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    ),
  plan: z.string().nonempty({ message: 'Escolha um Plano' }),
  birthDate: z.string().length(8, 'Digite uma data valida'),
  weight: z.string().nonempty({ message: 'Entre com um peso valido' }),
  phone: z
    .string()
    .min(11, 'O telefone deve ter pelo menos 10 dígitos')
    .max(11, 'O telefone deve ter no máximo 10 dígitos'),
  gender: z.string().nonempty({ message: 'Escolha um gênero.' }),
  CEP: z.string().length(8, 'O CEP deve ter exatamente 8 dígitos'),
  city: z.string().optional(),
  address: z.string().optional(),
  number: z.string().nonempty({ message: 'O número é obrigatório.' }),
  state: z.string().optional(),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const StudentEdit = ({ studentParansId }: StudentEditProps) => {
  const {
    register,
    reset,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })
  // ('register:', register)

  const [addressInfo, setAddressInfo] = useState({
    city: '',
    address: '',
    state: '',
  })

  const [student, setStudent] = useState<Data | null>(null)

  const [err, setError] = useState('')

  const genders: Genders[] = useGenders()

  const { plans, loading } = usePlans()

  const [registerError, setRegisterError] = useState<string | null>(null)

  const [modalOpen, setModalOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [buttonDeleteDisabled, setButtonDeleteDisabled] = useState(false)

  const birthdayRef = useRef('')

  const planNameRef = useRef('')

  const [planObjectid, setPlanObjetcId] = useState('')

  const [textMOdal, setTextModal] = useState('')

  function handlePlanChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedName = event.target.value

    // Procura o objeto do plano selecionado no array "plans"
    const selectedPlanObj = plans.find((plan) => plan.name === selectedName)
    // Atualiza o valor de "ide" com o ID do objeto encontrado
    if (selectedPlanObj) {
      setPlanObjetcId(selectedPlanObj.id)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await FindStudent({
          studentParansId,
        })
        const addressInfo = await getAddress(studentData.CEP)

        if (!addressInfo) {
          setError('Invalid Zip Code')
          return
        }

        const dataOriginal = studentData.birthDate
        const formattedDate = dayjs(dataOriginal).utc().format('DDMMYYYY')

        birthdayRef.current = formattedDate

        setStudent(studentData)
        setAddressInfo(addressInfo)

        const planName = studentData.Plan.name

        planNameRef.current = planName
      } catch (error) {
        setError(err)
      }
    }
    fetchData()
  }, [studentParansId, err])

  if (!student) {
    return <Form>Carregando dados...</Form>
  }

  async function handleGetAddressBlur(
    event: React.FocusEvent<HTMLInputElement>,
  ) {
    try {
      // Chama a função getAddress para buscar as informações de endereço com base no CEP informado pelo usuário
      const zipCode = event.currentTarget.value.replace(/\D/g, '').toUpperCase()
      const addressInfo = await getAddress(zipCode)

      if (!addressInfo) {
        setError('Invalid Zip Code')
        return
      }
      // Atualiza o estado com as informações de endereço retornadas pela API
      setAddressInfo(addressInfo)

      // Re-validate the form fields after updating the address information
    } catch (error) {
      console.log(error)
      setError('Something went wrong')
    }
  }

  if (loading) {
    return <Form>Carregando planos...</Form>
  }

  async function handleUpdate(student: RegisterFormData) {
    try {
      const studentId = studentParansId
      const studentPlanId = planObjectid || student.Plan.id

      const data = getValues()
      const params: UpdateParams = {
        id: studentId,
        name: data.name.toUpperCase(),
        email: data.email,
        password: data.password,
        cpf: data.cpf,
        planId: studentPlanId,
        birthDate: data.birthDate,
        weight: data.weight,
        phone: data.phone,
        gender: data.gender,
        CEP: data.CEP,
        city: addressInfo.city, // aqui estamos incluindo o valor de city a partir do estado local
        address: addressInfo.address, // aqui estamos incluindo o valor de address a partir do estado local
        number: data.number,
        state: addressInfo.state, // aqui estamos incluindo o valor de state a partir do estado locali estamos incluindo o valor de state a partir do estado local
      }
      await updateStudent(params)
      setModalOpen(true)
      setTextModal('Alteraçao realizado com sucesso!')
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        if (
          err.response.data.message === 'Error creating user: Cpf já cadastrado'
        ) {
          setRegisterError('O CPF informado já está cadastrado.')
        } else {
          setRegisterError(
            'Ocorreu um erro ao criar usuário. Por favor, tente novamente mais tarde.',
          )
        }
      } else {
        setRegisterError(
          'Ocorreu um erro interno do servidor. Por favor, tente novamente mais tarde.',
        )
      }
    }
  }

  function butonDelete() {
    setIsOpen(true)
  }

  async function handleDelete(student: RegisterFormData) {
    try {
      const studentId = studentParansId

      await deleteStudent(studentId)
      // alert('Exclusão feita')
      reset({
        name: '',
        email: '',
        password: '',
        cpf: '',
        birthDate: '',
        weight: '',
        phone: '',
        gender: '',
        CEP: '',
      })
      reset()
      setModalOpen(true)
      setTextModal('Aluno deletado com sucesso!')
      setButtonDeleteDisabled(true)
      setAddressInfo({ city: '', address: '', state: '' })
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setRegisterError('Cliente não encontrado')
      } else if (err.response && err.response.status === 409) {
        setRegisterError('CPF já cadastrado')
      } else {
        setRegisterError(
          'Ocorreu um erro interno do servidor. Por favor, tente novamente mais tarde.',
        )
      }
    }
  }

  return (
    <>
      {isOpen && (
        <OverlayAlert>
          <ContainerAlert>
            <ContainerModalAlert>
              <TextAlert>
                <h2>Deseja excluir esse aluno?</h2>
              </TextAlert>
              <ButtonContainerAlert>
                <ButtonAlert
                  onClick={() => {
                    student && handleDelete(student)
                    setIsOpen(false)
                  }}
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
        <TextInfo>
          <h1>{textMOdal}</h1>
        </TextInfo>
      </ModalInfo>

      <Form
        as="form"
        onSubmit={(event) => {
          event.preventDefault()
          // handleDelete(clientId)
          handleUpdate(student)
        }}
      >
        {registerError && (
          <FormError>
            <Text>{registerError}</Text>
          </FormError>
        )}

        <FormDataTelSexo>
          <TextInputContainer>
            <Text>Nome:</Text>
            <TextInput
              {...register('name', {
                required: true,
              })}
              defaultValue={student?.name || ''}
              placeholder="Digite seu nome completo"
              style={{ width: '70%' }}
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
        </FormDataTelSexo>
        <FormDataTelSexo>
          <TextInputContainer>
            <Text>E-Mail:</Text>
            <TextInput
              {...register('email', {
                required: true,
              })}
              defaultValue={student.email}
              placeholder="Entre com e-Mail completo"
              style={{ width: '100%' }}
            />
            {errors.email && (
              <FormError>
                <Text>{errors.email?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>
          <TextInputContainer>
            <Text>Password</Text>
            <TextInput
              id="password"
              placeholder="Enter your password"
              {...register('password')}
              autoComplete="new-password"
            />
            <FormError>
              <Text>{errors.password?.message}</Text>
            </FormError>
          </TextInputContainer>
        </FormDataTelSexo>
        <FormDataTelSexo>
          <TextInputContainer>
            <Text>CPF:</Text>
            <TextInput
              {...register('cpf', {
                required: true,
              })}
              id="CPF"
              defaultValue={student.cpf}
              placeholder="Digite seu CPF completo"
              style={{ width: '100%' }}
              onBlur={(e) => {
                e.target.value = cpfMask(e.target.value)
                trigger('cpf')
              }}
            />
            {errors.cpf && (
              <FormError>
                <Text>{errors.cpf?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>

          <TextInputContainer>
            <Text>Plano:</Text>
            <Select
              style={{ width: '100%' }}
              {...register('plan', { required: true })}
              defaultValue={planNameRef.current}
              onChange={handlePlanChange}
            >
              {plans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </Select>
            {errors.plan && (
              <FormError>
                <Text>{errors.plan?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>
        </FormDataTelSexo>
        <FormDataTelSexo>
          <TextInputContainer>
            <Text>Data de Nascimento:</Text>
            <TextInput
              {...register('birthDate', {
                required: true,
              })}
              defaultValue={birthdayRef.current}
              placeholder="Digite sua data de Nascimento completo"
              style={{ width: '100%' }}
              onBlur={(e) => {
                e.target.value = dataMask(e.target.value)
                trigger('birthDate')
              }}
            />
            {errors.birthDate && (
              <FormError>
                <Text>{errors.birthDate?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>

          <TextInputContainer>
            <Text>Peso:</Text>
            <TextInput
              {...register('weight', {
                required: true,
              })}
              defaultValue={student.weight}
              placeholder="Entre com o peso do aluno"
              style={{ width: '100%' }}
              type="number"
              inputMode="numeric"
            />
            {errors.weight && (
              <FormError>
                <Text>{errors.weight?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>

          <TextInputContainer>
            <Text>Sexo:</Text>
            <Select
              style={{ width: '100%' }}
              {...register('gender', { required: true })}
              defaultValue={student.gender}
            >
              {genders.map((gender) => (
                <Option key={gender.id} value={gender.value}>
                  {gender.label}
                </Option>
              ))}
            </Select>
            {errors.gender && (
              <FormError>
                <Text>{errors.gender?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>
        </FormDataTelSexo>
        <Line />

        <FormDataTelSexo>
          <TextInputContainer>
            <Text>Telefone:</Text>
            <TextInput
              {...register('phone', {
                required: true,
              })}
              defaultValue={student.phone}
              placeholder="Entre com o numero de telefone "
              style={{ width: '100%' }}
              onBlur={(e) => {
                e.target.value = phoneMask(e.target.value)
                trigger('phone')
              }}
            />
            {errors.phone && (
              <FormError>
                <Text>{errors.phone?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>
          <TextInputContainer>
            <Text>CEP:</Text>
            <TextInput
              {...register('CEP', {
                required: true,
              })}
              defaultValue={student.CEP}
              placeholder="Digite o CEP"
              style={{ width: '100%' }}
              onBlur={(e) => {
                handleGetAddressBlur(e)
                const formattedValue = cepMask(e.target.value)
                e.target.value = formattedValue
                trigger('CEP')
              }}
            />
            {errors.CEP && (
              <FormError>
                <Text>{errors.CEP?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>

          <TextInputContainer>
            <Text>Cidade:</Text>
            <TextInput
              contentEditable={false}
              readOnly={true}
              placeholder="Cidade"
              style={{ width: '100%', pointerEvents: 'none' }}
              value={addressInfo.city ?? 'Aguardando informações...'}
              onChange={(event) =>
                setAddressInfo({ ...addressInfo, city: event.target.value })
              }
              onInput={(event: React.FormEvent<HTMLInputElement>) => {
                event.currentTarget.value =
                  event.currentTarget.value.toUpperCase()
              }}
            />
          </TextInputContainer>
        </FormDataTelSexo>
        {/* Grupo Endereço, Numero e Estado */}
        <FormDataTelSexo>
          <TextInputContainer>
            <Text>Endereço:</Text>
            <TextInput
              contentEditable={false}
              readOnly={true}
              placeholder="Endereço completo"
              style={{ width: '100%', pointerEvents: 'none' }}
              value={addressInfo.address ?? 'Aguardando informações...'}
              onChange={(event) =>
                setAddressInfo({
                  ...addressInfo,
                  address: event.target.value,
                })
              }
            />
          </TextInputContainer>
          <TextInputContainer>
            <Text>Numero:</Text>
            <TextInput
              {...register('number', {
                required: true,
              })}
              defaultValue={student.number}
              placeholder="Digite o numero da casa"
              style={{ width: '100%' }}
            />
            {errors.number && (
              <FormError>
                <Text>{errors.number?.message}</Text>
              </FormError>
            )}
          </TextInputContainer>
          <TextInputContainer>
            <Text>Estado:</Text>
            <TextInput
              contentEditable={false}
              readOnly={true}
              placeholder="Estado"
              style={{ width: '100%', pointerEvents: 'none' }}
              value={addressInfo.state ?? 'Aguardando informações...'}
              onChange={(event) =>
                setAddressInfo({ ...addressInfo, state: event.target.value })
              }
            />
          </TextInputContainer>
        </FormDataTelSexo>
        <Line />
        <ButtonContainer>
          <ButtonUpdate
            type="button"
            style={{ marginTop: 27, marginBottom: 20 }}
            onClick={() => {
              student && handleUpdate(student)
            }}
            disabled={buttonDeleteDisabled}
          >
            Atualizar
            <Pencil />
          </ButtonUpdate>
          <ButtonDelete
            type="button"
            style={{ marginTop: 27, marginBottom: 20 }}
            onClick={() => {
              butonDelete()
            }}
            disabled={buttonDeleteDisabled}
          >
            Deletar
            <Trash />
          </ButtonDelete>
        </ButtonContainer>
      </Form>
      {/* <button onClick={() => setModalOpen(true)} style={{ marginTop: 27, marginBottom: 20 }} /> */}
    </>
  )
}

export { StudentEdit }
