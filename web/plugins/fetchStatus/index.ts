import { getVerifyStatus } from "@/ulties/axios";

const fetchStatus = async (routerOnVerifyStatus : any) => {
  const isLogin = typeof window !== 'undefined' && localStorage.getItem('accessToken');
  if (isLogin) {
    const verifyStatus = localStorage.getItem('verifyStatus');
    if (verifyStatus) {
      routerOnVerifyStatus(verifyStatus);
      return true;
    } else {
      const res = await getVerifyStatus();
      const data = res.data;
      if (res.status === 200) {
        routerOnVerifyStatus(data['verify']);
        localStorage.setItem('verifyStatus', data['verify']);
      } else {
        routerOnVerifyStatus('login');
      }
    }
  }
};

export default fetchStatus;