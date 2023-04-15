import {
  Footer,
  FacebookLogoContainer,
  InstagramLogoContainer,
  Container,
  ContainerCorpusFit,
  FooterRigReservis,
} from './styles'
import { Check, FacebookLogo, InstagramLogo } from '@phosphor-icons/react'

import logo from '../../../../public/images/LOGO CORPUSFIT-2.png'
import Image from 'next/image'

export const FooterComponent = () => {
  return (
    <Footer>
      <ContainerCorpusFit>
        <Image src={logo} alt="logo" width={100} />
      </ContainerCorpusFit>
      <Container>
        <InstagramLogoContainer
          href="https://www.instagram.com/academiacorpusfranca/"
          target="blank"
        >
          <div>
            <InstagramLogo size={40} style={{ color: '#00e7f9' }} />
            <h3>Instagram</h3>
            <Check size={25} style={{ color: '#fff' }} />
          </div>
        </InstagramLogoContainer>
        <FacebookLogoContainer
          href="https://www.instagram.com/academiacorpusfranca/"
          target="blank"
        >
          <div>
            <FacebookLogo size={40} style={{ color: '#00e7f9' }} />
            <h3>Facebook</h3>
            <Check size={25} style={{ color: '#fff' }} />
          </div>
        </FacebookLogoContainer>
      </Container>
      <FooterRigReservis>
        <p>© Rig Reservis 2023. Desenvolvido por ALS Systems.</p>
      </FooterRigReservis>
    </Footer>
  )
}
