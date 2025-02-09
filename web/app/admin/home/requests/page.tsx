"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrDeleteAccountByAdmin, getRequests } from "@/ulties/axios";
import { CustomAlert, CustomDialog, TableContent } from "@/components";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<string>("none");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDialogApprove, setOpenDialogApprove] = useState<boolean>(false);
  const [openDialogRemove, setOpenDialogRemove] = useState<boolean>(false);
  const selectedRequest = React.useRef<Record<any, any>>({});
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>("success");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const isLogin = localStorage.getItem("accessToken");
    if (!isLogin) {
      router.push("/admin/login");
    }

    const fetchRequests = async () => {
      const res = await getRequests("admin");
      if (res.status === 401) {
        localStorage.clear();
        router.push("/admin/login");
      }
      if (res.status === 200) {
        setRequests(res.data);
      }
    };
    fetchRequests().then();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "type", headerName: "Type", width: 120 },
    { field: "location", headerName: "Location", width: 190 },
    { field: "createTime", headerName: "Create Time", width: 150 },
  ];

  const rows = requests.map((request) => {
    const createDate = new Date(request.Requests_created_at);
    return {
      id: request.Requests_id,
      name: request.Requests_name,
      email: request.Requests_email,
      phone: request.Requests_phone,
      type: request.Requests_type,
      location: request.Requests_location,
      createTime: createDate.toLocaleString("en-US"),
    };
  });

  const filteredRows = rows.filter((row) => {
    const matchesType = filterType === "none" || row.type === filterType;
    const matchesSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value.toLowerCase());
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onApprove = (e :any) => {
    setOpenDialogApprove(true);
    selectedRequest.current= e;
  };
  const onRemove = (e :any) => {
    setOpenDialogRemove(true);
    selectedRequest.current= e;
  };

  const handleApprove = async () =>{
    setLoading(true);
    const id = parseInt(selectedRequest.current.id);
    const res = await createOrDeleteAccountByAdmin('admin', id, true);
    setOpen(true);
    setAlertMessage(res.data.message);
    setAlertSeverity('warning');

    if(res.status === 401) {
      setLoading(false);
      localStorage.clear();
      router.push('/admin/home');
    }
    if(res.status === 201) {
      setAlertSeverity('success');
      setRequests(prevRequests => prevRequests.filter(req => req.Requests_id !== id));
      setLoading(false);
    }

    setLoading(false);
    setOpenDialogApprove(false);
    selectedRequest.current ={};
  }

  console.log(document.activeElement);

  return (
    <div className="flex flex-col mx-[20px] mt-[-50px] w-full h-full">
      <div className="flex flex-col gap-y-[20px]">
        <h1 className="font-medium text-[20px]">Requests</h1>
        <div className="flex gap-x-[10px] items-center h-[30px]">
          <input
            type="text"
            placeholder="Search request's name"
            className="h-full w-[400px] outline-none border border-gray-400 rounded-[4px] box-border px-[5px]"
            onChange={onSearch}
          />
          <select
            name="options"
            id="option-select"
            onChange={onChange}
            className="w-[320px] border border-gray-400 rounded-[4px] h-[30px] outline-none"
          >
            <option value="none">Select request's type</option>
            <option value="vendor">Vendor</option>
            <option value="store">Store</option>
          </select>
        </div>
        <TableContent
          columns={columns}
          rows={filteredRows}
          paginationModel={{ page: 0, pageSize: 10 }}
          onApprove={onApprove}
          onRemove={onRemove}
        />
      </div>
      <CustomDialog open={openDialogApprove}
                    setOpen={setOpenDialogApprove}
                    title={"Confirm Account Approval"}
                    content={'Are you sure you want to approve this request? This action cannot be undone.'}
                    handleAgree={handleApprove}/>
      <CustomDialog open={openDialogRemove}
                    setOpen={setOpenDialogRemove}
                    title={"Confirm Account Approval"}
                    content={'Are you sure you want to approve this request? This action cannot be undone.'}
                    handleAgree={handleApprove}/>

      <CustomAlert
        setOpen={setOpen}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
        open={open} />

      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress style={{ color: "black" }} />
        </div>
      )}
    </div>
  );
}
