// import { setCookie as setCookieClient } from 'nookies'
import { verify, JwtPayload, VerifyOptions } from 'jsonwebtoken'

interface TokenData {
  user: string
}

export function validateToken(token: string): TokenData | null {
  // console.log('Validating token:', token)
  try {
    const decoded = verify(token, process.env.JWT_SECRET!, {
      algorithms: ['HS256'],
    } as VerifyOptions) as JwtPayload
    return { user: decoded.email } as TokenData
  } catch (err) {
    console.error('Error validating token:', err)
    return null
  }
}
