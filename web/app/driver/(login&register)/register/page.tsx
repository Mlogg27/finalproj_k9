"use client";

import { CustomAlert, CustomInput, CustomButton } from "@/components";
import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";
import CircularProgress from "@mui/material/CircularProgress";
import { register } from "@/ulties/axios";
import { inputtingSlice } from "@/lib/features";
import fetchStatus from "@plugins/fetchStatus";
import { useRouter } from "next/navigation";
import handleSubmit from "@/plugins/handleSubmit";

export default function RegisterPage() {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error" | "info"
  >("success");
  const [loading, setLoading] = useState(false);
  const inputtingValue = useSelector(getInputting);
  const dispatch = useDispatch();
  const routerOnVerifyStatus = useNavigateBasedOnVerification();
  const router = useRouter();

  useEffect(() => {
    const status = fetchStatus();
    if(status !== 'login')routerOnVerifyStatus(status);
  }, []);

  const onClick =async ()=>{
    const { email, password,"phone number": phoneNumber } = inputtingValue;

    await handleSubmit({
      apiCall: (payload : any) => register(payload.email, payload.phoneNumber,payload.password),
      payload: { email, password, "phone number": phoneNumber },
      necessaryFields: ['email', 'password', 'phone number'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          dispatch(inputtingSlice.actions.reset({}));
          router.push('/driver/login');
        },
        onError: (res: any) =>{
          const {data}=res;
          dispatch(inputtingSlice.actions.reset({name: data.reset}));
        }
      },
    });
  }

  return (
    <>
      <div className={'flex w-full flex-col gap-y-[25px] mt-[25px] justify-center items-center'}>
        <CustomInput type={"email"}
                     name={"email"}
                     isPassword={false}
                     placeholder={"Your Email"}
                     label={"Email"}
                     autocomplete={"Email"} />
        <CustomInput type={"tel"}
                     name={"phone number"}
                     isPassword={false}
                     placeholder={"Your phone number"}
                     label={"Phone Number"}
                     autocomplete={"tel"} />
        <CustomInput type={"password"}
                     name={"password"}
                     isPassword={true}
                     placeholder={"Your password"}
                     label={"Password"}
                     autocomplete={"current-password"} />
      </div>
      <div className="text-gray-500 flex gap-x-[5px] my-[10px]">
        <span>Have an account?</span>
        <Link className="underline font-semibold" href="/driver/login">
          Login here
        </Link>
      </div>
      <CustomButton tColor={"#fff"}
                    name={"Register"}
                    bgColor={"#2c2c2c"}
                    onClick={onClick}
                     />
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
    </>
  );
}