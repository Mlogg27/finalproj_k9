"use client";

import { CustomInput, CustomButton, CustomAlert } from "@/components";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { inputtingSlice } from "@/lib/features";
import { getInputting } from "@/lib/selector";
import  {validateInputs}  from "@plugins/validation";

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error"
  >("success");

  const inputtingValue = useSelector(getInputting);
  const dispatch : React.Dispatch<any> = useDispatch();

  const handleClick = () => {
    const { phoneNumber, password } = inputtingValue;
    const result = validateInputs({phoneNumber, password}, ['phoneNumber', 'password']);
    console.log(result);

    setAlertMessage(result.message);
    setAlertSeverity(result.severity);
    setOpen(true);

    if(!result.valid && result.name){
      dispatch(inputtingSlice.actions.reset({name: result.name}))
    }
    if(result.valid){}
      dispatch(inputtingSlice.actions.reset({}))
  };

  return (
    <div className="flex flex-col items-center w-[90%]">
      <form className='w-[100%] flex flex-col justify-center items-center'>
        <CustomInput
          label="Phone number"
          type="tel"
          placeholder="Your phone number"
          isPassword={false}
          name="phoneNumber"
          autocomplete={'tel'}
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
          onClick={handleClick}
        />
      </div>
      <Link
        className="text-gray-500 mt-5 w-full flex justify-center"
        href="#"
      >
        Forgot your password?
      </Link>
      <div className="mt-[50vh] text-gray-500">
        Don’t have an account?{" "}
        <Link className="underline font-semibold" href="#">
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
