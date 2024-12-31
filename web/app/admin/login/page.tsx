"use client"
import { CustomInput , CustomButton} from "@/components";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";

export default function HomePage () {
  const router = useRouter();
  const inputtingValue = useSelector(getInputting);

  const onSubmit = () =>{
    const {email, password} = inputtingValue;

  }

  return (
    <div className='mt-[20px] justify-center items-center flex-col flex'>
      <h1 className=' font-semibold text-[46px]'>Welcome to Scrap Plan</h1>
      <span className=' text-[#9E9E9E] text-[20px]'>Please log in to join your orders</span>

      <CustomInput label='Email' name='email' type='text' placeholder='Your Email' autocomplete='current-email' isPassword={false}/>
      <CustomInput label='Password' name='password' type='password' placeholder='Your Password' autocomplete='current-password' isPassword={true}/>

      <span className={'flex w-full justify-center items-center mt-[20px]'}>
        <CustomButton name='Continue' onClick={onSubmit} tColor={'#fff'} bgColor={'#2c2c2c'}/>
      </span>
    </div>
  )
}