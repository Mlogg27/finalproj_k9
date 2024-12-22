'use client'
import { CustomInput, CustomButton, AlertDialog, CustomAlert } from "@/components";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import { useEffect } from "react";
import { inputtingSlice } from "@/lib/features";
import CircularProgress from "@mui/material/CircularProgress";
import handleSubmit from "@plugins/handleSubmit";
import { login, verifyInfo } from "@/ulties/axios";

export default function IdentityInformationPage(){
  const [openAlert, setOpenAlert] = React.useState(false);
  const router = useRouter();
  const inputtingValue = useSelector(getInputting);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "warning" | "error" | 'info'
  >("success");

  useEffect(() => {
    const rawData = localStorage.getItem('frontInfo');
    if (rawData) {
      const infoData = JSON.parse(rawData).info;
      const [day, month, year] = infoData.dob.split("/");
      infoData.dob = `${year}-${month}-${day}`;
      dispatch(inputtingSlice.actions.input({name: 'fullName', value: infoData.name}));
      dispatch(inputtingSlice.actions.input({name: 'dob', value: infoData.dob}));
      dispatch(inputtingSlice.actions.input({name: 'gstNumber', value: infoData.id}));
      dispatch(inputtingSlice.actions.input({name: 'address', value: infoData.placeOfResidence }));
    } else{
      router.push('/driver/verify_setup/identity/upload');
    }
  }, []);

  const onRetake = () =>{
    setOpenAlert(true);
  }
  const handleAgree = () =>{
    setOpenAlert(false);
    router.push('/driver/verify_setup/identity/upload');
  }

  const onSubmit =async () => {
    const {fullName, dob, gstNumber, address, city, country} =inputtingValue;

    await handleSubmit({
      apiCall: (payload : any) => verifyInfo(payload),
      payload: {fullName, dob, gstNumber, address, city, country},
      necessaryFields: ['fullName', 'dob', 'gstNumber', 'address', 'city', 'country'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          console.log('hehe')
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
        <div className='w-[100%] flex flex-col justify-center items-center gap-y-[5px] mb-[25px]'>
          <CustomInput type={'text'} label={'Full name'} isPassword={false} name={'fullName'} placeholder={'Your full name'}/>
          <CustomInput type={'date'} label={'Date of Birth'} isPassword={false} name={'dob'} />
          <CustomInput type={'number'} label={'GST number'} isPassword={false} name={'gstNumber'} placeholder={'Your GST number'}/>
          <CustomInput type={'text'} label={'Address'} isPassword={false} name={'address'} placeholder={'Your address'}/>
          <CustomInput type={'text'} label={'City'} isPassword={false} name={'city'} placeholder={'Your city'}/>
          <CustomInput type={'text'} label={'Country'} isPassword={false} name={'country'} placeholder={'Your country'}/>
        </div>

          <CustomButton name={'Correct'} bgColor={'#2c2c2c'} tColor={'#fff'} onClick={onSubmit}/>
          <CustomButton name={'Retake'} bgColor={'#EEEFF3'} tColor={'#000'} onClick={onRetake}/>

        <AlertDialog title={"You definitely want to retake your identity?"}
                     content={""}
                     open={openAlert}
                     setOpen={setOpenAlert}
                     handleAgree={handleAgree} />

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