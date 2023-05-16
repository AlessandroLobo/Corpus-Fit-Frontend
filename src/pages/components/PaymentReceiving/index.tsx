import { Container, Form, Text, TextInput } from './styles'

interface PaymentReceivingProps {
  plansGenerateId: any
  studentSelect: any
}


export const PaymentReceiving = ({
  plansGenerateId,
  studentSelect,
}: PaymentReceivingProps) => {
  console.log(plansGenerateId)
  // console.log(studentSelect)
  return (
    <Container>
      <Form>
        <Text>Nome:</Text>
        <TextInput
          // {...register('name', {
          //   required: true,
          // })}
          defaultValue={studentSelect.name || ''}
          placeholder="Digite seu nome completo"
          style={{ width: '100%' }}
          onBlur={(event) =>
            (event.target.value = event.target.value.toUpperCase())
          }
        />
        <Text>Vencimento:</Text>
        <TextInput
          // {...register('name', {
          //   required: true,
          // })}
          defaultValue={plansGenerateId || ''}
          placeholder="Digite seu nome completo"
          style={{ width: '100%' }}
          onBlur={(event) =>
            (event.target.value = event.target.value.toUpperCase())
          }
        />
      </Form>
    </Container>
  )
}
