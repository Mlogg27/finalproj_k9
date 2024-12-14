import { useRouter } from 'next/navigation';

export const useNavigateBasedOnVerification = () => {
  const router = useRouter();

  return  (verifyStatus:string) => {
    switch (verifyStatus) {
      case 'unverified':
        router.push('/driver/verify_setup/email');
        break;
      case 'step2':
        router.push('/driver/verify_setup/identity/upload');
        break;
      case 'step3':
        router.push('/driver/verify_setup/vehicle');
        break;
      case 'verified':
        router.push('/driver/home');
        break;
      default:
        router.push('/driver/login?alert=true');
        break;
    }
  };
};
