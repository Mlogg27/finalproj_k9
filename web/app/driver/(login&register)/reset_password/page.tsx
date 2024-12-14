'use client'
import { CustomButton, CustomInput } from "@/components";
import Link from "next/link";
import * as React from "react";
import SendIcon from '@mui/icons-material/Send';

export default function ResetPassPage(){
  const [isFillEmail, setIsFillEmail] = React.useState(false);
  if(isFillEmail){
    const onSubmitResendEmail = ()=>{
      console.log("hehe")
    }
    return (
      <>
        <div className="flex flex-col gap-y-[15px] w-[100%] justify-center items-center">
          <SendIcon style={{marginTop: '200px', fontSize: '150px', border: '2px solid #000', borderRadius: '80%', padding: '30px'}}/>
          <p className="mt-[20px] w-[80%] text-[18px] text-center">Please check your email to retrieve the link for resetting your password.</p>
          <CustomButton name={"Resend Email"} onClick={onSubmitResendEmail} bgColor={"#2c2c2c"} tColor={"white"} />
        </div>
      </>
    )
  }


  const onSubmitGetEmail = () => {
    setIsFillEmail(true);
  };
  return (
    <>
      <div className="flex flex-col gap-y-[15px] w-[100%] justify-center items-center">
        <h2 className="mt-[150px] text-xl font-semibold">Reset Your Password</h2>
        <CustomInput type={"text"}
                     name={"email"}
                     label={"Email"}
                     autocomplete={"current-email"}
                     placeholder={"Your Email"}
                     isPassword={false} />
        <CustomButton name={'Continue'} onClick={onSubmitGetEmail} bgColor={'#2c2c2c'} tColor={'white'} />
      </div>
      <span className="mt-[40vh] flex gap-x-[5px] text-gray-500">
        Back to Login Page
        <Link className="underline font-semibold" href="/driver/login">
          Click here
        </Link>
      </span>
    </>
  )
}