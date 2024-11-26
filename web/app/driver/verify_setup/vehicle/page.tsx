"use client"

import { UploadImageBox, CustomButton, CustomInput, VerifyProcessBar } from "@/components";
import React from "react";

export default function UploadIdentityPage () {



  return (
    <>
      <VerifyProcessBar process={100} step={3} totalStep={3} />
      <h1 className="text-center mt-[30px] font-semibold text-[26px]">
        Set up your vehicle
      </h1>
      <span className="mb-[40px] text-center flex justify-center items-center text-[#9E9E9E] text-sm">
        Please upload information of you vehicle
      </span>
    </>
  )
}


