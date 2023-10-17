import * as jose from 'jose'
import { headers } from 'next/headers'

export const getSecretKey: () => string = () => {
    const SECRET_KEY = process.env.SECRET_KEY

    if (!SECRET_KEY || SECRET_KEY.length === 0) throw new Error('The enviroment variable SECRET_KEY is not set!')

    return SECRET_KEY
}

export const authHeader = () => {
    const headersAuthorization = headers()
    const auth = headersAuthorization.get('Authorization')
    if (!auth) return false
    return true
}

export const verifyAuth = async (Jwt: string) => {
    try {
        const verified = await jose.jwtVerify(Jwt, new TextEncoder().encode(getSecretKey()))

        // if (!!verified.payload.exp && verified.payload.exp < Math.floor(Date.now() / 1000) + fiveHoursInSeconds) {
        //   console.log("expirou")
        //   return null;
        // }
        return verified.payload
    } catch (error) {
        throw new Error(`Your Jwt has expired ${error}`)
    }

    // const verified = verify(Jwt, getSecretKey(),);

    // console.log("VERIFIED: " + verified);
    // return false;
}
