import Countdown from "react-countdown";
import React from "react";
import Link from "next/link";

interface Props{
  startPoint: number;
}

const CountDown: React.FC<Props> = ({startPoint}) =>{
  const onCountdownComplete = () => {
    console.log("Countdown finished!");
  };
  // @ts-ignore
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      return (
        <Link href={"#"} className="underline font-semibold cursor-pointer">
          Resend Code here!
        </Link>
      );
    } else {
      return <span>Resend in {seconds} seconds</span>;
    }
  };
  return (
    <>
      <Countdown
        date={Date.now() + startPoint*10000}
        renderer={renderer}
        onComplete={onCountdownComplete}
      />
    </>
  )
}

export default React.memo(CountDown);