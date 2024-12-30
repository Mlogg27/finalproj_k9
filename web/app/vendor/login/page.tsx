"use client"
import { CustomInput, CustomButton, CustomAlert } from "@/components";
import { useRouter } from "next/navigation";
import * as React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import handleSubmit from "@plugins/handleSubmit";
import { login } from "@/ulties/axios";
import { inputtingSlice } from "@/lib/features";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage () {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = useState(false);
  const inputtingValue = useSelector(getInputting);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onLogin = () =>{
    router.push("/store/home");
  }

  const onRegister = () =>{
    console.log("hehe");
    setOpenDialog(true);
  }

  const onSubmit = async () =>{
    const { emailRQ, "phone number": phone, name } = inputtingValue;
    await handleSubmit({
      apiCall: (payload : any) => login(payload.email, payload.password, 'driver'),
      payload: { emailRQ ,"phone number": phone, name },
      necessaryFields: ['name','emailRQ', 'phone number'],
      setStateHandlers: { setLoading, setOpen, setAlertMessage, setAlertSeverity},
      dispatch,
      handlers: {
        onSuccess: (res : any) => {
          const {data}=res;
        },
        onError: (res: any) =>{
          const {data}=res;
          dispatch(inputtingSlice.actions.reset({name: data.reset}));
        }
      },
    });
  }

  return (
    <div className='mt-[20px] flex flex-col justify-center items-center'>
      <h1 className=' font-semibold text-[46px]'>Welcome to Scrap Plan</h1>
      <span className=' text-[#9E9E9E] text-[20px]'>Please log in to enjoy our services!</span>

      <CustomInput label='Email' name='email' type='text' placeholder='Your Email' autocomplete='current-email'
                   isPassword={false} />
      <CustomInput label='Password' name='password' type='password' placeholder='Your Password'
                   autocomplete='current-password' isPassword={true} />

      <span className={'flex w-full justify-center items-center mt-[20px]'}>
        <CustomButton name='Continue' onClick={onLogin} tColor={'#fff'} bgColor={'#2c2c2c'} />
      </span>

      <div className="mt-[24vh] flex gap-x-[5px] text-gray-500 w-[300px] justify-center items-center">
        <span> Don’t have an account?</span>
        <span onClick={onRegister} className={'underline'}>Register here!</span>
      </div>

      <div>
        <Dialog
          open={openDialog}
          onClose={handleClose}
        >
          <DialogTitle>Request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your vendor information. We
              will send updates occasionally.
            </DialogContentText>
            <CustomInput label='Name' name='name' type='text' placeholder='Your Vendor Name' autocomplete=''
                         isPassword={false} />
            <CustomInput label='Email' name='emailRQ' type='text' placeholder='Your Email' autocomplete='current-email'
                         isPassword={false} />
            <CustomInput label='Phone Number' name='phone number' type='tel' placeholder='Your Phone Number'
                         autocomplete='tel' isPassword={false} />
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={onSubmit}>Subscribe</button>
          </DialogActions>
        </Dialog>
      </div>

      <CustomAlert
        setOpen={setOpen}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
        open={open}
      />
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress style={{ color: "black" }} />
        </div>
      )}
    </div>
  )
}