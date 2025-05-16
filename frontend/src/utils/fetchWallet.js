import axios from "axios";
import { toast } from "react-hot-toast";
import { setBalance } from "../redux/wallet/walletSlice";
import { logOut } from "./logOut";
export const fetchWalletBalance = async (dispatch, currentUser) => {
  if (currentUser && currentUser.data.userType === "franchise") {
    try {
      const response = await axios.get("/franchiseRouter/wallet");

      if (response.error) {
        toast.error(response.error, {
          id: "wallet",
        });
      } else {
        dispatch(setBalance(response.data.wallet));
        // toast.success("Wallet Balance Updated", {
        //   id: "wallet",
        // });
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut(dispatch);
      } else
        toast.error("Error Fetching Wallet Balance", {
          id: "wallet",
        });
    }
  }
};
