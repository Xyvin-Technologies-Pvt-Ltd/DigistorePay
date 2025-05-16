import { ImMobile } from "react-icons/im";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { GiRotaryPhone, GiGasStove, GiTap, GiHelp } from "react-icons/gi";
import { MdRouter } from "react-icons/md";
import { BiBus } from "react-icons/bi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaBookReader, FaTrain } from "react-icons/fa";
import {
  FaHandsHoldingChild,
  FaCoins,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { FaRegAddressCard } from "react-icons/fa";
import { TbEPassport } from "react-icons/tb";
import { IoReceipt } from "react-icons/io5";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaBoxesPacking } from "react-icons/fa6";

export const services = [
  {
    name: "Mobile",
    icon: <ImMobile />,
    link: "/services/mobile",
    access: ["franchise"],
  },
  {
    name: "DTH",
    icon: <PiTelevisionSimpleBold />,
    link: "/services/dth",
    access: ["franchise"],
  },
  // {
  //   name: "Landline",
  //   icon: <GiRotaryPhone />,
  //   link: "/services/landline",
  //   access: ["franchise"],
  // },
  {
    name: "Electricity",
    icon: <RiLightbulbFlashFill />,
    link: "/services/electricity",
    access: ["franchise"],
  },
  {
    name: "Water",
    icon: <GiTap />,
    link: "/services/water",
    access: ["franchise"],
  },
  {
    name: "FastTag",
    icon: <BsCreditCard2FrontFill />,
    link: "/services/fasttag",
    access: ["franchise"],
  },
  {
    name: "DMT",
    icon: <FaMoneyBillTransfer />,
    link: "/services/dmt",
    access: ["franchise"],
  },
  // {
  //   name: "Train",
  //   icon: <FaTrain />,
  //   link: "/services/train",
  //   access: ["franchise"],
  // },
   // {
  //   name: "Bus",
  //   icon: <BiBus />,
  //   link: "/services/bus",
  //   access: ["franchise"],
  // },
  {
    name: "Pan Card",
    icon: <FaRegAddressCard />,
    link: "/services/pancard",
    access: ["franchise"],
  },
  {
    name: "Passport",
    icon: <TbEPassport />,
    link: "/services/passport",
    access: ["franchise"],
  },
  // {
  //   name: "Accounting",
  //   icon: <HiOutlineReceiptTax />,
  //   link: "/services/tax",
  //   access: ["franchise"],
  // },
  // {
  //   name: "Loan",
  //   icon: <FaCoins />,
  //   link: "/services/loan",
  //   access: ["franchise"],
  // },
  // {
  //   name: "Insurance",
  //   icon: <FaHandsHoldingChild />,
  //   link: "/services/insurance",
  //   access: ["franchise"],
  // },
  // {
  //   name: "Udyam",
  //   icon: <IoReceipt />,
  //   link: "/services/udyam",
  //   access: ["franchise"],
  // },
  // {
  //   name: "FSSAI",
  //   icon: <BiSolidFoodMenu />,
  //   link: "/services/fssai",
  //   access: ["franchise"],
  // },
  // {
  //   name: "Packing License",
  //   icon: <FaBoxesPacking />,
  //   link: "/services/packing",
  //   access: ["franchise"],
  // },
  // {
  //   name: "Broadband",
  //   icon: <MdRouter />,
  //   link: "/services/broadband",
  //   access: ["admin"],
  // },
  // {
  //   name: "Cylinder",
  //   icon: <GiGasStove />,
  //   link: "/services/cylinder",
  //   access: ["admin"],
  // },
  // {
  //   name: "Education",
  //   icon: <FaBookReader />,
  //   link: "/services/education",
  //   access: ["admin"],
  // },
  // {
  //   name: "Others",
  //   icon: <GiHelp />,
  //   link: "https://app.digistorepay.com/",
  //   access: ["admin"],
  // },
];
