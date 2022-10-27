import type { NextApiRequest, NextApiResponse } from 'next'
import { updateUser } from '../../../src/backend/resources/users/user.service'

type Data = {
  message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try{
        await updateUser(req)
        res.status(200).json({ message: 'successful' })
    }
    catch(err: any){
        res.status(500).send(err.message)
    }  
}
