import {memo} from 'react';
interface CustomButtonProps {
  name: string;
  bgColor: string;
  tColor: string;
  onClick?: () => void ;
}


const CustomButton: React.FC<CustomButtonProps> = ({ name, bgColor, tColor, onClick }) => {
  const buttonStyle = {
    backgroundColor: bgColor,
    color: tColor,
  };
  return (
    <button onClick={onClick} style={buttonStyle} className='text-sm rounded-[5px] py-[5px] flex justify-center items-center w-[90%] mt-[5px]' >
      {name}
    </button>
  );
};

export default memo(CustomButton);