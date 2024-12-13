"use client";

import { CustomInput, CustomButton, CustomAlert } from "@/components";
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import {  login } from "@/ulties/axios";
import { inputtingSlice } from "@/lib/features";
import { validateInputs } from "@plugins/validation";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";
import { useEffect } from "react";
import fetchStatus from "@plugins/fetchStatus";

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = React.useState(false);
  const routerOnVerifyStatus = useNavigateBasedOnVerification();

  const dispatch = useDispatch();
  const inputtingValue = useSelector(getInputting);
  const necessaryFields = ['email', 'password'];


  const onClick = async () => {
    const { email, password } = inputtingValue;
    setLoading(true);
    const resultValid = validateInputs({ email, password }, necessaryFields);

    if (!resultValid.valid && resultValid.message && resultValid.severity && resultValid.name) {
      setLoading(false);
      setOpen(true);
      setAlertMessage(resultValid.message);
      setAlertSeverity(resultValid.severity);
      dispatch(inputtingSlice.actions.reset({ name: resultValid.name }));
      return;
    }
    if (resultValid.valid) {
      const res = await login(email, password);
      setLoading(false);
      const data = res.data;
      switch (res.status) {
        case 200:
          setOpen(true);
          setAlertMessage('Login Successfully!');
          setAlertSeverity('success');
          localStorage.setItem('accessToken', data['access_token']);
          localStorage.setItem('refreshToken', data['refresh_token']);
          localStorage.setItem('verifyStatus', data['verify']);
          routerOnVerifyStatus(data['verify']);
          dispatch(inputtingSlice.actions.reset({}));
          break;
        case 401:
          setOpen(true);
          setAlertMessage(data.message);
          setAlertSeverity('warning');
          dispatch(inputtingSlice.actions.reset({}));
          break;
      }
    }
  };

  useEffect(() => {
    const status = fetchStatus();
    routerOnVerifyStatus(status);
  }, []);

  return (
    <div className="flex flex-col items-center w-[100%] relative">
      <form className="w-[100%] flex flex-col justify-center items-center">
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
          onClick={onClick}
        />
      </div>
      <Link
        className="text-gray-500 mt-5 w-full flex justify-center"
        href="/driver/reset_password"
      >
        Forgot your password?
      </Link>
      <span className="mt-[50vh] flex gap-x-[5px] text-gray-500">
        Don’t have an account?
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
