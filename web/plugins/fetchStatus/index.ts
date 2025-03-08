const fetchStatus = (): string => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      return localStorage.getItem("verifyStatus") || "login";
    }
  }
  return "login";
};

export default fetchStatus;