import type { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from '../../../src/backend/resources/users/user.service'
import { GetAllUserInterface } from '../../../src/backend/resources/users/user.interface'

type Data = {
    user: GetAllUserInterface
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>){
    try{
        const user:GetAllUserInterface = await getUser(req)
        res.status(200).json({ user: user })
    }
    catch(err: any){
        res.status(500).send(err.message)
    }  
}