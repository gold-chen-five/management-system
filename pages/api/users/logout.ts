
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from '../../../src/backend/utils/auth/cookie'
type Data = {
  message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try{
        await deleteCookie(res,'token')
        return res.status(200).json({ message: 'logout' })
    }
    catch(err: any){
        return res.status(500).json({message: err.message})
    }  
}
