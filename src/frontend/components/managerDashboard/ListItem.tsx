import React,{useEffect, useState,useContext} from "react"
import { ApplicationListInterface } from '../../interface/posts.interface'
import ItemInfo from "../pulic/ItemInfo"
import { UserContext } from '../../public/reactUseContext'
import { UserInterface } from '../../../backend/resources/users/user.interface'
const ListItemList:React.FC<{
    item: ApplicationListInterface,
    setItemInfo: React.Dispatch<React.SetStateAction<ApplicationListInterface | undefined>>,
    itemClick: boolean,
    setItemClick: React.Dispatch<React.SetStateAction<boolean>>
}> = ({item,setItemInfo,itemClick,setItemClick}) => {
    const user: UserInterface | undefined = useContext(UserContext)
    const [bgColor,setBgcolor] = useState('')
    const returnProduct = async (item: ApplicationListInterface) => {
        try {
          const res = await fetch('/api/posts/returnedApproval',{
            method: 'POST',
            body: JSON.stringify({id: item._id}),
            headers: {'Content-Type': 'application/json'}
          })
          
          if(res.status === 200){
            setBgcolor('bg-[#5ba3ec]')
            const email = await getUserEmail(item.user_id)

            await fetch('api/email/sendEmail',{
                method: 'POST',
                body: JSON.stringify({clientEmail: email,method: '簽核同意',text: `${item.item}`}),
                headers: {'Content-Type': 'application/json'}
            })
          }else{
            throw new Error('accept approval fail ')
          }
        }
        catch(err:any) {
          console.log(err.message)
        }
    }

    const getUserEmail = async (user_id:string) => {
        const res = await fetch('/api/users/getUser',{
            method: 'POST',
            body: JSON.stringify({id: user_id}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        const email = data.user.email
        return email
    }

    const acceptApproval = async (item: ApplicationListInterface) => {
        try {
            const res = await fetch('/api/posts/acceptApproval',{
                method: 'POST',
                body: JSON.stringify({id: item._id}),
                headers: {'Content-Type': 'application/json'}
            })
            if(res.status === 200){
                setBgcolor('bg-[#04AA6D]')
                const email = await getUserEmail(item.user_id)

                await fetch('api/email/sendEmail',{
                    method: 'POST',
                    body: JSON.stringify({clientEmail: email,method: '簽核同意',text: `${item.item}`}),
                    headers: {'Content-Type': 'application/json'}
                })
            }else{
                throw new Error('accept approval fail ')
            }
        }
        catch(err:any) {
            console.log(err.message)
        }
    }

    const disagreeApproval = async (id:string) => {
        try {
            const res = await fetch('/api/posts/disagreeApproval',{
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: {'Content-Type': 'application/json'}
            })
            if(res.status === 200){
                setBgcolor('bg-[#FF5151]')
            }else{
                throw new Error('accept approval fail ')
            }
        }
        catch(err:any) {
            console.log(err.message)
        }
    }

    const itemOnclick = () => {
        setItemInfo(item)
        setItemClick(true)
    }

    useEffect(() => {
        item.returned ? setBgcolor('bg-[#5ba3ec]') : 
            item.approval ? setBgcolor('bg-[#04AA6D]') : setBgcolor('bg-[#FF5151]')
    },[])
   
    
    return(
        <div className='w-full flex justify-end space-x-4 sm:flex-col sm:items-center sm:space-x-0 sm:space-y-2 sm:mb-2'>
            <div className={`${bgColor} w-3/5 h-10 text-[#D4D4D2]  border border-[#3F3F46] rounded-lg outline-none pl-4 pr-4 font-fontJapan font-semibold flex flex-col justify-center cursor-pointer text-center sm:w-4/5 sm:h-fit sm:min-h-[3rem] sm:py-2`}
                onClick={itemOnclick}
            >
                {item.item} / {item.applicant} / {item.project}
            </div>
            <div className="w-1/4 flex justify-center space-x-4 sm:w-full">
                <button className='w-20 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                onClick={() => returnProduct(item)}
                >歸還</button>
                <button className='w-20 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                onClick={() => acceptApproval(item)}
                >簽核同意</button>
                <button className='w-20 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                onClick={() => disagreeApproval(item._id)}
                >未簽核</button>
            </div>
           
        </div>
    )

}

export default ListItemList