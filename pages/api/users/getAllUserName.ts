import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllUserName } from '../../../src/backend/resources/users/user.service'

type Data = {
    names: string[]
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>){
    try{
        const names:string[] = await getAllUserName()
        res.status(200).json({ names: names })
    }
    catch(err: any){
        res.status(500).send(err.message)
    }  
}