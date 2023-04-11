import Image from 'next/image'
import {
  Header,
  HeaderInfo,
  HeaderTitle,
  NameAndEmail,
  ProfilePhoto,
} from './styles'

import logo from '../../../../public/images/LOG CORPUS FIT PNG.png'

export const HeaderPage = () => {
  return (
    <Header>
      <HeaderTitle>
        <Image src={logo} alt="logo" width={150} />
        {/* <TextHeader>Academia Corpus</TextHeader> */}
      </HeaderTitle>
      <HeaderInfo>
        <NameAndEmail></NameAndEmail>
        <ProfilePhoto></ProfilePhoto>
      </HeaderInfo>
    </Header>
  )
}
