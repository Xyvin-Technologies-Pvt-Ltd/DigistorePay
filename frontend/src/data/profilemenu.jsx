import { PiFiles, PiCertificateBold } from "react-icons/pi";
import { RiAccountCircleLine, RiWallet3Line } from "react-icons/ri";
import { BsActivity, BsReceipt } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { MdOndemandVideo } from "react-icons/md";

export const profileMenu = [
  {
    name: "Summary",
    icon: <PiFiles />,
    link: "/profile/summary",
    access: ["admin", "franchise", "staff"],
  },
  {
    name: "Activity",
    icon: <BsActivity />,
    link: "/profile/activity",
    access: ["admin"],
  },
  {
    name: "Account",
    icon: <RiAccountCircleLine />,
    link: "/profile/account",
    access: ["franchise", "staff"],
  },
  {
    name: "Tutorial",
    icon: <PiCertificateBold />,
    link: "/profile/training",
    access: ["admin", "franchise", "staff"],
  },
  {
    name: "Work",
    icon: <BiTask />,
    link: "/profile/jobs",
    access: ["admin","franchise", "staff"],
  },
  {
    name: "Transaction",
    icon: <BsReceipt />,
    link: "/profile/transactions",
    access: ["admin", "franchise"],
  },
  {
    name: "Wallet",
    icon: <RiWallet3Line />,
    link: "/profile/wallet",
    access: ["admin", "franchise"],
  },
];
