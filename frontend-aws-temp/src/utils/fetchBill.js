import axios from "axios";
import { toast } from "react-hot-toast";

export const fetchBill = async (values, setBill, setShowBill) => {
  try {
    const response = await axios.post("/billPaymentRoute/fetchBill", {
      accountNo: values.accountNo,
      phoneNumber: values.phoneNumber,
      SPKey: values.SPKey,
    });

    if (response.data.error) {
      toast.error(response.data.error, { id: "bill" });
    } else if (response.data.status !== 2) {
      toast.error(response.data.msg, { id: "bill" });
    } else if (
      response.data.status !== 2 &&
      response.data.msg ===
        "Unable to get bill details Please try again after few minute"
    ) {
      toast.success("No Unpaid Bills", { id: "bill" });
    } else {
      setBill(response.data);
      setShowBill(true);
      toast.success("Bill Fetched Successfully", { id: "bill" });
    }
  } catch (error) {
    // console.error("Error fetching bill:", error);
    toast.error("Error fetching bill", { id: "bill" });
  }
};
