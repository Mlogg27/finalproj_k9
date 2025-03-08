'use client';

import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BarChartIcon from '@mui/icons-material/BarChart';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CustomAlert, CustomButton, CustomDialog, CustomInput, SideBar } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import CircularProgress from "@mui/material/CircularProgress";
import { inputtingSlice } from "@/lib/features";
import { logout } from "@/ulties/axios";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showChangePass, setShowChangePass] = React.useState(false);
  const inputtingValue = useSelector(getInputting);
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = React.useState(false);
  const [openDialogLogout, setOpenDialogLogout] = React.useState(false);
  const [openDialogChangePass, setOpenDialogChangePass] = React.useState(false);
  const dispatch : any = useDispatch();
  const isLogin = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isLogin) {
      dispatch(inputtingSlice.actions.input({name: 'alert', value : 'Please log in to continue'}));
      router.replace("/admin/login");
      return;
    }
  }, []);

  if(!isLogin) return null;

  const onClick1 = () =>{
    setOpenDialogLogout(true);
  }
  const onClick2 = () =>{
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const { prevPass, newPass, cfPass } = inputtingValue;

    if (![prevPass, newPass, cfPass].every(Boolean)) {
      setAlertMessage('Please fill in all fields');
    } else if (![prevPass, newPass, cfPass].every(pass => passRegex.test(pass))) {
      setAlertMessage('The password must have at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
    } else if (newPass !== cfPass) {
      setAlertMessage('Password confirmation does not match');
      dispatch(inputtingSlice.actions.reset({ name: 'cfPass' }));
    } else {
      setOpenDialogChangePass(true);
    }
    setAlertSeverity('warning');
    ['prevPass', 'newPass', 'cfPass'].forEach(field => dispatch(inputtingSlice.actions.reset({ name: field })));
  }

  const onLogout = async () => {
    setLoading(true);
    await logout('admin');
    localStorage.clear();
    setLoading(false);
    dispatch(inputtingSlice.actions.reset({}));
    router.replace('/admin/login');
  };
  const onChangePass = () =>{
    setLoading(true);
    setOpen(true);
  }

  const activeStyle = 'bg-[#2c2c2c] text-white rounded-[6px]';
  const defaultStyle = 'bg-transparent text-black';

  const sideBarEle = (): React.JSX.Element =>{
    return (
      <div className={'absolute top-[50px] mx-auto flex flex-col justify-center items-center gap-y-[25px]'}>
        <div className={"flex gap-x-[25px] justify-center items-center"}>
          <span className="text-center cursor-pointer border-b-2 border-transparent hover:border-white pb-1"
                onClick={() => setShowChangePass(false)}>
             Account
         </span>

          <span className="h-5 w-[2px] bg-gray-400"></span>

          <span className="text-center cursor-pointer border-b-2 border-transparent hover:border-white pb-1"
                onClick={() => setShowChangePass(true)}>
             Change Password
          </span>
        </div>
        {!showChangePass &&
          <div className={"w-[240px] flex flex-col gap-y-[5px] justify-center items-center"}>
            <label htmlFor={"email"} className={'text-[#fff]'}>Email</label>
            <input id={"email"} type="text" disabled={true} className={"w-full rounded-[6px] text-center px-[2px] py-[5px]"} value={inputtingValue?.email || ''} />
          </div>
        }

        {
          showChangePass &&
          <div className={"text-[#000] flex flex-col justify-center items-center w-[240px]"}>
            <label className={'text-white font-semibold'}>Your Old Password</label>
            <CustomInput isPassword={true} type={"password"} name={"prevPass"} placeholder={"Your old password"} />
            <label className={'text-white font-semibold mt-[25px]'}>Your New Password</label>
            <CustomInput isPassword={true} type={"password"} name={"newPass"} placeholder={"Your new password"} />
            <label className={'text-white font-semibold mt-[25px]'}>Confirm Your New Password</label>
            <CustomInput isPassword={true} type={"password"} name={"cfPass"} placeholder={"Confirm your password"} />
            <span className={'w-[90%] flex justify-center items-center mt-[15px]'}>
              <CustomButton name={'Continue'} onClick={onClick2} tColor={'#000'} bgColor={'#fff'}/>
            </span>
          </div>
        }
      </div>
    )
  }

  return (
    <div className="flex mx-[10px] mt-[20px] justify-center items-center">
      <ul className="flex flex-col gap-y-[10px] min-w-[13rem]">
      <li>
          <Link
            href={'/admin/home/requests'}
            className={`py-[8px] px-[15px] flex gap-x-[10px] items-center ${pathname === '/admin/home/requests' ? activeStyle : defaultStyle}`}
          >
            <RequestPageIcon /> Requests
          </Link>
        </li>
        <li>
          <Link
            href={'/admin/home/orders'}
            className={`py-[8px] px-[15px] flex gap-x-[10px] items-center ${pathname === '/admin/home/orders' ? activeStyle : defaultStyle}`}
          >
            <FindInPageIcon /> Orders
          </Link>
        </li>
        <li>
          <Link
            href={'/admin/home/drivers'}
            className={`py-[8px] px-[15px] flex gap-x-[10px] items-center ${pathname === '/admin/home/drivers' ? activeStyle : defaultStyle}`}
          >
            <PeopleIcon /> Drivers
          </Link>
        </li>
        <li>
          <Link
            href={'/admin/home/stores'}
            className={`py-[8px] px-[15px] flex gap-x-[10px] items-center ${pathname === '/admin/home/stores' ? activeStyle : defaultStyle}`}
          >
            <StoreIcon /> Stores
          </Link>
        </li>
        <li>
          <Link
            href={'/admin/home/vendors'}
            className={`py-[8px] px-[15px] flex gap-x-[10px] items-center ${pathname === '/admin/home/vendors' ? activeStyle : defaultStyle}`}
          >
            <CorporateFareIcon /> Vendors
          </Link>
        </li>
        <li>
          <Link
            href={'/admin/home/escalations'}
            className={`py-[8px] px-[15px] flex gap-x-[10px] items-center ${pathname === '/admin/home/escalations' ? activeStyle : defaultStyle}`}
          >
            <BarChartIcon /> Escalations
          </Link>
        </li>
      </ul>
      <SideBar open={openSideBar} setOpen={setOpenSideBar} onClick={onClick1} children={sideBarEle()} width={280} />
      {children}


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

      <CustomDialog open={openDialogLogout} setOpen={setOpenDialogLogout} content={"Are you sure you want to log out?"} title={'Confirm Dialog'} handleAgree={onLogout} />
      <CustomDialog open={openDialogChangePass} setOpen={setOpenDialogChangePass} content={"Are you sure you want to change your password?"} title={'Confirm Dialog'} handleAgree={onChangePass} />
    </div>
  );
}
