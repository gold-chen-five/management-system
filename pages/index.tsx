import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
const Home: NextPage = () => {
  const router = useRouter()
  const enterDashBoard = () => {
    const notification = toast.loading('進入中...', {
      style: {
          background: 'white',
          color: 'green',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '20px'
      }
    })
    router.push('/dashboard').then(() => toast.dismiss(notification))
  }

  return (
    <div >
      <Head>
        <title>Phalanity</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/phalanity.ico" />
        <link
          rel="preload"
          href="/font/HanaMinA.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
      </Head>

      <main className='w-full h-screen bg-[#202023] flex justify-center items-center space-x-24 sm:flex-col sm:space-x-0'>
        <Toaster position='bottom-center'/>
        <Image src="/LOGO.png" alt="" width={600} height={400} className="rounded-2xl"/>
        <div className='w-1/5 space-y-14 sm:w-2/3'>
          <p className='text-white font-fontJapan font-bold text-4xl w-full text-center'>出借系統</p>
          <div className='flex space-x-4'>
            <div className='bg-[#34343e] w-1/2 h-14 rounded-lg font-fontJapan font-bold text-[#D4D4D2] flex justify-center items-center hover:bg-[#191c1e] cursor-pointer'
              onClick={enterDashBoard}
            >
              <p className=''>點我進入</p>
            </div>
            <a href="https://www.phalanity.com.tw" className='bg-[#F3D621] w-1/2 h-14 rounded-lg font-fontJapan font-bold text-[#202023] flex justify-center items-center hover:bg-[#FFDC35]'>
              <p className=''>官網</p>
            </a>
          </div>
          
        </div>
       
      </main>
    </div>
  )
}

export default Home

export const getStaticProps:GetStaticProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}
