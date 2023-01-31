import type { NextPage,GetServerSideProps } from 'next'
import React,{useLayoutEffect,useState,useEffect,useContext} from 'react'
import { ApplicationListInterface } from '../../frontend/interface/posts.interface'
import ListItemList from './managerDashboard/ListItem'
import { v4 as uuidv4 } from 'uuid';
import ItemInfo from './pulic/ItemInfo';
import ShowApplicationList from '../components/managerDashboard/ShowApplicationList'

function ManagerDashboard() {
  
  const [userNames,setUserNames] = useState<string[] | undefined>()
  const [userName,setUserName] = useState<string>("all")
  const [approval,setApproval] = useState<string>('all')
  const [applicationList,setApplicationList] = useState<ApplicationListInterface[] | undefined>()
  const [itemInfo,setItemInfo] = useState<ApplicationListInterface | undefined>()
  const [itemClick,setItemClick] = useState<boolean>(false)

  useEffect(() => {
    async function getApplicationList(){
      const res = await fetch('/api/posts/getApplicationList',{
        method: 'POST',
        body: JSON.stringify({userName,approval}),
        headers: {'Content-Type': 'application/json'}
      })
      const {list} = await res.json()
      setApplicationList(list)
    }
    getApplicationList()

  },[userName,approval])

  useLayoutEffect(() => {
    async function getAllUserName(){
      const res = await fetch('/api/users/getAllUserName')
      const {names} = await res.json()
      setUserNames(names)
    }
    getAllUserName()
  },[])

  return (
    <main className='w-full min-h-screen'>
      {
        itemClick ? <ItemInfo item={itemInfo} setItemClick={setItemClick}/> : 
        (
          <div className='w-full h-full flex sm:flex-col-reverse sm:items-center'>
            <ShowApplicationList applicationList={applicationList} setItemInfo={setItemInfo} itemClick={itemClick} setItemClick={setItemClick}/>
            <div className='w-1/5 mr-6 mt-10 space-x-4 sm:mr-0 sm:mt-20 sm:w-4/5 sm:flex sm:justify-center'>
              <select name="" id="" className='bg-[#27272A] w-1/3 h-8 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                onChange={(e) => setApproval(e.target.value)}
              >
                <option value="all">全部</option>
                <option value="returned">已歸還</option>
                <option value="approval">已簽核(未歸還)</option>
                <option value="unapproval">未簽核</option>
              </select>
              <select name="" id="" className='bg-[#27272A] w-1/3 h-8 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                onChange={(e) => setUserName(e.target.value)}
              >
                <option value="all">全部</option>
                {
                  userNames?.map((name,item) => <option value={name} key={item}>{name}</option>)
                }
              </select>
            </div>
          </div>
        )
      }
    </main>
  )
}

export default ManagerDashboard
