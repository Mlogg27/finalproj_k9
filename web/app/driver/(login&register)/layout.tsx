export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className='mt-[55px] flex flex-col justify-center items-center'>
      <h1 className='font-semibold text-[26px]'>Welcome to Scrap Plan</h1>
      <span className='text-[#9E9E9E] text-sm'>Create an account or log in to join your orders</span>
      {children}
    </div>
  );
}