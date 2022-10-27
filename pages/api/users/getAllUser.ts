import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllUser } from '../../../src/backend/resources/users/user.service'
import { GetAllUserInterface } from '../../../src/backend/resources/users/user.interface'

type Data = {
    users: GetAllUserInterface[]
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>){
    try{
        const users:GetAllUserInterface[] = await getAllUser()
        res.status(200).json({ users: users })
    }
    catch(err: any){
        res.status(500).send(err.message)
    }  
}