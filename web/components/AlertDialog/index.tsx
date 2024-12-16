import React from "react";
import { SetStateAction } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface Props {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setState : React.Dispatch<SetStateAction<boolean>>;
  title: string;
  content?: string;
}

const AlertDialog : React.FC<Props> = ({open, setOpen, setState, title, content}) =>{
  const handleDisagree =() => {
    setOpen(false);
  }
  const handleAgree =() => {
    setOpen(false);
    setState(false);
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisagree}>Disagree</Button>
            <Button onClick={handleAgree} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  )
}

export default React.memo(AlertDialog);