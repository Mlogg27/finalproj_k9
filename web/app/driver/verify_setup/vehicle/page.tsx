"use client"

import { UploadImageBox, CustomButton, CustomInput, VerifyProcessBar, CustomAlert } from "@/components";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInputting } from "@/lib/selector";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigateBasedOnVerification } from "@plugins/navigateBasedOnVerification";
import handleSubmit from "@plugins/handleSubmit";
import { setUpVehicle } from "@/ulties/axios";
import { inputtingSlice } from "@/lib/features";
import { useRouter } from "next/navigation";
import fetchStatus from "@plugins/fetchStatus";


export default function UploadIdentityPage () {
  const [vehicleImg, setVehicleImg] = React.useState('');
  const inputtingValue = useSelector(getInputting);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error" | 'info'
  >("success");
  const routerOnVerifyStatus = useNavigateBasedOnVerification();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const status = fetchStatus();
    routerOnVerifyStatus(status);
  }, []);

  const onSubmit = async () => {
    const { rc_number, plateNumber, color, firstImg } = inputtingValue;

    await handleSubmit({
      apiCall: ()=> setUpVehicle(
         {rc_number,
          plateNumber,
          color,
          image: {payload: firstImg, id: null}}
      ),
      payload: { rc_number, plateNumber, color,  firstImg },
      necessaryFields: ['plateNumber', 'color', 'rc_number', 'firstImg'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          const {data}=res;
          localStorage.setItem('verifyStatus', data['verify']);
          dispatch(inputtingSlice.actions.reset({}));
          router.push('/driver/home');
        },
        onError: (res: any) => {
          const { status } = res;
          if(status === 401) {
            localStorage.clear();
            routerOnVerifyStatus('login');
          }
          dispatch(inputtingSlice.actions.reset({}));
        }
      },
    });


  }

  return (
    <div className='flex flex-col justify-center items-center '>
      <VerifyProcessBar process={100} step={3} totalStep={3} />
      <h1 className="text-center mt-[30px] font-semibold text-[26px]">
        Set up your vehicle
      </h1>
      <span className="mb-[40px] text-center flex justify-center items-center text-[#9E9E9E] text-sm">
        Please upload information of you vehicle
      </span>
      <CustomInput type={'text'} label={'Vehicle Plate Number'} isPassword={false} name={'plateNumber'} placeholder={'Your Vehicle Plate Number'}/>
      <CustomInput type={'text'} label={'Color'} isPassword={false} name={'color'} placeholder={'Your Vehicle Color'}/>
      <CustomInput type={'text'} label={'Vehicle RC Number'} isPassword={false} name={'rc_number'} placeholder={'Your Vehicle RC Number'}/>
      <div className='flex flex-col gap-y-[20px] justify-center items-center w-full mt-[25px]'>
        <UploadImageBox onChange={setVehicleImg} width={'90%'} height={200} image={vehicleImg} name={'firstImg'}/>
        <CustomButton name={'Save & Continue'} bgColor={'#2c2c2c'} tColor={'#fff'} onClick={onSubmit}/>
      </div>

      <CustomAlert
        setOpen={setOpen}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
        open={open}
      />

      {loading && (
        <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress style={{ color: "black" }} />
        </div>
      )}
    </div>
  )
}


