import { useRouter } from 'next/navigation';

export const useNavigateBasedOnVerification = () => {
  const router = useRouter();

  return  (verifyStatus:string) => {
    switch (verifyStatus) {
      case 'unverified':
        router.replace('/driver/verify_setup/email');
        break;
      case 'step2':
        router.replace('/driver/verify_setup/identity/upload');
        break;
      case 'step3':
        router.replace('/driver/verify_setup/vehicle');
        break;
      case 'verified':
        router.replace('/driver/home');
        break;
      default:
        router.replace('/driver/login?alert=true');
        break;
    }
  };
};
