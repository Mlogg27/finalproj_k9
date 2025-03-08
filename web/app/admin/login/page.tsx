"use client"
import { CustomInput, CustomButton, CustomAlert } from "@/components";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import handleSubmit from "@plugins/handleSubmit";
import { login } from "@/ulties/axios";
import { inputtingSlice } from "@/lib/features";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { useEffect, useState } from "react";

export default function LoginPage () {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const inputtingValue = useSelector(getInputting);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);


  useEffect(() => {
      const isLogin = localStorage.getItem("accessToken");
      if(isLogin){
        router.replace('/admin/home/requests');
        setIsCheckingAuth(true);
        return;
      }
  }, []);

  if(isCheckingAuth) return null;

  const onSubmit = async () =>{
    const {email, password} = inputtingValue;
    await handleSubmit({
      apiCall: (payload : any) => login(payload.email, payload.password, 'admin'),
      payload: { email, password },
      necessaryFields: ['email', 'password'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          const {data} =res;
          dispatch(inputtingSlice.actions.reset({}));
          localStorage.setItem('accessToken', data['access_token'] );
          localStorage.setItem('refreshToken', data['refresh_token'] );
          dispatch(inputtingSlice.actions.input({name:"email", value: data.email}));
          router.replace('/admin/home/requests');
        },
        onError: (res: any) =>{
          const {data}=res;
          dispatch(inputtingSlice.actions.reset({name: data.reset}));
        }
      },
    });

  }

  return (
    <div className='mt-[20px] justify-center items-center flex-col flex w-full'>
      <h1 className=' font-semibold text-[46px]'>Welcome to Scrap Plan</h1>
      <span className=' text-[#9E9E9E] text-[20px]'>Please log in to join your orders</span>

      <div className={'flex flex-col justify-center items-center w-full gap-y-[25px]'}>
        <CustomInput label='Email' name='email' type='text' placeholder='Your Email' autocomplete='email' isPassword={false}/>
        <CustomInput label='Password' name='password' type='password' placeholder='Your Password' autocomplete='current-password' isPassword={true}/>
      </div>

      <span className={'flex w-full justify-center items-center mt-[20px]'}>
        <CustomButton name='Continue' onClick={onSubmit} tColor={'#fff'} bgColor={'#2c2c2c'}/>
      </span>

      <CustomAlert
        setOpen={setOpen}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
        open={open}
      />
      {loading && (
        <div className="absolute top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress style={{ color: "black" }} />
        </div>
      )}
    </div>
  )
}