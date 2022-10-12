import React,{useEffect,useState} from 'react'
import { ApplicationListInterface } from '../interface/posts.interface'
import { v4 as uuidv4 } from 'uuid';
import ItemInfo from './pulic/ItemInfo';
const UserDashboard: React.FC<{id:string,name:string}> = ({id,name}) => {
  const [bgColor,setBgcolor] = useState('')
  const [approval,setApproval] = useState<string>('all')
  const [applicationList,setApplicationList] = useState<ApplicationListInterface[] | undefined>()
  const [itemClick,setItemClick] = useState<boolean>(false)
  const [itemInfo,setItemInfo] = useState<ApplicationListInterface | undefined>()

  async function getApplicationList(){
    const res = await fetch('/api/posts/getApplicationList',{
      method: 'POST',
      body: JSON.stringify({userName: name,approval: approval}),
      headers: {'Content-Type': 'application/json'}
    })
    const {list} = await res.json()
    setApplicationList(list)
  }

  const itemOnclick = (item: ApplicationListInterface) => {
    setItemInfo(item)
    setItemClick(true)
  }

  useEffect(() => {
    getApplicationList()
  },[approval])

  return (
    <main className='w-full h-full pt-14'>
      {
        itemClick ? <ItemInfo item={itemInfo} setItemClick={setItemClick}/> : 
        <div className='w-full h-full flex'>
          <div className='flex flex-col items-center w-4/5 space-y-4'>
          {
            applicationList?.map((item,i) => 
              <div key={uuidv4()} 
                className={
                  `${item.returned ? 'bg-[#5ba3ec]' : item.approval ? 'bg-[#04AA6D]' : 'bg-[#FF5151]'} w-3/5 h-10 text-[#D4D4D2]  border border-[#3F3F46] rounded-lg outline-none  pl-4 pr-4 font-fontJapan font-semibold flex flex-col justify-center cursor-pointer text-center`
                }
                onClick={() => itemOnclick(item)}
              >
                {item.item} / {item.applicant} / {item.project}
              </div>
            )
          }
          </div>
    
          <div className='w-1/5'>
            <select name="" id="" className='bg-[#27272A] w-1/3 h-8 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
              onChange={(e) => setApproval(e.target.value)}
            >
              <option value="all">全部</option>
              <option value="returned">已歸還</option>
              <option value="approval">已簽核(未歸還)</option>
              <option value="unapproval">未簽核</option>
            </select>
          </div>
        </div>
          
      }
     
    </main>
    
  )
}

export default UserDashboard