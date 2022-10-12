import React from 'react'
import { ApplicationListInterface } from '../../interface/posts.interface'

const ItemInfo:React.FC<{item: ApplicationListInterface | undefined, setItemClick:React.Dispatch<React.SetStateAction<boolean>>}> = ({item,setItemClick}) => {
  function convertDate(date:string | undefined){
    if(date === undefined) return
    return date.split('T')[0]
  }
  return (
    <div className='w-full h-full flex flex-col items-center pt-10 space-y-4'>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>項次: {item?.line}</p>
      </div>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>項目: {item?.item}</p>
      </div>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>規格: {item?.specification}</p>
      </div>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>專案項目: {item?.project}</p>
      </div>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>序號: {item?.serialNum}</p> 
      </div>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>借出日期: {convertDate(item?.borrowDate)}</p>  
      </div>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>申請者: {item?.applicant}</p>
      </div>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>{item?.bring}</p>  
      </div>
      <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
        <p>{item?.returnBack}</p>
      </div>
      {
        item?.returnBack === "歸還" && 
          <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
            <p>歸還日期: {convertDate(item?.returnDate)}</p>
          </div>
      }

      {
        item?.returnBack === "其他" &&
          <div className='flex items-center bg-[#27272A] w-1/2 h-10 border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'>
              <p>{item?.otherReason}</p> 
          </div>
      }
      <button className='w-1/3 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center'
        onClick={() => setItemClick(false)}
      >返回</button>
    </div>
  )
}

export default ItemInfo