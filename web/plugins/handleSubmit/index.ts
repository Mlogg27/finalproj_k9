import handleCheck from "@plugins/handleCheck";
import React, { SetStateAction } from "react";

type ApiCall = (payload: any) => any;

type Handlers = {
  onSuccess?: (res: any) => void;
  onError?: (res: any) => void;
};

type StateHandlers = {
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<SetStateAction<string>>;
  setAlertSeverity: React.Dispatch<SetStateAction<'success' | 'error' | 'warning' | 'info'>>;
};

type ExecuteActionParams = {
  apiCall: ApiCall;
  payload: any;
  handlers?: Handlers;
  setStateHandlers: StateHandlers;
  necessaryFields: string[];
  dispatch: (action: any) => void;
};

const handleSubmit = async ({
                               apiCall,
                               payload,
                               handlers = {},
                               setStateHandlers,
                               necessaryFields,
                               dispatch,
                             }: ExecuteActionParams): Promise<void> => {
  const { setLoading, setOpen, setAlertMessage, setAlertSeverity } = setStateHandlers;

  const {
    onSuccess = () => {},
    onError = () => {},
  } = handlers;

  setLoading(true);

  const isValid = await handleCheck(payload, necessaryFields, setLoading, setOpen, setAlertMessage, setAlertSeverity, dispatch);

  if(isValid){
      const res = await apiCall(payload);
      console.log(res)
      const { status, data } = res;
      setLoading(false);
      setOpen(true);
      setAlertMessage(data.message || 'Action completed successfully');

      if (status === 200 || status === 201 ) {
        setAlertSeverity('success');
        onSuccess(res);
      } else {
        setAlertSeverity('warning');
        if (status === 404) setAlertMessage('Server Not Found');
        onError(res);
  }}
};

export default handleSubmit;