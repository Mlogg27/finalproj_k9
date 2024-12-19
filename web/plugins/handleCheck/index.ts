import { inputtingSlice } from "@/lib/features";
import { validateInputs } from "@plugins/validation";
import React, { SetStateAction } from "react";


const handleCheck =async (
                      inputs : Record<string, string>,
                      necessaryFields: string[],
                      setLoading: React.Dispatch<SetStateAction<boolean>>,
                      setOpen: React.Dispatch<SetStateAction<boolean>>,
                      setAlertMessage : React.Dispatch<SetStateAction<string>>,
                      setAlertSeverity : React.Dispatch<SetStateAction<'success' | 'error' | 'info' | 'warning'>>,
                      dispatch: any) =>{
  const resultValid = validateInputs(inputs, necessaryFields );
  if (!resultValid.valid && resultValid.message && resultValid.severity && resultValid.name) {
        setLoading(false);
        setOpen(true);
        setAlertMessage(resultValid.message);
        setAlertSeverity(resultValid.severity);
        dispatch(inputtingSlice.actions.reset({ name: resultValid.name }));
        return false;
  }
  return resultValid.valid;
}


export default handleCheck;