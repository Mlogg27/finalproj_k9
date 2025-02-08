import React from "react";
import { SetStateAction } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomInput } from "@/components";

type Inputs = {
  type: "text" | "password" | "email" | "number";
  placeholder?: string
  isPassword: boolean;
  label: string;
  name: string;
  autocomplete?: string;
}

type Selects = {
  value: string;
  name: string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  content?: string;
  handleAgree: () => void;
  inputs?: Inputs[];
  selects?: Selects[];
}

const CustomAlert : React.FC<Props> = ({open, setOpen, title, content, handleAgree, inputs, selects}) =>{
  const handleDisagree =() => {
    setOpen(false);
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
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
            {inputs?.map((input, idx)=>{
              return <CustomInput type={input.type}
                                  label={input.label}
                                  isPassword={input.isPassword}
                                  name={input.name} placeholder={input.placeholder}
                                  autocomplete={input.autocomplete}
                                  key={`input-${idx}`}/>
            })}
            {selects && <select>
              {selects.map((option, idx) => {
                return <option key={`opt-${idx}`} value={option.value}>{option.name}</option>
              })}
            </select>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisagree}>Cancel</Button>
            <Button onClick={handleAgree} autoFocus>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  )
}

export default React.memo(CustomAlert);