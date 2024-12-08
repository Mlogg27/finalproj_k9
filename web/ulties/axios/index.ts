import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type" : "application/json"
  }
});
const login = async  (email:string, password: string) =>{
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      return res;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return e.response;
    }
}

const getVerifyStatus = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const res = await apiClient.get(
      '/auth/verifyStatus',
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
};


export {login, getVerifyStatus};