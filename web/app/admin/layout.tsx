"use client"
import Link from "next/link";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className='flex flex-col mx-[30px] justify-center items-center relative'>
      <Link href='/admin/login' className='flex justify-center absolute top-[20px] left-[20px] items-center w-[100px]'>
        <img src='/images/logoSP.png' alt='logo' className='w-full object-cover'/>
        <span className='font-medium'>SCRAPPLAN</span>
      </Link>
      <div className={'flex justify-center items-center mt-[120px]'}>
        {children}
      </div>
    </div>
  );
}