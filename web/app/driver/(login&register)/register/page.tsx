"use client";

import { CustomAlert, CustomInput, CustomButton } from "@/components";
import * as React from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error"
  >("success");



  const onClick = ()=>{
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
    </>
  );
}