
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from '../../../src/backend/utils/auth/cookie'
type Data = {
  message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if(req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed here!' });

    if(req.body.key === 'static_key'){
        try{
            await deleteCookie(res,'token')
            return res.status(200).json({ message: 'logout' })
        }
        catch(err: any){
            return res.status(500).json({message: err.message})
        }  
    }

    return res.status(400).json({message: 'fail request'})
   
}
