import type { NextPage } from 'next'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
const Signin: NextPage = () => {
  const router = useRouter()
  const [email,setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)

  async function login(){
    if(email === undefined || password === undefined)  return 
    const notification = toast.loading('Minting...', {
      style: {
          background: 'white',
          color: 'green',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '20px'
      }
    })
    try{
      const res = await fetch('/api/users/signin',{
        method: 'POST',
        body: JSON.stringify({email,password}),
        headers: {'Content-Type': 'application/json'}
      })
      
      if(res.status === 200){
        toast('登入成功',{
          duration: 3000,
          style:{
              background: '#79FF79',
              color: 'white',
              fontWeight: 'bolder',
              fontSize: '17px',
              padding: '20px'
          }
        })
        setEmail('')
        setPassword('')
        setTimeout(() => router.push('/dashboard'),1000)
      }else{
        const info = await res.json()
        throw new Error(info)
      }
    }
    catch(err: any){
      toast('登入失敗',{
        duration: 5000,
        style:{
            background: '#FF5151',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px'
        }
      })
      setEmail('')
      setPassword('')
    }
    finally{
      toast.dismiss(notification)
    }
  }

  return (
    <>
      <main className='bg-[#202023] h-screen w-full justify-center items-center flex'>
        <Toaster position='bottom-center'/>
        <div className='bg-[#27272A] h-1/3 w-1/4 border-[#3F3F46] border rounded-lg flex flex-col justify-center items-center'>
          <input type="text" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none mb-4 text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
            placeholder='信箱'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <input type="password" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none mb-6 text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
            placeholder='密碼'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <button className='w-1/3 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center'
            onClick={() => login()}
          >登入</button>
        </div>
      </main>
    </>
  )
}

export default Signin
