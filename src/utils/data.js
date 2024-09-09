import { MdHome, MdFactCheck } from 'react-icons/md';
import { IoHourglassOutline } from 'react-icons/io5';
import { BsExclamationSquareFill } from 'react-icons/bs';
import { MdImportantDevices } from 'react-icons/md';

{
  /* <MdHome /> */
  // <MdFactCheck />
  // <IoHourglassOutline />
  // <BsExclamationSquareFill />
}

export const navMenus = [
  { label: 'Home', to: '/', icon: <MdHome className="w-6 h-6" />, idx: 0 },
  {
    label: 'Completed',
    to: '/Completed',
    icon: <MdFactCheck className="w-5 h-5" />,
    idx: 1,
  },
  {
    label: 'Proceeding',
    to: '/Proceeding',
    icon: <IoHourglassOutline className="w-5 h-5" />,
    idx: 2,
  },
  {
    label: 'Important',
    to: '/Important',
    icon: <MdImportantDevices className="w-5 h-5" />,
    idx: 3,
  },
];
