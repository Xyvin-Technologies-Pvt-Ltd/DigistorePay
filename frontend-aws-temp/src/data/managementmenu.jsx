import { FaUser } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { RiWallet3Line } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";

export const managementMenu = [
  {
    name: "Franchise",
    icon: <FaUser />,
    link: "/management/franchise",
    access: ["admin", "staff"],
  },
  {
    name: "Staff",
    icon: <FaUserTie />,
    link: "/management/staff",
    access: ["admin"],
  },
  {
    name: "Payment",
    icon: <MdOutlinePayments />,
    link: "/management/payment",
    access: ["admin"],
  },
  {
    name: "Wallet",
    icon: <RiWallet3Line />,
    link: "/management/wallet",
    access: ["admin"],
  },
];
