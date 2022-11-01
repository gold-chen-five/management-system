import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { sendEmail } from '../../../src/backend/resources/email/email.service'
type Data = {
  message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try{
        if(req.method !== 'POST') throw new Error()
        await sendEmail(req)
        res.status(200).json({ message: 'successful' })
    }
    catch(err: any){
        res.status(500).send(err.message)
    }  
}
