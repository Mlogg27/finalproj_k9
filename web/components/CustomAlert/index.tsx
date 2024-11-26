import { Alert, Snackbar } from "@mui/material";
import * as React from "react";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

interface CustomAlertProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertSeverity: 'success' | 'error' | 'info' | 'warning';
  alertMessage: string;
  open: boolean;
}

const CustomAlert : React.FC<CustomAlertProps> = ( { alertSeverity, alertMessage, setOpen, open }) =>{
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={alertSeverity}
          onClose={handleClose}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default CustomAlert;
