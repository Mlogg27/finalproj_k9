const fetchStatus = () :string => {
  const accessToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');

  if (accessToken) {
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