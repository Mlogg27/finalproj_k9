"use client";

import { CustomInput } from "@/components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";

export default function HomePage() {
  const [optValue, setOptValue] = React.useState(null)
  const opts = [
    { name: "Vendor", value: "vendor" },
    { name: "Store", value: "store" },
  ];
  const onChange =(e: any, opt: any) =>{
    setOptValue(opt?.value || null);
    switch (optValue){
    }
  }
  
  return (
    <div className={"flex flex-col mx-[20px] mt-[-25px] w-full h-full"}>
      <div className={"flex justify-center items-center"}>
        <h1>Requests</h1>
        <CustomInput
          label={"Search"}
          name={"search"}
          type={"text"}
          isPassword={false}
          autocomplete={""}
        />
        <Autocomplete
          disablePortal
          options={opts}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
