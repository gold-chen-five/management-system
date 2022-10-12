import type { NextApiRequest,NextApiResponse } from "next";
import { returnedApproval } from '../../../src/backend/resources/posts/posts.service'
type data = {
    message: string
}
export default async function handler(req:NextApiRequest,res:NextApiResponse<data>){
        await returnedApproval(req,res)
}