"use client";

import { CustomInput, CustomButton, CustomAlert } from "@/components";
import * as React from "react";
import Link from "next/link";

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error"
  >("success");

  return (
    <div className="flex flex-col items-center w-[100%]">
      <form className='w-[100%] flex flex-col justify-center items-center'>
        <CustomInput
          label="Email"
          type="email"
          placeholder="Your email"
          isPassword={false}
          name="email"
          autocomplete={'email'}
        />
        <CustomInput
          label="Password"
          type="password"
          placeholder="Your password"
          isPassword={true}
          name="password"
          autocomplete='current-password'
        />
      </form>
      <div className="mt-5 w-full flex justify-center">
        <CustomButton
          name="Continue"
          bgColor="#2c2c2c"
          tColor="white"
          setOpen={setOpen}
          setAlertMessage={setAlertMessage}
          setAlertSeverity={setAlertSeverity}
          necessaryFields={['email', 'password']}
        />
      </div>
      <Link
        className="text-gray-500 mt-5 w-full flex justify-center"
        href="#"
      >
        Forgot your password?
      </Link>
      <div className="mt-[50vh] flex gap-x-[5px] text-gray-500">
        Don’t have an account?
        <Link className="underline font-semibold" href="/driver/register">
          Register here
        </Link>
      </div>
      <CustomAlert
        setOpen={setOpen}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
        open={open}
      />
    </div>
  );
}
