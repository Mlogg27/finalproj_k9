"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createOrDeleteAccountByAdmin, getLists } from "@/ulties/axios";
import { CustomAlert, CustomDialog, TableContent } from "@/components";
import CircularProgress from "@mui/material/CircularProgress";

interface DesktopPageProps {
  typeOfLists: "vendor" | "store" | "driver" | "request" | "order";
  query: string | "";
  title: string;
  filterOptions?: { name: string; value: string }[];
}

export default function DesktopPages({
                                      typeOfLists,
                                      query,
                                      title,
                                      filterOptions = []
                                    }: DesktopPageProps
) {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<string>("none");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDialogApprove, setOpenDialogApprove] = useState<boolean>(false);
  const [openDialogRemove, setOpenDialogRemove] = useState<boolean>(false);
  const selectedItem = useRef<Record<any, any>>({});
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [loading, setLoading] = useState(false);

  const config = {
    vendor: {
      showSearch: true,
      showFilter: true,
      showReasonWhenRemove: true,
      showEdit: true,
    },
    store: {
      showSearch: true,
      showFilter: false,
      showReasonWhenRemove: true,
      showEdit: true,
    },
    driver: {
      showSearch: true,
      showFilter: true,
      showReasonWhenRemove: true,
      showEdit: true,
    },
    request: {
      showSearch: true,
      showFilter: true,
      showReasonWhenRemove: true,
      showEdit: false,
    },
    order: {
      showSearch: true,
      showFilter: true,
      showReasonWhenRemove: true,
      showEdit: true,
    },
  }[typeOfLists];

  useEffect(() => {
    const fetchData = async () => {
      const res = await getLists("admin", query, typeOfLists);
      if (res.status === 401) {
        localStorage.clear();
        router.push("/admin/login");
      }
      if (res.status === 200) {
        setData(res.data);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
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

  const rows = data.map((item) => {
    const createDate = new Date(item.Requests_created_at);
    return {
      id: item.Requests_id,
      name: item.Requests_name,
      email: item.Requests_email,
      phone: item.Requests_phone,
      type: item.Requests_type,
      location: item.Requests_location,
      createTime: createDate.toLocaleString("en-US"),
    };
  });

  const filteredRows = rows.filter((row) => {
    const matchesType = filterType === "none" || row.type === filterType;
    const matchesSearch = row.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilterType(e.target.value.toLowerCase());
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const onApprove = (e: any) => {
    setOpenDialogApprove(true);
    selectedItem.current = e;
  };

  const onRemove = (e: any) => {
    setOpenDialogRemove(true);
    selectedItem.current = e;
  };

  const handleApprove = async (reason?: string) => {
    try {
      setLoading(true);
      if (!selectedItem.current?.id) return;

      const id = parseInt(selectedItem.current.id);
      const isCreate = !reason;
      const res = await createOrDeleteAccountByAdmin(
        "admin",
        id,
        isCreate,
        reason
      );

      if (!res) return;

      if (res.status === 401) {
        localStorage.clear();
        router.push("/admin/login");
        return;
      }

      setAlertMessage(res.data?.message || "Operation completed");
      setAlertSeverity(
        res.status === 200 || res.status === 201 ? "success" : "warning"
      );

      if (res.status === 200 || res.status === 201) {
        setData((prev) => prev.filter((r) => r.Requests_id !== id));
      }
    } catch (err) {
      console.error(err);
      setAlertMessage("An error occurred. Please try again.");
      setAlertSeverity("error");
    } finally {
      setLoading(false);
      setOpenDialogApprove(false);
      setOpenDialogRemove(false);
      selectedItem.current = {};
    }
  };

  return (
    <div className="flex flex-col mx-[20px] mt-[-50px] w-full h-full">
      <h1 className="font-medium text-[20px] mb-[10px]">{title}</h1>
      <div className="flex gap-x-[10px] items-center h-[30px] mb-[20px]">
        {config.showSearch && (
          <input
            type="text"
            placeholder="Search name..."
            className="h-full w-[400px] outline-none border border-gray-400 rounded-[4px] box-border px-[5px]"
            onChange={onSearch}
          />
        )}
        {config.showFilter && filterOptions.length > 0 && (
          <select
            name="options"
            id="option-select"
            onChange={onChange}
            className="w-[320px] border border-gray-400 rounded-[4px] h-[30px] outline-none"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <TableContent
        columns={columns}
        rows={filteredRows}
        paginationModel={{ page: 0, pageSize: 10 }}
        onApprove={onApprove}
        onRemove={onRemove}
        showEdit={config.showEdit}
      />

      <CustomDialog
        open={openDialogApprove}
        setOpen={setOpenDialogApprove}
        title={"Confirm Account Approval"}
        isReason={false}
        content={"Are you sure you want to approve this request?"}
        handleAgree={handleApprove}
      />

      <CustomDialog
        open={openDialogRemove}
        setOpen={setOpenDialogRemove}
        title={"Confirm Account Removal"}
        isReason={true}
        content={"Are you sure you want to remove this request?"}
        handleAgree={handleApprove}
      />

      <CustomAlert
        setOpen={setOpen}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
        open={open}
      />

      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress style={{ color: "black" }} />
        </div>
      )}
    </div>
  );
}
