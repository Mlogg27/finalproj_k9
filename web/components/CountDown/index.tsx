import Countdown from "react-countdown";
import React, { SetStateAction } from "react";
import { sendOtp } from "@/ulties/axios";

interface Props {
  startPoint: number;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setAlertSeverity: React.Dispatch<
    SetStateAction<"success" | "error" | "info" | "warning">
  >;
  setAlertMessage: React.Dispatch<SetStateAction<string>>;
}

const CountDown: React.FC<Props> = ({
                                      startPoint,
                                      setOpen,
                                      setAlertSeverity,
                                      setAlertMessage,
                                    }) => {
  const [resend, setResend] = React.useState(false);
  const [startDate, setStartDate] = React.useState(Date.now());

  const onCountdownComplete = () => {
    console.log("Countdown finished!");
  };

  const onClick = async () => {
    if (!resend) {
      setResend(true);
      setOpen(true);
      setAlertMessage("We have sent a new otp code to your email. Please check it out!");
      setAlertSeverity("success");
      await sendOtp();
      setStartDate(Date.now());
    }
    setResend(false);
  };

  // @ts-ignore
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      return (
        <span
          onClick={onClick}
          className="underline font-semibold cursor-pointer"
        >
          Resend Code here!
        </span>
      );
    } else {
      return <span>Resend in {seconds} seconds</span>;
    }
  };

  return (
    <>
      <Countdown
        date={startDate + startPoint * 10000}
        renderer={renderer}
        onComplete={onCountdownComplete}
        key={startDate}
      />
    </>
  );
};

export default React.memo(CountDown);
