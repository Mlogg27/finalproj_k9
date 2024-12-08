"use client"
import React, { useEffect, useState } from "react";
import { VerifyProcessBar, VerifyCodeField, CustomButton } from "@/components";
import Link from 'next/link';

export default function EmailVerifyPage() {
  const [count, setCount] = useState(30);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count]);

  const onClick = () =>{

  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <VerifyProcessBar process={33}
                        step={1}
                        totalStep={3} />
      <h1 className="text-center mt-[30px] font-semibold text-[26px]">
        Verify Email
      </h1>
      <span className="mb-[70px] flex justify-center items-center text-[#9E9E9E] text-sm">
        Enter the 6-digit code we sent to *********
      </span>
      <VerifyCodeField/>
      <div className="mt-[50px]  text-center text-sm mb-[25px]">
        <span>Didn’t receive a code?</span>
        <br />
        {count > 0 ? (
          <span className="font-semibold">Resend in {count} seconds</span>
        ) : (
          <Link href={'#'} className="underline font-semibold cursor-pointer">Resend Code here!</Link>
        )}
      </div>
      <CustomButton name={'Verify Code'}
                    bgColor={"#2c2c2c"}
                    tColor={'#fff'}
                    onClick={onClick}/>
      <span className='mt-[95%] text-[#656565]'>Need help? <Link className='underline font-semibold' href={'#'}>Contact Support</Link></span>
    </div>
  );
}
