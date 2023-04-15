import Image from 'next/image'
import {
  Header,
  HeaderInfo,
  HeaderTitle,
  NameAndEmail,
  ProfilePhoto,
} from './styles'

import logo from '../../../../public/images/LOGO CORPUSFIT-2.png'

export const HeaderComponent = () => {
  return (
    <Header>
      <HeaderTitle>
        <Image src={logo} alt="logo" width={100} />
      </HeaderTitle>
      <HeaderInfo>
        <NameAndEmail></NameAndEmail>
        <ProfilePhoto></ProfilePhoto>
      </HeaderInfo>
    </Header>
  )
}
