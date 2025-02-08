'use client'
import { CustomDialog, CustomAlert, CustomButton, CustomInput } from "@/components";
import Link from "next/link";
import * as React from "react";
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import { getMailRFPassword } from "@/ulties/axios";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { inputtingSlice } from "@/lib/features";
import handleSubmit from "@/plugins/handleSubmit";
import fetchStatus from "@plugins/fetchStatus";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";

export default function ResetPassPage() {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [isFillEmail, setIsFillEmail] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = useState(false);
  const inputtingValue = useSelector(getInputting);
  const dispatch = useDispatch();
  const routerOnVerifyStatus = useNavigateBasedOnVerification();

  useEffect(() => {
    const status = fetchStatus();
    if(status !== 'login') routerOnVerifyStatus(status);
  }, []);

  const onSubmitResendEmail = () => {
    setOpenAlert(true);
    setOpen(false);
  };

  const onSubmitGetEmail =async ()=>{
    const { email } = inputtingValue;

    await handleSubmit({
      apiCall: (payload : any) => getMailRFPassword(payload.email, 'driver'),
      payload: { email },
      necessaryFields: ['email'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          setIsFillEmail(true)
          dispatch(inputtingSlice.actions.reset({}));
        },
        onError: (res: any) =>{
          const {data}=res;
          dispatch(inputtingSlice.actions.reset({name: data.reset}));
        }
      },
    });
  }

  const handleAgree =() => {
    setOpenAlert(false);
    setIsFillEmail(false);
  }

  if (isFillEmail) {
    return (
      <div className="flex flex-col gap-y-[15px] w-[100%] justify-center items-center">
        <SendIcon
          style={{
            marginTop: "200px",
            fontSize: "150px",
            border: "2px solid #000",
            borderRadius: "80%",
            padding: "30px"
          }}
        />
        <p className="mt-[20px] w-[80%] text-[18px] text-center">
          Please check your email to retrieve the link for resetting your password.
        </p>
        <CustomButton
          name={"Resend Email"}
          onClick={onSubmitResendEmail}
          bgColor={"#2c2c2c"}
          tColor={"white"}
        />
        <span className="mt-[20vh] flex gap-x-[5px] text-gray-500">
        Back to Login Page
        <Link className="underline font-semibold" href="/driver/login">
          Click here
        </Link>
      </span>

        <CustomDialog title={"You definitely want to resend the email?"}
                     content={""}
                     open={openAlert}
                     setOpen={setOpenAlert}
                     handleAgree={handleAgree}/>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-y-[15px] w-[100%] justify-center items-center">
        <h2 className="mt-[150px] text-xl font-semibold">Reset Your Password</h2>
        <CustomInput
          type={"text"}
          name={"email"}
          label={"Email"}
          autocomplete={"current-email"}
          placeholder={"Your Email"}
          isPassword={false}
        />
        <CustomButton
          name={"Continue"}
          onClick={onSubmitGetEmail}
          bgColor={"#2c2c2c"}
          tColor={"white"}
        />
      </div>
      <span className="mt-[40vh] flex gap-x-[5px] text-gray-500">
        Back to Login Page
        <Link className="underline font-semibold" href="/driver/login">
          Click here
        </Link>
      </span>


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