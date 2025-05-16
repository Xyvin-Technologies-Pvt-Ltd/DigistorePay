import axios from "axios";
import { toast } from "react-hot-toast";
import { setBalance } from "../redux/wallet/walletSlice";
import { setLogOut } from "../redux/user/userSlice";
import { setInitial } from "../redux/operators/operatorSlice";

export const logOut = async (dispatch) => {
  try {
    const response = await axios.post("/auth/logout");
    if (response.error) {
      toast.error(response.error.msg, {
        id: "logout",
      });
    } else {
      localStorage.removeItem("persist:root");
      dispatch(setInitial());
      dispatch(setBalance(null));
      dispatch(setLogOut());
      // toast.success("Successfully Logged Out ", {
      //   id: "logout",
      // });
    }
  } catch (error) {
    toast.error("Something went wrong", {
      id: "logout",
    });
  }
};
