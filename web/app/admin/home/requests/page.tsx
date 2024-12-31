"use client";

import React, { useEffect } from "react";
import { getRequest } from "@/ulties/axios";

export default function HomePage() {
  const [optValue, setOptValue] = React.useState(null)

  useEffect(() => {
  }, []);

  const onChange =(e: any ) =>{
    setOptValue(e.target?.value || null)
  }
  
  return (
    <div className={"flex flex-col mx-[20px] mt-[-50px] w-full h-full"}>
      <div className={"flex flex-col gap-y-[20px]"}>
        <h1 className={'font-medium text-[20px]'}>Requests</h1>

        <div className={'flex gap-x-[10px] items-center h-[30px]'}>
          <input type={'text'} placeholder={'Search'} className={'h-full w-[400px] outline-none border border-gray-400 rounded-[4px] box-border px-[5px]'}/>
          <select name="options" id="option-select" onChange={onChange} className={'w-[320px] border border-gray-400 rounded-[4px] h-[30px] outline-none'}>
            <option value="none"></option>
            <option value="vendor">Vendor</option>
            <option value="store">Store</option>
          </select>
        </div>
      </div>
    </div>
  );
}
