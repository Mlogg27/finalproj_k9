import { useState , ChangeEvent } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useDispatch, useSelector} from "react-redux";
import {inputtingSlice} from "@/lib/features";
import {getInputting} from "@/lib/selector";
import React from "react";


interface CustomInputProps {
  placeholder?: string;
  type: string;
  label?: string;
  isPassword: boolean;
  name: string;
  autocomplete?: string;
  key?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ label, placeholder, isPassword, type, name, autocomplete, key }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);
  const dispatch = useDispatch();
  const inputting = useSelector(getInputting);
  const onInput = (e : ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    dispatch(inputtingSlice.actions.input({name, value}));
  }
  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible((prev :boolean):boolean => !prev);
  };
  return (
    <label className="relative flex flex-col w-[90%] justify-center">
      <span className="text-sm font-semibold">{label}</span>
      <input
        key={key}
        className="text-sm border rounded-[6px] outline-none px-[10px] py-[5px]"
        type={type === "password" && isPasswordVisible ? 'text' : type}
        placeholder={placeholder || "Enter your information"}
        name={name}
        value={inputting[name] || ''}
        onChange={(e)=>{onInput(e)}}
        autoComplete={autocomplete}
      />
      {type === "password" && (
        <span
          className="cursor-pointer absolute top-[55%] right-[10px] transform -translate-y-1/2"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible  ? <VisibilityIcon style={{color: '#B9B9B9'}} /> : <VisibilityOffIcon style={{color: '#B9B9B9'}}/>}
        </span>
      )}
    </label>
  );
};

export default React.memo(CustomInput);
