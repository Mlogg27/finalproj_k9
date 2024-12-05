"use client"

import { UploadImageBox, CustomButton, CustomAlert } from "@/components";
import React from "react";

export default function UploadIdentityPage () {
  const [frontImg, setFrontImg] = React.useState('');
  const [backImg, setBackImg] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error"
  >("success");


  return (
    <>
      <span className="mr-auto ml-[5%] text-sm font-semibold ">Upload driver`s license</span>
      <div className='flex mx-auto gap-x-[20px] mt-[25px] mb-[40vh]'>
        <div className='flex flex-col justify-center items-center gap-y-[5px]'>
          <UploadImageBox onChange={setFrontImg} width={160} height={120} image={frontImg} name={'firstImg'}/>
          <span>Front Side</span>
        </div>
        <div className='flex flex-col justify-center items-center gap-y-[5px]'>
          <UploadImageBox onChange={setBackImg} width={160} height={120} image={backImg} name={'secondImg'}/>
          <span >Back Side</span>
        </div>
      </div>
      <CustomButton setOpen={setOpen}
                    setAlertMessage={setAlertMessage}
                    setAlertSeverity={setAlertSeverity}
                    name={'Verify ID card'}
                    bgColor={'#2C2C2C'}
                    tColor={'#fff'}
                    necessaryFields={['firstImg', 'secondImg']}/>

      <CustomAlert
        setOpen={setOpen}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
        open={open}
      />
    </>
  )
}


