"use client"

import { UploadImageBox, CustomButton, CustomInput, VerifyProcessBar } from "@/components";
import React from "react";
import { useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";

export default function UploadIdentityPage () {
  const [vehicleImg, setVehicleImg] = React.useState('');
  const inputtingValue = useSelector(getInputting);

  const onSubmit = () =>{

    console.log(inputtingValue)
  }

  return (
    <div className='flex flex-col justify-center items-center '>
      <VerifyProcessBar process={100} step={3} totalStep={3} />
      <h1 className="text-center mt-[30px] font-semibold text-[26px]">
        Set up your vehicle
      </h1>
      <span className="mb-[40px] text-center flex justify-center items-center text-[#9E9E9E] text-sm">
        Please upload information of you vehicle
      </span>
      <CustomInput type={'text'} label={'Vehicle Plate Number'} isPassword={false} name={'plateNumber'} placeholder={'Your Vehicle Plate Number'}/>
      <CustomInput type={'text'} label={'Color'} isPassword={false} name={'color'} placeholder={'Your Vehicle Color'}/>
      <CustomInput type={'text'} label={'Vehicle RC Number'} isPassword={false} name={'rc_number'} placeholder={'Your Vehicle RC Number'}/>
      <div className='flex flex-col gap-y-[20px] justify-center items-center w-full mt-[25px]'>
        <UploadImageBox onChange={setVehicleImg} width={'90%'} height={200} image={vehicleImg} name={'firstImg'}/>
        <CustomButton name={'Save & Continue'} bgColor={'#2c2c2c'} tColor={'#fff'} onClick={onSubmit}/>
      </div>
    </div>
  )
}


