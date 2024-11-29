"use client"

import { UploadImageBox, CustomButton, CustomInput, VerifyProcessBar } from "@/components";
import React from "react";

export default function UploadIdentityPage () {
  const [vehicleImg, setVehicleImg] = React.useState('');
  const [vehicleImgRC, setvehicleImgRC] = React.useState('');

  return (
    <div className='flex flex-col justify-center items-center '>
      <VerifyProcessBar process={100} step={3} totalStep={3} />
      <h1 className="text-center mt-[30px] font-semibold text-[26px]">
        Set up your vehicle
      </h1>
      <span className="mb-[40px] text-center flex justify-center items-center text-[#9E9E9E] text-sm">
        Please upload information of you vehicle
      </span>
      <CustomInput type={'text'} label={'Vehicle Plate Number'} isPassword={false} name={'vehiclePlateNumber'}/>
      <CustomInput type={'text'} label={'Color'} isPassword={false} name={'vehicleColor'}/>
      <div className='flex flex-col justify-center items-center mt-[25px] gap-y-[10px] w-[90%] mx-auto mb-[40px]'>
        <UploadImageBox onChange={setVehicleImg} width={'100%'} height={150} image={vehicleImg} label={'Vehicle`s image'}/>
        <UploadImageBox onChange={setvehicleImgRC} width={'100%'} height={150} image={vehicleImgRC} label={'Vehicle`s RC image'}/>
      </div>
      <CustomButton name={'Save & Continue'} bgColor={'#2c2c2c'} tColor={'#fff'}/>
    </div>
  )
}


