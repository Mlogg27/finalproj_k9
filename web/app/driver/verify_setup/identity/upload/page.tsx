"use client"

import { UploadImageBox, CustomButton } from "@/components";
import React from "react";

export default function UploadIdentityPage () {
  const [frontImg, setFrontImg] = React.useState('');
  const [backImg, setBackImg] = React.useState('');


  return (
    <>
      <span className="mr-auto ml-[5%] text-sm font-semibold ">Upload driver`s license</span>
      <div className='flex mx-auto gap-x-[20px] mt-[25px] mb-[40vh]'>
        <UploadImageBox onChange={setFrontImg} width={160} height={120} image={frontImg} name={'Front side'}/>
        <UploadImageBox onChange={setBackImg} width={160} height={120} image={backImg} name={'Back side'}/>
      </div>
      <CustomButton name={'Verify ID card'} bgColor={'#2C2C2C'} tColor={'#fff'}/>

    </>
  )
}


