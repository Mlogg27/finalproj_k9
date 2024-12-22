"use client"

import { UploadImageBox, CustomButton, CustomAlert } from "@/components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import CircularProgress from "@mui/material/CircularProgress";
import { inputtingSlice } from "@/lib/features";
import {  uploadImg} from "@/ulties/axios";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";
import fetchStatus from "@plugins/fetchStatus";
import handleSubmit from "@/plugins/handleSubmit";
import { useRouter } from "next/navigation";

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
  const routerOnVerifyStatus = useNavigateBasedOnVerification();
  const router = useRouter();

  useEffect(() => {
    const status = fetchStatus();
    routerOnVerifyStatus(status);
  }, []);


  const onSubmit =async ()=>{
    const { firstImg, secondImg } = inputtingValue;

    await handleSubmit({
      apiCall: ()=> uploadImg([{payload: firstImg, isIdentity: true}, {payload: secondImg, isIdentity: true}]),
      payload: { firstImg, secondImg },
      necessaryFields: ['firstImg', 'secondImg'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          const {status, data}=res;
          if(status === 401){
            localStorage.clear();
            routerOnVerifyStatus('login');
          }
          const frontSideIdentityInfo = data.results.find((imageDetail: any) => imageDetail.name === 'frontSide');
          const backSideIdentityInfo = data.results.find((imageDetail: any) => imageDetail.name === 'backSide');
          router.push('/driver/verify_setup/identity/information');
          dispatch(inputtingSlice.actions.reset({name: data.reset}));
          setBackImg('');
          setFrontImg('');
          if (frontSideIdentityInfo) {
            localStorage.setItem('frontInfo', JSON.stringify(frontSideIdentityInfo));
          }
          if (backSideIdentityInfo) {
            localStorage.setItem('backInfo', JSON.stringify(backSideIdentityInfo));
          }
        },
        onError: (res: any) =>{
          const {status, data}=res;
          dispatch(inputtingSlice.actions.reset({name: data.reset}));
          setBackImg('');
          setFrontImg('');
          if(status === 401){
            localStorage.clear();
            routerOnVerifyStatus('login');
          }
        }
      },
    });
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


