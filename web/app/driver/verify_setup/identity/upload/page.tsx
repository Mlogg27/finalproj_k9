"use client"

import { UploadImageBox, CustomButton } from "@/components";
import React from "react";

export default function UploadIdentityPage () {
  const [image1, setImage1] = React.useState('');
  const [image2, setImage2] = React.useState('');


  return (
    <>
      <span className="mr-auto ml-[15px] text-sm font-semibold ">Upload driver`s license</span>
      <div className='flex mx-auto gap-x-[20px] mt-[25px] mb-[40vh]'>
        <UploadImageBox onChange={setImage1} width={160} height={120} image={image1} name={'Front side'}/>
        <UploadImageBox onChange={setImage2} width={160} height={120} image={image2} name={'Back side'}/>
      </div>
      <CustomButton name={'Verify ID card'} bgColor={'#2C2C2C'} tColor={'#fff'}/>

    </>
  )
}


