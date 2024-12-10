import {ChangeEvent, memo} from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch } from "react-redux";
import {inputtingSlice} from "@/lib/features";


interface UploadImageBoxProps {
  onChange: (imageURL : string)=> void ;
  width: number | string;
  height: number | string;
  image: string;
  name?: string;
  label?: string;

}

const UploadImageBox: React.FC<UploadImageBoxProps> = ({ width, height, onChange, image, name, label }) => {
  const imageBox = {
    width: width,
    height: height,
  }
  const dispatch = useDispatch();
  const handleFileChange =  (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if ( file) {
      const {name, value} = event.target;
      dispatch(inputtingSlice.actions.input({name, value}));
      const imageURL: string = URL.createObjectURL(file);
      onChange(imageURL);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>{
        const base64 =  reader.result;
        if( typeof base64 === 'string'){
          const imageBase64 = base64?.split(',')[1];
        }
      }
    }
  };
  return (
    <div className='flex flex-col justify-center items-center w-[100%]' >
      <span  className='text-sm font-semibold mr-auto mb-[5px]'>{label}</span>
      <label
        htmlFor={`cameraInput ${name}`}
        style={imageBox}
        className="border-2 rounded-[6px] bg-[#EEEFF3] border-[#CBCCD0] flex items-center justify-center cursor-pointer"
      >
        {image ? (
          <img
            src={image}
            alt="Preview Image"
            className="w-full h-full object-cover rounded-[6px]"
          />
        ) : (
          <span><CameraAltIcon/></span>
        )}
      </label>
      <input
        type="file"
        id={`cameraInput ${name}`}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className='hidden'
        name={name}
      />
    </div>
  )
};

export default memo(UploadImageBox);