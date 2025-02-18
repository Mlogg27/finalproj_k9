import React from "react";
import { SetStateAction } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomButton, CustomInput } from "@/components";

type Inputs = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  isPassword: boolean;
  autocomplete?: string;
};

type Selects = {
  value: string;
  name: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  content?: string;
  handleAgree: (a ?: any) => void;
  inputs?: Inputs[];
  selects?: Selects[];
  selectedRequest?: Record<any, any>;
}

const CustomDialog : React.FC<Props> = ({open, setOpen, title, content, handleAgree, inputs, selects, selectedRequest}) =>{
  const [option, setOption ] = React.useState<string>('');
  const handleDisagree =() => {
    setOpen(false);
    if(selectedRequest){
      selectedRequest.current ={};
    }
  }
  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center'}}>
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{textAlign: 'center', fontSize: '14px'}}>
              {content}
            </DialogContentText>
            <div className={'w-full flex flex-col justify-center items-center mt-[25px] gap-y-[25px]'}>
              {inputs?.map((input, idx)=>{
                return <CustomInput type={input.type}
                                    label={input.label}
                                    isPassword={input.isPassword}
                                    name={input.name} placeholder={input.placeholder}
                                    autocomplete={input.autocomplete}
                                    key={`input-${idx}`}/>
              })}
            </div>
            {selects && <select className="w-[420px] mt-[30px] border border-gray-400 rounded-[4px] h-[30px] outline-none" value={option} onChange={(e)=> {setOption(e.target.value)}}>
              {selects.map((option, idx) => {
                return <option key={`opt-${idx}`} value={option.value}>{option.name}</option>
              })}
            </select>}
          </DialogContent>
          <DialogActions sx={{width: 200, marginRight: 2, marginLeft: "auto"}}>
            <CustomButton name={"Cancel"} bgColor={"#2c2c2c"} tColor={"#fff"} onClick={handleDisagree}/>
            <CustomButton name={"Approve"} bgColor={"#2c2c2c"} tColor={"#fff"} onClick={()=>{
              handleAgree(option);
              setOption('none')}}/>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  )
}

export default React.memo(CustomDialog);