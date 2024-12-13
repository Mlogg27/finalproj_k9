'use client'
import { CustomButton, CustomInput } from "@/components";
import Link from "next/link";
import * as React from "react";

export default function ResetPassPage(){
  const onClick = ()=>{}
  return (
    <>
      <div className='flex flex-col gap-y-[15px] w-[100%] justify-center items-center'>
        <h2 className='mt-[150px] text-xl font-semibold'>Reset Your Password</h2>
        <CustomInput type={'text'}
                     name={'email'}
                     label={'Email'}
                     autocomplete={'current-email'}
                     placeholder={'Your Email'}
                     isPassword={false} />
        <CustomButton name={'Continue'} onClick={onClick} bgColor={'#2c2c2c'} tColor={'white'} />
      </div>
      <span className="mt-[40vh] flex gap-x-[5px] text-gray-500">
        Back to Login Page
        <Link className="underline font-semibold" href="/driver/login">
          Click here
        </Link>
      </span>
    </>
  )
}