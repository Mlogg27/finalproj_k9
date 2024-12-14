import { getNewAccessToken } from "@/ulties/axios";

const checkAndRefreshToken = async () => {
  const isTokenValid = checkToken();
  if (isTokenValid) {
    return localStorage.getItem("accessToken");
  } else {
    return await getNewAccessToken();
  }
};

const checkToken = ()=>{
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    try {
      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken && decodedToken.exp) {
        return decodedToken.exp > currentTime;
      } else {
        localStorage.clear();
        console.error("Invalid token format or missing expiration field");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.clear();
      return false;
    }
  } else {
    return false;
  }
}


export  {checkAndRefreshToken, checkToken};
