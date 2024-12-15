"use client";

import { CustomInput, CustomButton, CustomAlert } from "@/components";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import { login } from "@/ulties/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";
import fetchStatus from "@plugins/fetchStatus";
import handleSubmit from "@plugins/handleSubmit";
import { inputtingSlice } from "@/lib/features";

export default function LoginPage() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const inputtingValue = useSelector(getInputting);
  const necessaryFields = ["email", "password"];
  const routerOnVerifyStatus = useNavigateBasedOnVerification();

  const handleLogin =async ()=>{
    const {email, password} = inputtingValue;
    const valid = await handleSubmit({email, password},
                  necessaryFields,
                  setLoading,
                  setOpen,
                  setAlertMessage,
                  setAlertSeverity,
                  dispatch);
    if(valid){
      const res = await login(email, password);
      const {message, verify, access_token, refresh_token} = res.data;
      setLoading(false);
      setOpen(true);
      setAlertMessage(message);
      dispatch(inputtingSlice.actions.reset({}));
      if(res.status === 200){
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        localStorage.setItem('verifyStatus', verify);
        routerOnVerifyStatus(verify)
      } else{
        setAlertSeverity('warning');
        if(res.status == 404) setAlertMessage('Server Not Found')
      }
    }
  }

  useEffect(() => {
    const alertQuery = searchParams.get("alert");

    const status = fetchStatus();
    if(status !== 'login') {
      routerOnVerifyStatus(status);
      return;
    }

    if (alertQuery === "true") {
      setOpen(true);
      setAlertMessage("Please log in to continue.");
      setAlertSeverity("info");

      const currentPath = window.location.pathname;
      const restQueries = new URLSearchParams(searchParams.toString());
      restQueries.delete("alert");

      router.replace(`${currentPath}?${restQueries.toString()}`);
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center w-full relative">
      <form className="w-full flex flex-col justify-center items-center">
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
