import bcrypt from 'bcrypt'
export default async function isValidPassword(password:string, comparePassword: string):  Promise<Error | boolean>{
    return await bcrypt.compare(password, comparePassword)
}