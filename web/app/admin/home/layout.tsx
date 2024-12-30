'use client';

import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BarChartIcon from '@mui/icons-material/BarChart';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const activeStyle = 'bg-[#2c2c2c] text-white rounded-[6px]';
  const defaultStyle = 'bg-transparent text-black';

  return (
    <div className='flex mx-[10px] mt-[20px]'>
      <ul className='flex flex-col gap-y-[10px] w-[200px]'>
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
      {children}
    </div>
  );
}
