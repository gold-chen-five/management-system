import type { NextApiRequest,NextApiResponse } from "next";
import { getApplicationList } from '../../../src/backend/resources/posts/posts.service'
import {ApplicationListInterface} from '../../../src/backend/resources/posts/posts.interface'

type Data = {
    list: ApplicationListInterface[]
}

type Fail = {
    message: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data | Fail>){
    try{
        const list = await getApplicationList(req)
        res.status(200).json({list: list})
    }
    catch(err){
        res.status(500).json({message: 'list get fail'})
    }
    
}