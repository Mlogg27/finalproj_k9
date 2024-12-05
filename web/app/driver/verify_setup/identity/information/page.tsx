'use client'
import {CustomInput, CustomButton} from "@/components";

export default function IdentityInfor(){
    return (
      <>
        <div className='w-[100%] flex flex-col justify-center items-center gap-y-[5px] mb-[25px]'>
          <CustomInput type={'text'} label={'Full name'} isPassword={false} name={'fullName'} placeholder={'Your full name'}/>
          <CustomInput type={'date'} label={'Date of Birth'} isPassword={false} name={'dob'} />
          <CustomInput type={'number'} label={'GST number'} isPassword={false} name={'gstNumber'} placeholder={'Your GST number'}/>
          <CustomInput type={'text'} label={'Address'} isPassword={false} name={'address'} placeholder={'Your address'}/>
          <CustomInput type={'text'} label={'City'} isPassword={false} name={'city'} placeholder={'Your city'}/>
          <CustomInput type={'text'} label={'State'} isPassword={false} name={'state'} placeholder={'Your state'}/>
        </div>

          <CustomButton name={'Correct'} bgColor={'#2c2c2c'} tColor={'#fff'} necessaryFields={[]}/>
          <CustomButton name={'Retake'} bgColor={'#EEEFF3'} tColor={'#000'} necessaryFields={[]}/>
      </>
)
}