'use client';

import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BarChartIcon from '@mui/icons-material/BarChart';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React from "react";
import { CustomInput, SideBar } from "@/components";
import { useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [showChangePass, setShowChangePass] = React.useState(false);
  const inputtingValue = useSelector(getInputting);


  const onClick = () =>{
    console.log('hehe');
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
            <input id={"email"} type="text" disabled={true} className={"w-full rounded-[6px] text-center px-[2px] py-[5px]"} value={inputtingValue.email} />
          </div>
        }

        {
          showChangePass &&
          <div className={"text-[#000] flex flex-col justify-center items-center w-[240px]"}>
            <label className={'text-white font-semibold'}>Your Old Password</label>
            <CustomInput isPassword={true} type={"password"} name={"prevPass"} placeholder={"Your old password"} />
            <label className={'text-white font-semibold mt-[25px]'}>Your New Password</label>
            <CustomInput isPassword={true} type={"password"} name={"newPass"} placeholder={"Your new password"} />
            <label className={'text-white font-semibold mt-[25px]'}>Confirm Your Password</label>
            <CustomInput isPassword={true} type={"password"} name={"cfPass"} placeholder={"Confirm your password"} />
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
      <SideBar open={open} setOpen={setOpen} onClick={onClick} children={sideBarEle()} width={280} />
      {children}
    </div>
  );
}
