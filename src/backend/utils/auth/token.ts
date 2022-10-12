import jwt from 'jsonwebtoken'
import {UserInterface} from '../../resources/users/user.interface'
import TokenInterface from '../../interface/token.interface'

export const createToken = (user: UserInterface): string => {
    return jwt.sign({id:user._id,name:user.name}, process.env.JWT_SECRET as jwt.Secret,{
        expiresIn: '365d'
    })
}

export const verifyToken = async (token: string):Promise<jwt.VerifyErrors | TokenInterface> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
            if(err)  return reject(err)
            
            resolve(payload as TokenInterface)
        })
    })
}
