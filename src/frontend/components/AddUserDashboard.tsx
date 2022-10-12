import React,{useState} from 'react'
import toast, { Toaster } from 'react-hot-toast'
function AddUserDashboard() {
  const [name,setName] = useState<string | undefined>()
  const [email,setEmail] = useState<string | undefined>()
  const [password,setPassword] = useState<string | undefined>()
  const [permission,setPermission] = useState<string | undefined>('manager')
  const OnclickAddUser = async () => {
    if(name === undefined || email === undefined || password === undefined || permission === undefined){
      toast('你有資訊未填',{
        duration: 1500,
        style:{
            background: '#FF5151',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px'
        }
      })
      return 
    }
    try{
      const res = await fetch('/api/users/addNewUser',{
        method: 'POST',
        body: JSON.stringify({
          name,email,password,permission
        }),
        headers : {'Content-Type': 'application/json'}
      })

      if(res.status === 200){
        toast('新增成功',{
          duration: 1500,
          style:{
              background: '#04AA6D',
              color: 'white',
              fontWeight: 'bolder',
              fontSize: '17px',
              padding: '20px'
          }
        })
        setName('')
        setEmail('')
        setPassword('')
        setPermission('')
      }
      else{
        throw new Error('add user fail')
      }
    }
    catch(err){
      toast('新增失敗',{
        duration: 1500,
        style:{
            background: '#FF5151',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px'
        }
      })
      setName('')
      setEmail('')
      setPassword('')
      setPermission('')
    }
    
  }

  return (
    <main className='flex flex-col items-center justify-center space-y-4 h-full w-full'>
      <Toaster position='top-center'/>
       <input type="text" className='bg-[#27272A] w-1/3 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
            placeholder='名字'
            onChange={e => setName(e.target.value)}
            value={name}
          />
       <input type="text" className='bg-[#27272A] w-1/3 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
            placeholder='信箱'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        <input type="text" className='bg-[#27272A] w-1/3 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
          placeholder='密碼'
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <select name="" id="" className='bg-[#27272A] w-1/3 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
          onChange={e => setPermission(e.target.value)}
        >
          <option value="manager">管理者</option>
          <option value="user">使用者</option>
        </select>
        <button className='w-1/3 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center'
          onClick={OnclickAddUser}
        >新增</button>
    </main>
  )
}

export default AddUserDashboard
