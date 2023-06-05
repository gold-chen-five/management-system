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
import { UserInterface } from '../src/backend/resources/users/user.interface'
import { UserContext } from '../src/frontend/public/reactUseContext'


const Dashboard: NextPage<{permission: string,id: string,name: string}> = ({permission,id,name}) => {
    const router = useRouter()
    const [selectDashboard,setSelectDashboard] = useState<string>('UserDashboard')
    const [menu,setMenu] = useState<boolean>(false)
    const [user,setUser] = useState<UserInterface | undefined>()

    const logout = async () => {
       try{
        const res = await fetch('/api/users/logout',{
            method: 'POST',
            body: JSON.stringify({key: 'static_key'}),
            headers: {'Content-Type': 'application/json'}
        })
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


    useEffect(() => setSelectDashboard(''),[])
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)")
        if(mediaQuery.matches){
            setMenu(false)
        }
    },[selectDashboard])
    useEffect(() => {
        async function fetchUser(){
            const res = await fetch('/api/users/getUser',{
                method: 'POST',
                body: JSON.stringify({id: id}),
                headers: {'Content-Type': 'application/json'}
            })
            const data = await res.json()
            setUser(data.user)
        }
        fetchUser()
    },[])

    return (
        <>
            <UserContext.Provider value={user}>
                <main className='w-full min-h-screen flex bg-[#202023]'>
                    <div className={`fixed top-0 left-0 bottom-0 w-full bg-[#E8E8E8] z-20 transition-transform duration-500 ease-in-out ${menu ? 'translate-y-0':'-translate-y-full'}`}></div>
                    <section className='w-[15%] h-full sm:w-0'>
                        <div className={`font-fontJapan font-bold text-lg cursor-pointer hidden fixed top-0 right-0 mr-6 mt-4 z-40 sm:block ${menu ? 'text-black':'text-[#D4D4D2]'} transition-text duration-500 ease-in-out`}
                            onClick={() => setMenu(!menu)}
                        >+選單</div>
                        <div className={`w-full h-full flex flex-col items-center space-y-4 pt-10 sm:z-30 sm:text-black sm:fixed sm:top-0 sm:left-0 sm:items-start sm:pl-10 sm:space-y-0 sm:pt-28 ${menu ? 'sm:flex' : 'sm:hidden'}`}>
                            <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035] sm:border-none sm:text-black sm:text-left sm:h-8 sm:hover:bg-transparent'
                                onClick={() => setSelectDashboard('Rent')}
                            >
                                租借表單申請
                            </button>
                            <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035] sm:border-none sm:text-black sm:text-left sm:h-8 sm:hover:bg-transparent'
                                onClick={() => setSelectDashboard('UserDashboard')}
                            >
                                使用者版面
                            </button>
                            {
                                permission === 'manager' && <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035] sm:border-none sm:text-black sm:text-left sm:h-8 sm:hover:bg-transparent'
                                    onClick={() => setSelectDashboard('ManagerDashboard')}
                                >
                                    管理者版面
                                </button>
                            }
                            {
                                permission === 'manager' && <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035] sm:border-none sm:text-black sm:text-left sm:h-8 sm:hover:bg-transparent'
                                    onClick={() => setSelectDashboard('AddUserDashboard')}
                                >
                                    更改使用者
                                </button>
                            }
                            <button className='w-1/2 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035] sm:border-none sm:text-black sm:text-left sm:h-8 sm:hover:bg-transparent'
                                onClick={logout}
                            >
                                登出
                            </button>
                        </div>
                        
                    </section>
                    <section className='w-[85%] h-full sm:w-full'>
                    { 
                        selectDashboard === "UserDashboard" ?
                                <UserDashboard id={id} name={name}/> : selectDashboard === "ManagerDashboard" ?
                                    <ManagerDashboard/> :   selectDashboard === "AddUserDashboard" ?
                                        <AddUserDashboard/> : <Rent id={id} name={name}/> 
                    }
                    </section>
                </main>
            </UserContext.Provider>
            
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
