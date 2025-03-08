"use client";

import { CustomInput, CustomButton, CustomAlert } from "@/components";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import { login } from "@/ulties/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";
import fetchStatus from "@plugins/fetchStatus";
import handleSubmit from "@/plugins/handleSubmit";
import { inputtingSlice } from "@/lib/features";

export default function LoginPage() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const inputtingValue = useSelector(getInputting);
  const routerOnVerifyStatus = useNavigateBasedOnVerification();
  const status = fetchStatus();

  const handleLogin =async ()=>{
    const { email, password } = inputtingValue;

    await handleSubmit({
      apiCall: (payload : any) => login(payload.email, payload.password, 'driver'),
      payload: { email, password },
      necessaryFields: ['email', 'password'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          const {data}=res;
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);
          localStorage.setItem('verifyStatus', data.verify);
          dispatch(inputtingSlice.actions.reset({}))
          routerOnVerifyStatus(data.verify);
        },
        onError: (res: any) =>{
          const {data}=res;
          dispatch(inputtingSlice.actions.reset({name: data.reset}));
        }
      },
    });
  }

  useEffect(() => {
    if(inputtingValue.alert) {
      setOpen(true);
      setAlertSeverity('info');
      setAlertMessage(inputtingValue.alert);
      dispatch(inputtingSlice.actions.reset({}));
    }
    routerOnVerifyStatus(status);
  }, []);

  if(status !== 'login') return null;

  return (
    <div className="flex flex-col items-center w-full relative">
      <form className="w-full flex flex-col justify-center items-center gap-y-[25px] mt-[25px]">
        <CustomInput
          label="Email"
          type="email"
          placeholder="Your email"
          isPassword={false}
          name="email"
          autocomplete="email"
        />
        <CustomInput
          label="Password"
          type="password"
          placeholder="Your password"
          isPassword={true}
          name="password"
          autocomplete="current-password"
        />
      </form>
      <div className="mt-5 w-full flex justify-center">
        <CustomButton
          name="Continue"
          bgColor="#2c2c2c"
          tColor="white"
          onClick={handleLogin}
        />
      </div>
      <Link className="text-gray-500 mt-5 w-full flex justify-center" href="/driver/reset_password">
        Forgot your password?
      </Link>
      <span className="mt-[50vh] flex gap-x-1 text-gray-500">
        Don’t have an account?{" "}
        <Link className="underline font-semibold" href="/driver/register">
          Register here
        </Link>
      </span>
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
  );
}
