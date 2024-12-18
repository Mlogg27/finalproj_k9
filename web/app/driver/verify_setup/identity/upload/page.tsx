"use client"

import { UploadImageBox, CustomButton, CustomAlert } from "@/components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import handleSubmit from "@plugins/handleSubmit";
import CircularProgress from "@mui/material/CircularProgress";
import { inputtingSlice } from "@/lib/features";

export default function UploadIdentityPage () {
  const [frontImg, setFrontImg] = React.useState('');
  const [backImg, setBackImg] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error" | 'info'
  >("success");
  const inputtingValue = useSelector(getInputting);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const { firstImg, secondImg } = inputtingValue;
    const valid = await handleSubmit({ firstImg, secondImg },
      ['firstImg', "secondImg"],
      setLoading,
      setOpen,
      setAlertMessage,
      setAlertSeverity,
      dispatch);
    if(valid) {
      dispatch(inputtingSlice.actions.reset({}));
      setFrontImg('');
      setBackImg('')
    }
  }

  return (
    <>
      <span className="mr-auto ml-[5%] text-sm font-semibold ">Upload driver`s license</span>
      <div className='flex mx-auto gap-x-[20px] mt-[25px] mb-[40vh]'>
        <div className='flex flex-col justify-center items-center gap-y-[5px]'>
          <UploadImageBox onChange={setFrontImg} width={160} height={120} image={frontImg} name={'firstImg'}/>
          <span>Front Side</span>
        </div>
        <div className='flex flex-col justify-center items-center gap-y-[5px]'>
          <UploadImageBox onChange={setBackImg} width={160} height={120} image={backImg} name={'secondImg'}/>
          <span >Back Side</span>
        </div>
      </div>
      <CustomButton onClick={onSubmit}
                    name={'Verify ID card'}
                    bgColor={'#2C2C2C'}
                    tColor={'#fff'}
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
  )
}


