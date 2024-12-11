const fetchStatus = () :string => {
  const isLogin = typeof window !== 'undefined' && localStorage.getItem('accessToken');
  if (isLogin) {
    const verifyStatus = localStorage.getItem('verifyStatus');
    if (verifyStatus) {
      return verifyStatus;
    } else {
      return 'login';
      }
    }
  else{
    return 'login';
  }
};

export default fetchStatus;