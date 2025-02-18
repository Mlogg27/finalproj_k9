'use client'
import { CustomAlert, CustomButton, CustomInput } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { useState } from "react";
import handleSubmit from "../../plugins/handleCheck";
import { inputtingSlice } from "@/lib/features";

export default function RfPassPage (){
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = useState(false);
  const inputtingValue = useSelector(getInputting);
  const dispatch = useDispatch();

  const onSubmit =async ()=>{
    setLoading(true);
    const {password, confirmPassword} = inputtingValue;
    const valid = await handleSubmit({password, confirmPassword},
      ['password', 'confirmPassword'],
      setLoading,
      setOpen,
      setAlertMessage,
      setAlertSeverity,
      dispatch);
    console.log(valid);

    if(password !== confirmPassword){
      setLoading(false);
      setOpen(true);
      setAlertMessage('Mismatch Password Error. Please try again');
      dispatch(inputtingSlice.actions.reset({name: 'confirmPassword'}));
    }

  }

  return(
    <div className='flex flex-col w-[100%] justify-center items-center'>
      <h1 className='mt-[80px] font-medium text-[22px]'>Reset Password</h1>
      <div className={'flex flex-col justify-center items-center w-full gap-y-[25px] mt-[25px]'}>
        <CustomInput label={'Password'}
                     isPassword={true}
                     name={'password'}
                     placeholder={'Your password'}
                     autocomplete={'none'}
                     type={'password'}/>
        <CustomInput label={'Confirm Password'}
                     isPassword={true}
                     name={'confirmPassword'}
                     placeholder={'Confirm your password'}
                     autocomplete={'none'}
                     type={'password'}/>
      </div>
      <div className='w-full flex justify-center items-center mt-[20px]'>
        <CustomButton name={'Continue'}
                      onClick={onSubmit}
                      tColor={'white'}
                      bgColor={'#2c2c2c'}/>
      </div>

      <CustomAlert
        setOpen={setOpen}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
        open={open}
      />
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress style={{ color: "black" }} />
        </div>
      )}
    </div>
  )
}
