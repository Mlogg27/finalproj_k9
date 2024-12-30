"use client"
import { CustomInput , CustomButton} from "@/components";
import { useRouter } from "next/navigation";
import * as React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function HomePage () {
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onSubmit = () =>{
    router.push("/store/home");
  }

  const onRegister = () =>{
    console.log("hehe");
    setOpenDialog(true);
  }

  return (
    <div className='mt-[20px] flex flex-col justify-center items-center'>
      <h1 className=' font-semibold text-[46px]'>Welcome to Scrap Plan</h1>
      <span className=' text-[#9E9E9E] text-[20px]'>Please log in to join your orders</span>

      <CustomInput label='Email' name='email' type='text' placeholder='Your Email' autocomplete='current-email'
                   isPassword={false} />
      <CustomInput label='Password' name='password' type='password' placeholder='Your Password'
                   autocomplete='current-password' isPassword={true} />

      <span className={'flex w-full justify-center items-center mt-[20px]'}>
        <CustomButton name='Continue' onClick={onSubmit} tColor={'#fff'} bgColor={'#2c2c2c'} />
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
              To subscribe to this website, please enter your store information. We
              will send updates occasionally.
            </DialogContentText>
            <CustomInput label='Email' name='emailRQ' type='text' placeholder='Your Email' autocomplete='current-email'
                         isPassword={false} />
            <CustomInput label='Phone Number' name='phoneNumberRQ' type='tel' placeholder='Your Phone Number'
                         autocomplete='tel' isPassword={false} />
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button type="submit">Subscribe</button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}