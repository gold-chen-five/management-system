import { serialize } from "cookie"
import type { NextApiRequest,NextApiResponse } from "next"
import jwt from 'jsonwebtoken'
import TokenInterface from '../../interface/token.interface'
import { verifyToken } from '../../utils/auth/token'

export const setCookie = (res: NextApiResponse,token: string) => {
    const serialised = serialize('token', token, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV !== "development",//set cookie https or http
    })
    res.setHeader('Set-Cookie', serialised)
}

export const deleteCookie = (res: NextApiResponse, cookieName: string) => {
    const serialised = serialize(`${cookieName}`,'',{
        maxAge: -1,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV !== "development",//set cookie https or http
    })
    console.log('logout cookie')
    res.setHeader('Set-Cookie', serialised)
    //res.writeHead(302, { Location: '/api/users/logout' });
    //res.end()
}

export const cookieMiddleware = async (req: NextApiRequest):Promise<jwt.VerifyErrors | TokenInterface | Error> => {
    const { cookies } = req
    const { token } = cookies

    return new Promise(async (resolve,reject) => {
        try{
            if(token === undefined || token === null) throw new Error('token not found')
            const payload: jwt.VerifyErrors | TokenInterface= await verifyToken(token)
            return resolve(payload)
        }
        catch(err: any){
            console.log(err.message)
            return reject(new Error(err.message))
        }
    }) 
}