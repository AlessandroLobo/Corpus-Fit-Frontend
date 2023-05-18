import { useState } from 'react'

export const usePaymentMethod = () => {
  const [paymentMethod] = useState([
    { id: 0, value: '', label: '' },
    { id: 1, value: 'Pix', label: 'Pix' },
    { id: 2, value: 'Cartão De Debito', label: 'Cartão de Debito' },
    { id: 3, value: 'Cartão De Crédito', label: 'Cartão de Crédito' },
    { id: 4, value: 'Dinheiro', label: 'Dinheiro' },
  ])
  return paymentMethod
}
