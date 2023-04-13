import Image from 'next/image'
import {
  Header,
  HeaderInfo,
  HeaderTitle,
  NameAndEmail,
  ProfilePhoto,
} from './styles'

import logo from '../../../../public/images/LOGO CORPUSFIT-2.png'

export const HeaderPage = () => {
  return (
    <Header>
      <HeaderTitle>
        <Image src={logo} alt="logo" width={100} />
        {/* <TextHeader>Academia Corpus</TextHeader> */}
      </HeaderTitle>
      <HeaderInfo>
        <NameAndEmail></NameAndEmail>
        <ProfilePhoto></ProfilePhoto>
      </HeaderInfo>
    </Header>
  )
}
