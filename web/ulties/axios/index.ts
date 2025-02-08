import axios from "axios";
import { checkAndRefreshToken } from "@plugins/verifyAccessToken";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type" : "application/json"
  }
});
const login = async  (email: string, password:string, accType: string) =>{
    try {
      const res = await apiClient.post(`/${accType}/login`, { email, password });
      return res;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response;
    }
}

const register = async  (email:string, phoneNumber: string, password:  string) =>{
  try {
    const res = await apiClient.post('/driver/register', { email, phoneNumber, password });
    return res;
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return e.response;
  }
}

const getNewAccessToken = async (accType: string)=>{
  const rfToken = localStorage.getItem('refreshToken');
  if(rfToken){
    try {
      const res= await apiClient.post(
        `/${accType}/rf-token`,{},
        {
          headers: {
            Authorization: `Bearer ${rfToken}`,
          },
        }
      );
      return res;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response;
    }
  }
  else{
    return false;
  }
}

const sendOtp = async ( ) =>{
  const accessToken = await checkAndRefreshToken('driver');
  if(accessToken){
    try {
      const res = await apiClient.get(
        '/driver/sendOtp',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response;
    }
  } else return false;
};

const verifyOtp = async (otp : string ) =>{
  const accessToken = await checkAndRefreshToken('driver');
  if(accessToken){
    try {
      const res = await apiClient.post(
        '/driver/verifyOtp',
        {
          "otp": otp,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response;
    }
  } else return false;
};

const getMailRFPassword = async (email: string, accType: string)=>{
  try {
    const res= await apiClient.post(`${accType}/rf-pass`, {
      email: email
    });
    return res;
  } catch(e){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return e.response
  }
}

const uploadImg = async (images: {payload: string, isIdentity: boolean}[])=>{
  const accessToken = await checkAndRefreshToken('driver');

  if(accessToken){
    try {
      const res = await apiClient.post(
        'images/',
        {
          images: images
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        }
      );
      return res;
    } catch(e){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response
    }
  }
}

const verifyInfo= async (payload :any)=>{
  const accessToken = await checkAndRefreshToken('driver');

  if(accessToken){
    try {
      const res = await apiClient.post(
        'driver/verifyInfo',
        {
          payload: payload,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res;
    } catch(e){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response
    }
  }
}

const setUpVehicle= async (payload :any)=>{
  const accessToken = await checkAndRefreshToken('driver');

  if(accessToken){
    try {
      const res = await apiClient.post(
        'vehicle/createOrUpdate',
        {
          payload: payload,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res;
    } catch(e){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response
    }
  }
}

const sendRequest= async (payload: any) =>{
  try {
    const res = await apiClient.post(
      'request/create',
      {
        payload
      },
    );
    return res;
  } catch(e){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return e.response
  }
}

const getRequests= async (type: string) =>{
  const accessToken = await checkAndRefreshToken(type);

  if(accessToken){
    try {
      const res = await apiClient.get(
        'request/?status=pending',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        },
      );
      return res;
    } catch(e){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response
    }
  }
}

const createOrDeleteAccountByAdmin= async (type: string, id: number, isCreate: boolean, reason ?: string) =>{
  const accessToken = await checkAndRefreshToken(type);
  const path = isCreate ? `createAcc/${id}` : `/${id}`;
  const method = isCreate ? "post": "delete" ;

  if(accessToken){
    try {
      const res = await apiClient[method](
        `request/${path}`,
        {
          reason: reason
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        },
      );
      return res;
    } catch(e){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response
    }
  }
}

export {login, getNewAccessToken, register, sendOtp, verifyOtp, getMailRFPassword, uploadImg, verifyInfo, setUpVehicle, sendRequest, getRequests, createOrDeleteAccountByAdmin};