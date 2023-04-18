import React, { useState } from 'react'
import { Hamburguer, HamburguerContainer, HamburguerTrace } from './styles'

// interface HamburguerButtonProps {
//   onClick?: () => void
// }

function HamburguerButton() {
  const [isActive, setIsActive] = useState(false)
  const [traceActive, setTraceActive] = useState(false)

  function HamburgerClick() {
    setIsActive(!isActive)
    setTraceActive(!traceActive)
    // if (props.onClick) {
    //   props.onClick()
    // }
  }

  return (
    <HamburguerContainer>
      <Hamburguer
        className={isActive ? 'hamburguer hamburguer-active  ' : 'hamburguer '}
        onClick={HamburgerClick}
      >
        <HamburguerTrace
          className={
            isActive ? 'hamburguer hamburguer-active  ' : 'hamburguer '
          }
        />
      </Hamburguer>
    </HamburguerContainer>
  )
}

export default HamburguerButton
