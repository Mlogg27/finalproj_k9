import { memo } from 'react';
import { validateInputs } from "@plugins/validation";
import { inputtingSlice } from "@/lib/features";
import { useDispatch, useSelector } from "react-redux";
import { getInputting } from "@/lib/selector";
import * as React from "react";

interface CustomButtonProps {
  name: string;
  bgColor: string;
  tColor: string;
  setAlertMessage?: React.Dispatch<React.SetStateAction<string>>;
  setAlertSeverity?: React.Dispatch<React.SetStateAction<'success' | 'warning' | 'error'>>;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  necessaryFields: string[]
}

const CustomButton: React.FC<CustomButtonProps> = ({ name, bgColor, tColor, setAlertMessage, setAlertSeverity, setOpen, necessaryFields }) => {
  const buttonStyle = {
    backgroundColor: bgColor,
    color: tColor,
  };

  const inputtingValue = useSelector(getInputting);
  const dispatch: React.Dispatch<any> = useDispatch();

  const onClick = () => {
    const { phoneNumber, password, email } = inputtingValue;
    const result = validateInputs({ phoneNumber, password, email }, necessaryFields);
    console.log(result);

    if (setAlertMessage) {
      setAlertMessage(result.message);
    }

    if (setAlertSeverity) {
      setAlertSeverity(result.severity);
    }

    if (setOpen) {
      setOpen(true);
    }

    if (!result.valid && result.name) {
      console.log(result.name);
      dispatch(inputtingSlice.actions.reset({ name: result.name }));
    }

    if (result.valid) {
      dispatch(inputtingSlice.actions.reset({}));
    }
  };

  return (
    <button onClick={onClick} style={buttonStyle} className='text-sm rounded-[5px] py-[5px] flex justify-center items-center w-[90%] mt-[5px]'>
      {name}
    </button>
  );
};

export default memo(CustomButton);
