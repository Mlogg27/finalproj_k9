import Link from "next/link";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className='flex flex-col mx-[30px]'>
      <Link href='/admin/login' className='flex justify-center items-center w-[100px] mx-[20px] my-[10px]'>
        <img src='/images/logoSP.png' alt='logo' className='w-full object-cover'/>
        <span className='font-medium'>SCRAPPLAN</span>
      </Link>
      {children}
    </div>
  );
}