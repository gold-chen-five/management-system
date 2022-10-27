import type { NextApiRequest,NextApiResponse } from 'next'
import User from '../../models/user'
import {UserInterface,SigninInterface,GetAllUserInterface} from '../users/user.interface'
import connectMongo from '../../utils/connectMongo';
import hashPassword from '../../utils/auth/hashPassword';
import isValidPassword from '../../utils/auth/isValidPassword';
import { createToken } from '../../utils/auth/token'
import { setCookie } from '../../utils/auth/cookie';
import { Schema } from "mongoose"

export async function addUser(req: NextApiRequest){
    const body:UserInterface = req.body

    //connect mongo 
    await connectMongo()

    //create user
    try{
        const password = await hashPassword(body.password)
        const user = await User.create({
            name: body.name,
            email: body.email,
            password: password,
            permission: body.permission
        })
    }
    catch(err: any){
        throw new Error('email already exist')
    }
}

export async function updateUser(req: NextApiRequest){
    const body:UserInterface = req.body

    //connect mongo 
    await connectMongo()

    //update user
    try{
        const password = await hashPassword(body.password)
        const user = await User.findOne({email: body.email})
        user.password = password
        user.permission = body.permission
        await user.save()
    }
    catch(err: any){
        throw new Error('email already exist')
    }

} 

export async function signIn(req: NextApiRequest, res: NextApiResponse ){
    const body: SigninInterface = req.body

    //connect mongo 
    await connectMongo()

    //check and singin user
    try{
        const { email,password } = body
        const user = await User.findOne({ email })

        if(!user){
            throw new Error('Unable to find user with that email address')
        }
        
        if(await isValidPassword(password,user.password)){
            const jwtToken = createToken(user)
            setCookie(res,jwtToken)
        }else{
            throw new Error('wrong credential given')
        }
    }
    catch(err: any){
        throw new Error(err.message)
    }
}

export async function getPermission(id: Schema.Types.ObjectId):Promise<string>{
    //connect mongo 
    await connectMongo()

    return new Promise(async (resolve,reject) => {
        //get user permission
        try{
            const user = await User.findOne({ _id: id })
            return resolve(user.permission)
        }
        catch(err: any){
            return reject('user not found')
        }
    })
}
export async function getAllUser():Promise<GetAllUserInterface[]>{
    //connect mongo 
    await connectMongo()

    return new Promise(async(resolve,reject) => {
        try{
            const user = await User.find({},"-password")
            return resolve(user)
        }
        catch(err: any){
            return reject('user not found')
        }
    })
}

export async function getAllUserName():Promise<string[]>{
    //connect mongo 
    await connectMongo()

    function nameArray(users: UserInterface[]):string[]{
        const nameArr:string[] = []
        for(const user of users){
            nameArr.push(user.name)
        }
        return nameArr
    }

    return new Promise(async(resolve,reject) => {
        try{
            const user = await User.find()
            const nameArr = nameArray(user)
            return resolve(nameArr)
        }
        catch(err: any){
            return reject('user not found')
        }
    })
}