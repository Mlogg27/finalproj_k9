"use client";

import React, { useEffect } from "react";
import { VerifyProcessBar, VerifyCodeField, CustomButton, CustomAlert, CountDown } from "@/components";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import { inputtingSlice } from "@/lib/features";
import CircularProgress from "@mui/material/CircularProgress";
import fetchStatus from "@plugins/fetchStatus";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";
import {  sendOtp, verifyOtp } from "@/ulties/axios";
import handleSubmit from "@/plugins/handleSubmit";
import { useRouter } from "next/navigation";

export default function EmailVerifyPage() {
  const inputtingValue = useSelector(getInputting);
  const [otpValue, setOtp] = React.useState('');
  const [isSendEmail, setIsSendEmail]=  React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const routerOnVerifyStatus = useNavigateBasedOnVerification();
  const status = fetchStatus();
  const router = useRouter();


  useEffect(() => {
    routerOnVerifyStatus(status);
  }, [routerOnVerifyStatus]);
  useEffect(() => {
    if(!isSendEmail){
      sendOtp()
        .then(()=> setIsSendEmail(true))
        .catch(() => {
          setOpen(true)
          setAlertMessage('Failed to send OTP. Please click resend email');
          setAlertSeverity('error');
        });
    } else return;
  }, []);

  if(status === 'login') return null;

  const onClick =async ()=>{
    const { otp } = inputtingValue;

    await handleSubmit({
      apiCall: (payload : any) => verifyOtp(payload.otp),
      payload: { otp },
      necessaryFields: ['otp'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          const {data}=res;
          dispatch(inputtingSlice.actions.reset({}));
          localStorage.setItem('verifyStatus', data['verify']);
          router.push('/driver/verify_setup/identity/upload');
        },
        onError: (res: any) =>{
          const {data, status}=res;
          dispatch(inputtingSlice.actions.reset({name: data.reset}));
          if(status === 401){
            localStorage.clear();
            routerOnVerifyStatus('login');
          }
        }
      },
    });
  }

  return (
    <div className="flex flex-col justify-center items-center relative">
      <VerifyProcessBar process={33} step={1} totalStep={3} />
      <h1 className="text-center mt-[30px] font-semibold text-[26px]">
        Verify Email
      </h1>
      <span className="mb-[70px] flex justify-center items-center text-[#9E9E9E] text-sm">
        Enter the 6-digit code we sent to your email
      </span>
      <VerifyCodeField  otp={otpValue} setOtp={setOtp}/>
      <div className="mt-[50px] text-center text-sm mb-[25px]">
        <span>Didn’t receive a code?</span>
        <br />
        <span className="font-semibold">
          <CountDown setOpen={setOpen} setAlertSeverity={setAlertSeverity} setAlertMessage={setAlertMessage} startPoint={3}/>
        </span>
      </div>
      <CustomButton
        name={"Verify Code"}
        bgColor={"#2c2c2c"}
        tColor={"#fff"}
        onClick={onClick}
      />
      <span className="mt-[95%] text-[#656565]">
        Need help?{" "}
        <Link className="underline font-semibold" href={"#"}>
          Contact Support
        </Link>
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
      </span>
    </div>
  );
}
