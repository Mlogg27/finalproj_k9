import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { SetStateAction } from "react";
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CustomButton } from "@/components";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
  children: React.ReactNode;
  width: number;
}

const TemporaryDrawer  :React.FC<Props> =( {open, setOpen, onClick, children, width}) => {

  const DrawerList = (
    <Box sx={{ width: width }} style={{ backgroundColor: '#2c2c2c', color: '#fff', height: '100vh', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} role="presentation">
      {children}
      <div style={{width: `${width}px`}} className={`flex justify-center items-center fixed bottom-[25px]`}>
        <CustomButton name={'Log out'} onClick={onClick} tColor={'#000'} bgColor={'#fff'} />
      </div>
    </Box>
  );

  return (
    <div className='z-40'>
      <button onClick={() => {
        setOpen(true)
      }}><AccountCircleIcon style={{ fontSize: '45px', position: 'absolute', top: '40px', right: '50px' }} /></button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default React.memo(TemporaryDrawer);