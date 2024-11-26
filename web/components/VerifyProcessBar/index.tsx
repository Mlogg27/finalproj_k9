import { LinearProgress } from "@mui/material";
import React from "react";
import {memo} from 'react'

interface VerifyProcessBarProps {
  process: number;
  step: number;
  totalStep: number;
}

const VerifyProcessBar :React.FC<VerifyProcessBarProps> = ({ process, step, totalStep })=>{
  return (
    <div className='flex justify-center items-center w-[100vw] flex-col mt-[40px] gap-y-[10px]'>
      <span>Step {step} in {totalStep}</span>
      <LinearProgress
        className='w-[90%] rounded-[99px]'
        variant="determinate"
        value={process}
        sx={{
          height: 5,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#000',
          },
        }}
      />
    </div>
  )
}

export default memo(VerifyProcessBar);