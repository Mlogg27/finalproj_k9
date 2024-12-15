"use client";

import { CustomAlert, CustomInput, CustomButton } from "@/components";
import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";
import CircularProgress from "@mui/material/CircularProgress";
import { validateInputs } from "@plugins/validation";
import { inputtingSlice } from "@/lib/features";

export default function RegisterPage() {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error"
  >("success");
  const [loading, setLoading] = useState(false);
  const inputtingValue = useSelector(getInputting);
  const necessaryFields = ["email", "password"];
  const dispatch = useDispatch();
  const routerOnVerifyStatus = useNavigateBasedOnVerification();




  const onClick = ()=>{
    const {phoneNumber, email, password} = inputtingValue;
    const resultValid = validateInputs({ email, password, phoneNumber }, necessaryFields);

    if (!resultValid.valid && resultValid.message && resultValid.severity && resultValid.name) {
      setLoading(false);
      setOpen(true);
      setAlertMessage(resultValid.message);
      setAlertSeverity(resultValid.severity);
      dispatch(inputtingSlice.actions.reset({ name: resultValid.name }));
      return;
    }
    setLoading(true);

  }

  return (
    <>
      <CustomInput type={"email"}
                   name={"email"}
                   isPassword={false}
                   placeholder={"Your Email"}
                   label={"Email"}
                   autocomplete={"Email"} />
      <CustomInput type={"tel"}
                   name={"phoneNumber"}
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