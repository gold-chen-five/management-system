import type { NextApiRequest,NextApiResponse } from 'next'
import ApplicationList from '../../models/applicationList'
import connectMongo from '../../utils/connectMongo';
import { ApplicationListInterface,GetApplicationList,ApplicationListId } from './posts.interface'
import { Schema,Types } from "mongoose"

export async function addApplicationList(req: NextApiRequest){
    const body: ApplicationListInterface = req.body
    
    //connect mongo 
    await connectMongo()

    //create post
    try{
        const posts = await ApplicationList.create({
            user_id: new Types.ObjectId(body.user_id),
            line: body.line,
            item: body.item,
            specification: body.specification,
            project: body.project,
            serialNum: body.serialNum,
            borrowDate: new Date(body.borrowDate),
            applicant: body.applicant,
            bring: body.bring,
            returnBack: body.returnBack,
            returnDate: body.returnDate === undefined ? '':new Date(body.returnDate),
            otherReason: body.otherReason,
            approval: false,
            returned: false
        })
    }  
    catch(err: any){
        console.log(err.message)
        throw new Error('add post error')
    }
}

export async function getApplicationList(req: NextApiRequest):Promise<ApplicationListInterface[]>{
    const body: GetApplicationList = req.body

    //connect mongo 
    await connectMongo()

    //convert approval 
    const convertApprovalToBoolean = (approval:string):boolean => approval==="approval" ? true : false

    return new Promise(async (resolve,reject) => {
        //select list by username and approval
        const { userName, approval} = body
        try{
            const approvalB = convertApprovalToBoolean(approval)
            let posts:ApplicationListInterface[] = []
            if(userName === "all" && approval === "all"){
                posts = await ApplicationList.find()
            }else if(userName !== "all" && approval === "all"){
                posts = await ApplicationList.find({applicant: userName})
            }else if(userName === "all" && approval !== "all"){
                if(approval === 'returned'){
                    posts = await ApplicationList.find({approval: true,returned: true})
                }
                else{
                    posts = await ApplicationList.find({approval: approvalB,returned: false})
                }
                
            }else{
                if(approval === 'returned'){
                    posts = await ApplicationList.find({applicant: userName,approval: true,returned: true})

                }
                else{
                    posts = await ApplicationList.find({applicant: userName,approval: approvalB,returned: false})

                }

            }
            return resolve(posts)
        }
        catch(err){
            reject('find list fail')
        }
    })
}

export async function agreeApproval(req: NextApiRequest,res: NextApiResponse){

    const body:ApplicationListId = req.body

    //connect mongo 
    await connectMongo()
       
    try{
        const id = body.id
        const posts = await ApplicationList.updateOne({_id: id},{$set:{approval: true}})
        res.status(200).json({message: 'successful'})
    }
    catch(err:any){
        res.status(500).json({message: 'fail to call '})
    }


}

export async function disagreeApproval(req: NextApiRequest,res: NextApiResponse){
    const body:ApplicationListId = req.body

    //connect mongo 
    await connectMongo()
       
    try{
        const id = body.id
        const posts = await ApplicationList.updateOne({_id: id},{$set:{approval: false}})
        res.status(200).json({message: 'successful'})
    }
    catch(err:any){
        res.status(500).json({message: 'fail to call '})
    }

}

export async function returnedApproval(req: NextApiRequest,res: NextApiResponse){
    const body:ApplicationListId = req.body

    //connect mongo 
    await connectMongo()
       
    try{
        const id = body.id
        const posts = await ApplicationList.updateOne({_id : id},{$set:{returned: true}})
        res.status(200).json({message: 'successful'})
    }
    catch(err:any){
        res.status(500).json({message: 'fail to call '})
    }

}