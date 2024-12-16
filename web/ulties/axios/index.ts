import axios from "axios";
import { checkAndRefreshToken } from "@plugins/verifyAccessToken";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type" : "application/json"
  }
});
const login = async  (email: string, password:string) =>{
    try {
      return await apiClient.post('/auth/login', { email, password });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response;
    }
}

const register = async  (email:string, password: string, phoneNumber:  string) =>{
  try {
    return apiClient.post('/auth/login', { email, password, phoneNumber });
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return e.response;
  }
}

const getNewAccessToken = async ()=>{
  const rfToken = localStorage.getItem('refreshToken');
  if(rfToken){
    try {
      return await apiClient.post(
        '/auth/rf-token',
        {
          headers: {
            Authorization: `Bearer ${rfToken}`,
            'x-type-token': 'refresh'
          },
        }
      );
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
  const accessToken = await checkAndRefreshToken();
  if(accessToken){
    try {
      return await apiClient.get(
        '/driver/sendOtp',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response;
    }
  } else return false;
};

const verifyOtp = async (otp : string ) =>{
  const accessToken = await checkAndRefreshToken();
  if(accessToken){
    try {
      return await apiClient.post(
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
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response;
    }
  } else return false;
};

const getMailRFPassword = async (email: string)=>{
  try {
    return await apiClient.post('auth/rf-pass', {
      email: email
    });
  } catch(e){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return e.response
  }
}

export {login, getNewAccessToken, register, sendOtp, verifyOtp, getMailRFPassword};