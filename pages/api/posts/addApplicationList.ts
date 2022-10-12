import type { NextApiRequest, NextApiResponse } from 'next'
import { addApplicationList } from '../../../src/backend/resources/posts/posts.service'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try{
        await addApplicationList(req)
        res.status(200).json({ name: 'John Doe' })
    }
    catch(err: any){
        res.status(500).send(err.message)
    }  
}
