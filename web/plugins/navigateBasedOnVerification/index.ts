import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { inputtingSlice } from "@/lib/features";

export const useNavigateBasedOnVerification = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
        dispatch(inputtingSlice.actions.input({name: 'alert', value: 'Please login to continue'}));
        router.replace('/driver/login');
        break;
    }
  };
};
