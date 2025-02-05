"use client";

import React, { useEffect } from "react";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getRequests } from "@/ulties/axios";

export default function HomePage() {
  const router = useRouter()
  const [choice, setChoice] = React.useState(null);
  const [requests, setRequests] = React.useState([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const isLogin = localStorage.getItem("accessToken");
    if(!isLogin) {
      router.push("/admin/login");
    }
    const fetchRequests = async () => {
      const res = await getRequests('admin');
      console.log(res);
      if(res.status === 401){
        localStorage.clear();
        router.push('/admin/login');
      }
      if(res.status === 200){
        setRequests(res.data);
      }
    };
    fetchRequests().then();
  }, []);

  const columns =[
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'active', headerName: 'Active', width: 130 },
    { field: 'action', headerName: 'Action', width: 70 },
  ];
  console.log(requests);
  const rows = requests.map((request) => {

  })
  const onChange =(e: any ) =>{
    setChoice(e.target?.value || null)
  };


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


