import React,{useState,useEffect} from 'react'
import DatePicker, { DateObject } from "react-multi-date-picker"
import type {Value} from "react-multi-date-picker"
import toast, { Toaster } from 'react-hot-toast'

const Rent:React.FC<{id:string,name:string}> = ({id,name}) => {
    const [line,setLine] = useState<string | undefined>()
    const [item,setItem] = useState<string | undefined>()
    const [specification,setSpecification] = useState<string | undefined>()
    const [project,setProject] = useState<string | undefined>()
    const [serialNum,setSerialNum] = useState<string | undefined>()
    const [borrowDate,setBorrowDate] = useState<string | null>()
    const [renderDate,setRenderDate] = useState<string>('借出日期')
    const [bring,setBring] = useState<string | undefined>('館內領用')
    const [returnBack,setReturnBack] = useState<string | undefined>('歸還')
    const [returnDate,setReturnDate] = useState<string | undefined>(undefined)
    const [renderReturnDate,setRenderReturnDate] = useState<string>('歸還日期')
    const [otherReason,setOtherReason] = useState<string | undefined>('')

    const convert = (e: any )=> {
        const dd = new Date(e)
        dd.setDate(dd.getDate() + 1)
        const dateString = new Date(dd).toISOString().split("T")[0]
        return dateString
    }

    const onClickDate = (e:any) => {
        const dateConvert = convert(e)
        setBorrowDate(dateConvert)
        setRenderDate(dateConvert)
    }
    
   const fetchApplicationList = async () => {
    const list = {
        user_id: id,
        line: line,
        item: item,
        specification: specification,
        project: project,
        serialNum: serialNum,
        borrowDate: borrowDate,
        applicant: name,
        bring: bring,
        returnBack: returnBack,
        returnDate: returnDate,
        otherReason: otherReason
    }

        try{
            const res = await fetch('/api/posts/addApplicationList',{
                method: 'POST',
                body: JSON.stringify(list),
                headers: {'Content-Type': 'application/json'}
            })
            if(res.status === 200){
                toast('申請成功',{
                    duration: 1500,
                    style:{
                        background: '#04AA6D',
                        color: 'white',
                        fontWeight: 'bolder',
                        fontSize: '17px',
                        padding: '20px'
                    }
                })
                setLine('')
                setItem('')
                setSpecification('')
                setProject('')
                setSerialNum('')
                setBorrowDate('')
                setBring('')
                setReturnBack('')
                setReturnDate('')
                setOtherReason('')
            }
            else{
                throw new Error('api call fail')
            }
        }
        catch(err){
            toast('申請失敗',{
                duration: 2000,
                style:{
                    background: '#FF5151',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px'
                }
            })
            setLine('')
            setItem('')
            setSpecification('')
            setProject('')
            setSerialNum('')
            setBorrowDate('')
            setBring('')
            setReturnBack('')
            setReturnDate('')
            setOtherReason('')
        }
    
   }
    const onClickApplication = async () => {
        if(
            line === undefined ||
            item === undefined ||
            specification === undefined ||
            project === undefined ||
            serialNum === undefined ||
            borrowDate === undefined ||
            bring === undefined ||
            returnBack === undefined
        ){
            if(returnBack === "歸還" ){
                if(returnDate === undefined){
                    toast('歸還日期沒填',{
                        duration: 1000,
                        style:{
                            background: '#FF5151',
                            color: 'white',
                            fontWeight: 'bolder',
                            fontSize: '17px',
                            padding: '20px',
                        }
                    })
                }
                return
            }
            toast('你有項目沒填',{
                duration: 1000,
                style:{
                    background: '#FF5151',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px',
                }
            })
            return
        }
        fetchApplicationList()
       
    }

    const onClickReturnDate = (e:any) => {
        const dateConvert = convert(e)
        setReturnDate(dateConvert)
        setRenderReturnDate(dateConvert)
    }
    
    useEffect(() => {
        setReturnDate(undefined)
        setRenderReturnDate('歸還日期')
    },[returnBack])

    return (
        <div className='w-full h-full flex flex-col items-center pt-10 space-y-4'>
            <Toaster position='top-center'/>
            <input type="text" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                placeholder='項次'
                onChange={e => setLine(e.target.value)}
                value={line}
            />
            <input type="text" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                placeholder='項目'
                onChange={e => setItem(e.target.value)}
                value={item}
            />
            <input type="text" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                placeholder='規格'
                onChange={e => setSpecification(e.target.value)}
                value={specification}
            />
            <input type="text" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                placeholder='專案項目'
                onChange={e => setProject(e.target.value)}
                value={project}
            />
            <input type="text" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                placeholder='序號'
                onChange={e => setSerialNum(e.target.value)}
                value={serialNum}
            />
            <div className='bg-[#27272A] w-1/2 h-10  border border-[#3F3F46] rounded-lg outline-none  pl-4 pr-4 font-fontJapan font-semibold flex flex-col justify-center cursor-pointer'>
                <DatePicker 
                    render={(value:any, openCalender:any) => {
                        return (
                            <div className='rounded-sm cursor-pointer box-border text-[#97979e]' onClick={openCalender}>
                                {renderDate}
                            </div>
                        )
                    }}
                    className='datepicker'
                    calendarPosition='bottom-center'
                    fixMainPosition={false}
                    fixRelativePosition={false}
                    placeholder="Please select a date"
                    value={borrowDate}
                    format="YYYY:MM:DD"
                    onChange={e => onClickDate(e)}
                    
                />
            </div>

            <select name="" id="" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                onChange={e => setBring(e.target.value)}
                value={bring}
            >
                <option value="館內領用">館內領用</option>
                <option value="館外攜出">館外攜出</option>
            </select>

            <select name="" id="" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                onChange={e => setReturnBack(e.target.value)}
                value={returnBack}
            >
                <option value="歸還">歸還(填寫歸還日期)</option>
                <option value="不歸還(列入個人)">不歸還(列入個人)</option>
                <option value="不歸還(列入專案)">不歸還(列入專案)</option>
                <option value="其他">其他</option>
            </select>
            
            {
                returnBack === "歸還" && 
                <div className='bg-[#27272A] w-1/2 h-10  border border-[#3F3F46] rounded-lg outline-none  pl-4 pr-4 font-fontJapan font-semibold flex flex-col justify-center cursor-pointer'>
                    <DatePicker 
                        render={(value:any, openCalender:any) => {
                            return (
                                <div className='rounded-sm cursor-pointer box-border text-[#97979e]' onClick={openCalender}>
                                    {renderReturnDate}
                                </div>
                            )
                        }}
                        className='datepicker'
                        calendarPosition='bottom-center'
                        fixMainPosition={false}
                        fixRelativePosition={false}
                        placeholder="Please select a date"
                        value={returnDate}
                        format="YYYY:MM:DD"
                        onChange={e => onClickReturnDate(e)}                   
                    />
                </div>
            }

            {
                returnBack === "其他" && 
                <input type="text" className='bg-[#27272A] w-1/2 h-10 placeholder-[#97979e] border border-[#3F3F46] rounded-lg outline-none text-[#D4D4D2] pl-4 pr-4 font-fontJapan font-semibold'
                    placeholder='其他的原因'
                    onChange={e => setOtherReason(e.target.value)}
                    value={otherReason}
                />
            }
            
            <button className='w-1/4 h-10 border border-[#3F3F46] rounded-lg font-fontJapan font-semibold text-[#D4D4D2] text-center hover:bg-[#303035]'
                onClick={onClickApplication}
            >申請</button>
        </div>
    )
}

export default Rent