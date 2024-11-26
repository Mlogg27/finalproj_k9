"use client"

import { VerifyProcessBar } from "@/components";
import React from "react";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex flex-col justify-center items-center">
      <VerifyProcessBar process={66} step={2} totalStep={3} />
      <h1 className="text-center mt-[30px] font-semibold text-[26px]">
        Verify driver identity
      </h1>
      <p className="mb-[40px] text-center flex justify-center items-center text-[#9E9E9E] text-sm">
        Please upload a photo of your ID card & drive<br /> license to confirm your identity
      </p>
      {children}
      </div>
  );
}