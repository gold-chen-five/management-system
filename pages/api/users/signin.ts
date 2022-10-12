import type { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from '../../../src/backend/resources/users/user.service'
type Data = {
  message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try{
        await signIn(req,res)
        res.status(200).json({ message: 'login successful' })
    }
    catch(err: any){
        res.status(500).json({message: err.message})
    }  
}
