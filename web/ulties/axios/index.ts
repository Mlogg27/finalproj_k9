import axios from "axios";
import { checkAndRefreshToken } from "@plugins/verifyAccessToken";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

const handleRequest = async (method: "get" | "post" | "delete", url: string, data?: any, accType?: string) => {
  const headers = accType ? await getAuthHeaders(accType) : {};
  try {
    return await apiClient({ method, url, data, headers });
  } catch (e) {
    // @ts-ignore
    return e.response;
  }
};

const getAuthHeaders = async (accType: string) => {
  const token: string = await checkAndRefreshToken(accType);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const login = (email: string, password: string, type: string) => handleRequest("post", `/auth/login`, { email, password, type });

const register = (email: string, phoneNumber: string, password: string) => handleRequest("post", "/driver/register", { email, phoneNumber, password });

const getNewAccessToken = (type: string) => handleRequest("post", `/auth/rf-token`, {type}, type);

const sendOtp = () => handleRequest("get", "/driver/sendOtp", {}, "driver");

const verifyOtp = (otp: string) => handleRequest("post", "/driver/verifyOtp", { otp }, "driver");

const getMailRFPassword = (email: string, type: string) => handleRequest("post", `/auth/rf-pass`, { email, type });

const uploadImg = (images: { payload: string; isIdentity: boolean }[]) => handleRequest("post", "images/", { images }, "driver");

const verifyInfo = (payload: any) => handleRequest("post", "driver/verifyInfo", { payload }, "driver");

const setUpVehicle = (payload: any) => handleRequest("post", "vehicle/createOrUpdate", { payload }, "driver");

const sendRequest = (payload: any) => handleRequest("post", "request/create", { payload });

const getLists = (validationType: string, query: string | '', lists: string) => handleRequest("get", `${lists}/?${query}`, {}, validationType);

const createOrDeleteAccountByAdmin = (type: string, id: number, isCreate: boolean, reason?: string) => {
  const url = isCreate ? `request/createAcc/${id}` : `request/${id}`;
  const method = isCreate ? "post" : "delete";
  return handleRequest(method, url, isCreate ? {} : { reason }, type);
};

const logout = async (accountType: string) =>{
  const rfToken = localStorage.getItem('refreshToken');
  try{
    return await apiClient.post(`/${accountType}/logout`, {}, {
      headers: { Authorization: `Bearer ${rfToken}` },
    });
  } catch (e){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return e.response
  }
};




export { login, getNewAccessToken, register, sendOtp, verifyOtp, getMailRFPassword, uploadImg, verifyInfo, setUpVehicle, sendRequest, getLists, createOrDeleteAccountByAdmin, logout };
