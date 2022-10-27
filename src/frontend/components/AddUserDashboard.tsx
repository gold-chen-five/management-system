import React,{useState,useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { GetAllUserInterface } from '../../backend/resources/users/user.interface'

function AddUserDashboard() {
  const [name,setName] = useState<string | undefined>()
  const [email,setEmail] = useState<string | undefined>('')
  const [password,setPassword] = useState<string | undefined>()
  const [permission,setPermission] = useState<string | undefined>('manager')
  const [dashboardSelect,setDashboardSelect] = useState<string>('add')
  const [allUsers,setAllUsers] = useState<GetAllUserInterface[] | undefined>()

  const OnclickUser = async () => {
    console.log(name,email,password,permission)
    if(name === undefined || email === '' || password === undefined || permission === undefined){
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
      const apiUrl = dashboardSelect === 'update' ? '/api/users/updateUser' : '/api/users/addNewUser'
      const res = await fetch(apiUrl,{
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
  const dashboardOnclick = (select: string) => {
    if(select === 'add'){
      setDashboardSelect('add')
      setName(undefined)
    }else if(select === 'update'){
      setDashboardSelect('update')
      setName('emma')
    }
  }
  
  function findEmailByName(selectName: string){
    const result: GetAllUserInterface | undefined = allUsers?.find(({name}) => name === selectName)
    setEmail(result?.email)
  }

  useEffect(() => {
    async function getAllUser(){
      const res = await fetch('/api/users/getAllUser')
      const {users}:{users: GetAllUserInterface[]} = await res.json()
      setAllUsers(users)
    }
    getAllUser()
    
  },[])

  useEffect(() => {
    if(dashboardSelect === 'update'){
      findEmailByName('emma')
    }else{
      setEmail('')
    }
  },[allUsers,dashboardSelect])
  return (
    <main className='flex flex-col items-center justify-center space-y-4 h-full w-full'>
      <Toaster position='top-center'/>
      <div className='flex w-1/3 justify-center space-x-5'>
        <button className={`${dashboardSelect === 'add' ? 'bg-[#161617]' : 'bg-[#27272A]'}  w-1/3 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold`}
          onClick={() => dashboardOnclick('add')}
        >新增</button>
        <button className={` ${dashboardSelect === 'update' ? 'bg-[#161617]' : 'bg-[#27272A]'} w-1/3 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold`}
          onClick={() => dashboardOnclick('update')}
        >修改</button>
      </div>
      {
        dashboardSelect === 'update' ?
        <select name="" id="" className='bg-[#27272A] w-1/3 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
          onChange={(e) => findEmailByName(e.target.value)}
        >
          {
            allUsers?.map((user,item) => <option value={user.name} key={user._id}>{user.name}</option>)
          }
        </select> : 
        <input type="text" className='bg-[#27272A] w-1/3 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
          placeholder='名字'
          onChange={e => setName(e.target.value)}
          value={name}
        />
      }
      
      <input type="text" className='bg-[#27272A] w-1/3 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
          placeholder='信箱'
          onChange={e => setEmail(e.target.value)}
          value={email}
          disabled={dashboardSelect === 'update' ? true : false}
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
        onClick={OnclickUser}
      >{dashboardSelect === 'update' ? '修改' : '新增'}</button>
    </main>
  )
}

export default AddUserDashboard
