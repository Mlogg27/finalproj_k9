import { getNewAccessToken } from "@/ulties/axios";

const checkAndRefreshToken = async ()  => {
  let accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      const res = await getNewAccessToken();
      if (res.status === 200) {
        accessToken  = res.data['access_token'];
        if(accessToken) localStorage.setItem('accessToken', accessToken);
        return accessToken;
      } else {
        localStorage.clear();
        throw new Error('Can`t get a new access token');
      }
    } else return accessToken;
  } else {
    localStorage.clear();
    return false;
  }
};

export default checkAndRefreshToken;
