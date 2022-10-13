import type { NextPage,GetServerSideProps } from 'next'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../src/backend/utils/auth/token'
import TokenInterface from '../src/backend/interface/token.interface'
import { getPermission } from '../src/backend/resources/users/user.service'
import { Schema, set } from "mongoose"
import Rent from '../src/frontend/components/Rent'
import UserDashboard from '../src/frontend/components/UserDashboard'
import ManagerDashboard from '../src/frontend/components/ManagerDashboard'
import AddUserDashboard from '../src/frontend/components/AddUserDashboard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Dashboard: NextPage<{permission: string,id: string,name: string}> = ({permission,id,name}) => {
    const router = useRouter()
    const [selectDashboard,setSelectDashboard] = useState<string>('UserDashboard')
    
    const logout = async () => {
       try{
        const res = await fetch('/api/users/logout')
        const resJ = await res.json()
        if( res.status === 200){
            router.push('/')
        }else{
            throw new Error('error')
        }
       }
       catch(err){
        router.push('/')
       }

    }

    useEffect(() => setSelectDashboard('Rent'),[])
    return (
        <>
            <main className='w-full min-h-screen h-screen flex bg-[#202023]'>
                <section className='w-[15%] h-full flex flex-col items-center space-y-4 pt-10'>
                    <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                        onClick={() => setSelectDashboard('Rent')}
                    >
                        租借表單申請
                    </button>
                    <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                        onClick={() => setSelectDashboard('UserDashboard')}
                    >
                        使用者版面
                    </button>
                    {
                        permission === 'manager' && <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                            onClick={() => setSelectDashboard('ManagerDashboard')}
                        >
                            管理者版面
                        </button>
                    }
                    {
                        permission === 'manager' && <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                            onClick={() => setSelectDashboard('AddUserDashboard')}
                        >
                            增加使用者
                        </button>
                    }
                    <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                        onClick={logout}
                    >
                        登出
                    </button>
                </section>
                <section className='w-[85%] h-full '>
                   { 
                    selectDashboard === "Rent" ? 
                        <Rent id={id} name={name}/> : selectDashboard === "UserDashboard" ?
                            <UserDashboard id={id} name={name}/> : selectDashboard === "ManagerDashboard" ?
                                <ManagerDashboard/> :   
                                    <AddUserDashboard/>
                   }
                </section>
            </main>
        </>
    )
}

export default Dashboard


export const getServerSideProps:GetServerSideProps = async ({req}) => {
    const reqCookie = cookie.parse(req.headers.cookie || "")
  
    try{
        const { token } = reqCookie
        if(token === undefined || token === null) throw new Error('token not found')
        const payload = await verifyToken(token) as TokenInterface
        const permission = await getUserPermission(payload.id)
        console.log(payload)
        return {
            props: {
                permission: permission,
                id: payload.id,
                name: payload.name
            }
        }
    }
    catch(err: any){
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: "/sign-in",
        }
      }
    }
  }

  async function getUserPermission(id: Schema.Types.ObjectId): Promise<string>{
    return new Promise(async(resolve,reject) => {
        try{
            const permission:string = await getPermission(id)
            resolve(permission)
        }
        catch(err: any){
            reject(err.message)
        }
    })
  }
